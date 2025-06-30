# Backend Developer Handoff Documentation

## Project Overview: 걱정마AI (Worry-Free AI)

This is a comprehensive B2C AI content generation platform with a focus on automated social media posting. The system has been restructured to use **monthly subscription plans only** with AI Cash reserved exclusively for premium content purchases.

## System Architecture Changes

### 1. Monthly Subscription System (PRIMARY BUSINESS MODEL)
- **Free Plan**: 5 posts/month, basic tools
- **Basic Plan**: $99/month, 50 posts/month, all tools
- **Pro Plan**: $199/month, unlimited posts, advanced features
- **Enterprise Plan**: $499/month, white label, custom integrations

### 2. AI Cash System (PREMIUM CONTENT ONLY)
- Used exclusively for purchasing premium educational content
- No longer tied to tool usage or automation features
- Users start with 100 AI Cash (reduced from 1000)

## Database Schema Updates

### New Tables Added:
```sql
-- Subscription Management
CREATE TABLE subscriptions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  tier TEXT NOT NULL, -- Free, Basic, Pro, Enterprise
  status TEXT NOT NULL, -- active, cancelled, expired, pending
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  amount INTEGER NOT NULL, -- monthly cost in cents
  payment_method TEXT, -- stripe_card, bank_transfer
  stripe_subscription_id TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Updated User Table:
```sql
-- Added subscription fields to users table
ALTER TABLE users ADD COLUMN subscription_tier TEXT DEFAULT 'Free';
ALTER TABLE users ADD COLUMN subscription_status TEXT DEFAULT 'active';
ALTER TABLE users ADD COLUMN subscription_start_date TIMESTAMP;
ALTER TABLE users ADD COLUMN subscription_end_date TIMESTAMP;
ALTER TABLE users ALTER COLUMN ai_cash SET DEFAULT 100; -- Reduced from 1000
```

## API Endpoints Ready for Implementation

### Subscription Management
- `GET /api/subscriptions/user/:userId` - Get user's current subscription
- `POST /api/subscriptions` - Create new subscription
- `PUT /api/subscriptions/:id` - Update subscription
- `POST /api/subscriptions/cancel/:userId` - Cancel subscription
- `GET /api/subscription-plans` - Get available plans

### Core Features (Already Implemented)
- User management with Kakao OAuth
- Tool management and automation progress tracking
- Community posts with categories
- AI Cash transactions (premium content only)
- Store information management
- Challenger missions system
- Admin dashboard with full CRUD operations

## Key Integration Points

### 1. Payment Processing (Stripe)
```javascript
// Monthly subscription creation
const subscription = await stripe.subscriptions.create({
  customer: customerId,
  items: [{ price: process.env.STRIPE_PRICE_ID }],
  payment_behavior: 'default_incomplete',
  expand: ['latest_invoice.payment_intent'],
});
```

### 2. Access Control Middleware
```javascript
// Check subscription tier for feature access
function requireSubscriptionTier(minTier) {
  return async (req, res, next) => {
    const user = req.user;
    const subscription = await storage.getUserSubscription(user.id);
    
    if (!hasRequiredTier(subscription.tier, minTier)) {
      return res.status(403).json({ error: "Subscription upgrade required" });
    }
    next();
  };
}
```

### 3. Usage Tracking
```javascript
// Track monthly usage against subscription limits
async function trackUsage(userId, usageType) {
  const subscription = await storage.getUserSubscription(userId);
  const currentUsage = await getCurrentMonthUsage(userId, usageType);
  
  if (currentUsage >= subscription.limitations[usageType]) {
    throw new Error("Monthly limit exceeded");
  }
}
```

## Core Automation Feature: 딸깍AI (Primary Revenue Driver)

### SNS Auto-Posting Workflow:
1. User selects subscription plan (Basic/Pro/Enterprise for full access)
2. Uploads product images (max 5)
3. Loads store information from MyPage
4. AI generates optimized content
5. User reviews and publishes to multiple platforms
6. Progress tracked through 5-stage automation system

### Implementation Status:
- ✅ Frontend UI complete with progress tracking
- ✅ Database schema ready for automation data
- ✅ Store information management system
- 🔄 **NEEDS BACKEND**: AI content generation integration
- 🔄 **NEEDS BACKEND**: Multi-platform posting APIs (Instagram, Facebook, etc.)

## Navigation Priority
Menu order has been updated to prioritize automation features:
1. **자동화 기능** (Primary - revenue generating)
2. 커뮤니티
3. 고객영역

## Database Migration Commands

```bash
# Push schema changes to production
npm run db:push

# Seed development data
npm run db:seed
```

## Environment Variables Needed

```env
# Subscription Management
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PRICE_ID_BASIC=price_...
STRIPE_PRICE_ID_PRO=price_...
STRIPE_PRICE_ID_ENTERPRISE=price_...

# AI Integration (to be implemented)
OPENAI_API_KEY=sk-...
INSTAGRAM_APP_ID=...
FACEBOOK_APP_SECRET=...
```

## Next Development Priorities

### High Priority (Revenue Critical):
1. **Stripe subscription webhook handling**
2. **AI content generation for 딸깍AI**
3. **Social media platform integrations**
4. **Usage tracking and limit enforcement**

### Medium Priority:
1. Admin analytics dashboard completion
2. Premium content purchase flow
3. Referral system implementation
4. Advanced automation templates

### Low Priority:
1. Performance optimizations
2. Additional social platforms
3. White-label features for Enterprise

## Code Structure for Handoff

### Key Files Modified:
- `shared/schema.ts` - Complete database schema with subscriptions
- `server/storage.ts` - Full CRUD operations implemented
- `server/routes.ts` - All API endpoints ready
- `client/src/components/layout/Sidebar.tsx` - Navigation prioritized
- All frontend pages connected to backend APIs

### Testing Approach:
- All database operations tested with PostgreSQL
- Frontend-backend integration verified
- Admin dashboard fully functional
- Subscription system ready for Stripe integration

This handoff provides a production-ready foundation focused on the core business model: monthly subscriptions for automation tools with AI Cash for premium content only.