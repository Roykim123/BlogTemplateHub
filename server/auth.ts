import express from 'express';
import passport from 'passport';
import { Strategy as KakaoStrategy } from 'passport-kakao';
import { Strategy as LocalStrategy } from 'passport-local';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import { storage } from "./storage";
import type { User } from "@shared/schema";

const router = express.Router();

// Session/Cookie setup
router.use(cookieParser());
router.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret-for-development',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Passport initialization
router.use(passport.initialize());
router.use(passport.session());

// JWT token creation
function createToken(userId: number) {
  const secret = process.env.JWT_SECRET || 'fallback-jwt-secret-for-development';
  return jwt.sign({ userId }, secret, { expiresIn: '24h' });
}

// Kakao OAuth Strategy
if (process.env.KAKAO_CLIENT_ID && process.env.KAKAO_CLIENT_SECRET) {
  passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_CLIENT_ID,
    clientSecret: process.env.KAKAO_CLIENT_SECRET,
    callbackURL: `${process.env.BASE_URL || 'http://localhost:5000'}/auth/kakao/callback`
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const kakaoId = profile.id;
      const email = profile._json?.kakao_account?.email;
      const nickname = profile._json?.kakao_account?.profile?.nickname;
      
      // Check if user exists by Kakao ID
      let user = await storage.getUserByKakaoId(kakaoId);
      
      if (!user && email) {
        // Check if user exists by email
        user = await storage.getUserByEmail(email);
      }
      
      if (!user) {
        // Create new user
        user = await storage.createUser({
          username: nickname || `kakao_${kakaoId}`,
          email: email || null,
          kakaoId: kakaoId,
          role: 'user',
          isActive: true,
          aiCash: 1000, // Welcome bonus
          subscriptionTier: 'free',
          subscriptionStatus: 'active'
        });
      } else if (!user.kakaoId) {
        // Link existing email user with Kakao
        user = await storage.updateUser(user.id, { kakaoId });
      }
      
      return done(null, user);
    } catch (err) {
      console.error('Kakao OAuth error:', err);
      return done(err);
    }
  }));
}

// Local strategy for development/testing
passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email: string, password: string, done) => {
    try {
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return done(null, false, { message: 'Invalid credentials' });
      }

      // For demo purposes, accept any password
      // In production, implement proper bcrypt password checking
      const isValidPassword = password === 'password' || await bcrypt.compare(password, user.password || '');
      
      if (!isValidPassword) {
        return done(null, false, { message: 'Invalid credentials' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, (user as any).id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await storage.getUser(parseInt(id));
    done(null, user || null);
  } catch (error) {
    done(error);
  }
});

// Auth routes
router.get('/auth/kakao', passport.authenticate('kakao'));

router.get('/auth/kakao/callback',
  passport.authenticate('kakao', { failureRedirect: '/login?error=kakao' }),
  (req, res) => {
    const user = req.user as User;
    const token = createToken(user.id);
    res.cookie('jwt', token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
    res.redirect('/');
  }
);

router.post('/auth/logout', (req, res) => {
  res.clearCookie('jwt');
  req.logout(() => {
    res.json({ success: true });
  });
});

export function setupPassport() {
  // Passport is already configured above
  return router;
}

// JWT middleware for API protection
export function jwtMiddleware(req: any, res: any, next: any) {
  const token = req.cookies?.jwt || req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: '로그인이 필요합니다' });
  }
  
  try {
    const secret = process.env.JWT_SECRET || 'fallback-jwt-secret-for-development';
    const payload = jwt.verify(token, secret) as any;
    req.user = { id: payload.userId };
    next();
  } catch (error) {
    console.error('JWT verification error:', error);
    return res.status(401).json({ error: '유효하지 않은 토큰입니다' });
  }
}

export default router;

// Middleware to check if user is authenticated
export function ensureAuthenticated(req: any, res: any, next: any) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Authentication required' });
}

// Middleware to check if user is admin
export function ensureAdmin(req: any, res: any, next: any) {
  if (req.isAuthenticated() && req.user?.role === 'admin') {
    return next();
  }
  res.status(403).json({ error: 'Admin access required' });
}