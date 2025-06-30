# replit.md

## Overview

This is a modern AI-powered content creation platform called "걱정마AI" (Worry-Free AI). The application is built with a React frontend and Express.js backend, featuring AI tools for blog writing, content generation, and various productivity features. It includes user management, payment processing, referral systems, and gamification elements.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **UI Framework**: Radix UI components with Tailwind CSS styling
- **Component Library**: shadcn/ui for consistent design system

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **API Design**: RESTful API with typed routes
- **Session Management**: PostgreSQL-based session storage

### Styling and Design
- **CSS Framework**: Tailwind CSS with custom design tokens
- **Theme System**: Light/dark mode support with CSS variables
- **Typography**: Pretendard font for Korean text optimization
- **Icons**: Lucide React for consistent iconography

## Key Components

### User Management
- OAuth integration with Kakao (Korean social platform)
- Traditional email/password authentication
- User levels and progression system (Red to Violet tiers)
- AI Cash virtual currency system
- Referral program with rewards

### AI Tools and Content Generation
- Multiple AI-powered tools for content creation
- Blog auto-generation with SEO optimization
- Template system for various content types
- Chat interface for AI interactions
- Usage tracking and analytics

### Gamification and Rewards
- Daily check-in system
- Mission-based reward system
- Games (ladder game, odd/even dice game)
- Level progression with benefits
- AI Cash earning and spending mechanics

### Payment and Subscription
- Stripe integration for payment processing
- Tiered subscription plans (Free, Basic, Pro, Enterprise)
- AI Cash purchase system
- Usage-based billing model

### Administrative Features
- Admin dashboard with user management
- System monitoring and analytics
- Content moderation tools
- Payment and subscription management

## Data Flow

### User Authentication Flow
1. User initiates login (Kakao OAuth or email/password)
2. Backend validates credentials and creates session
3. User data stored in PostgreSQL with session management
4. Frontend receives authentication state via TanStack Query

### Content Generation Flow
1. User selects AI tool or template
2. Frontend sends request to backend API
3. Backend processes request and integrates with AI services
4. Generated content returned and cached
5. Usage tracked for billing and analytics

### Payment Processing Flow
1. User selects subscription plan
2. Frontend redirects to Stripe checkout
3. Stripe handles payment processing
4. Webhook updates user subscription status
5. AI Cash balance updated accordingly

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **drizzle-orm**: Type-safe ORM for database operations
- **@stripe/stripe-js**: Payment processing integration
- **@tanstack/react-query**: Server state management
- **@radix-ui/react-**: Accessible UI component primitives

### Development Tools
- **TypeScript**: Type safety across the entire stack
- **Vite**: Fast development server and build tool
- **Tailwind CSS**: Utility-first CSS framework
- **ESBuild**: Fast JavaScript bundler for production

### AI and External Services
- AI content generation services (implementation details not exposed)
- Kakao OAuth API for social authentication
- Stripe API for payment processing
- Email services for notifications

## Deployment Strategy

### Build Process
- **Development**: `npm run dev` - Runs both frontend and backend in development mode
- **Production Build**: `npm run build` - Vite builds frontend, ESBuild bundles backend
- **Database**: `npm run db:push` - Deploys schema changes to PostgreSQL

### Environment Configuration
- **Replit**: Configured for auto-deployment on Replit infrastructure
- **Database**: Neon serverless PostgreSQL with connection pooling
- **Port Configuration**: Frontend serves on port 5000, external port 80
- **Static Assets**: Frontend builds to `dist/public`, served by Express

### Scaling Considerations
- Serverless PostgreSQL connection pooling for database scalability
- Static asset serving optimized for CDN deployment
- Session storage in PostgreSQL for horizontal scaling
- Stateless backend design for easy scaling

## Changelog

- June 24, 2025: Authentication system implementation and route protection
  - Created Kakao-only login page with enhanced UI and benefits showcase
  - Implemented authentication context and protected route system
  - Added route protection for all pages except dashboard and community board
  - Created auth hooks and context providers for state management
  - Added login/logout functionality with localStorage persistence
  - Updated TopBar with dynamic login/logout buttons and user display
  - Removed email/signup options per user requirement - Kakao login only
  - Enhanced user experience with authentication flow and toast notifications
  - Updated profile information to display Kakao login data (name, email, profile image)
  - Made profile fields read-only since they come from Kakao account
  - Added profile image display in TopBar for authenticated users
  - Updated community board categories to: 외주게시판 (개발/마케팅/디자인), 자유게시판, AI정보게시판, 공지사항
  - Added rewards section at top of challenger page for motivation
  - Implemented SNS automation purchase flow: buy button (50 cash/month with counting) → publish button with login → write → register sequence
  - Added publish button functionality to blog template section
  - Added image upload functionality to SNS automation page (max 5 images)
  - Implemented volatile data handling - images and text are deleted after completion
  - Enhanced user experience with preview, drag-and-drop, and validation features
  - Redesigned SNS automation as single-page workflow: payment → progress dashboard → content creation with product loading → login status with Chrome integration → upload → completion with dashboard color changes
  - Added "작성하기" buttons to all blog templates for direct content creation
  - Integrated product information loading from MyPage into SNS content creation
  - Fixed YouTube video display with proper aspect ratio and responsive design
  - Replaced premium content with clickable YouTube links for better user experience
  - Enhanced navigation sidebar hover visibility with bold text and improved contrast
  - Added autoplay functionality for tutorial video when user is logged in
  - Expanded tutorial video section to full height for better viewing experience
  - Simplified homepage layout with single tutorial video section
  - Restored premium content section with click-to-play YouTube videos
  - Centered content layout for consistent display across all monitor sizes
  - Enhanced tutorial video to fill available space within its section
  - Fixed mobile responsiveness for Galaxy Fold5, iPhone, iPad, Galaxy Ultra
  - Optimized title display and reduced bottom navigation height for mobile
  - Added continuous YouTube video playback with loop parameter
  - Improved text visibility in premium content with proper white text styling
  - Updated community board categories and fixed missing content prompts
  - Reorganized community page with hot posts section moved to top
  - Enhanced challenger page with prominent rewards section at top
  - Added friend referral mission (1 person per day) to challenger tasks
  - Integrated friend referral benefits into payment page
  - Added 2025 Seoul AI Hub company selection banner with gradient design and mobile optimization

- June 24, 2025: Final customer-focused refinements and error fixes
  - Fixed TypeError in formatNumber utility with null/undefined safety checks
  - Added professional loading spinner and empty state components for better UX
  - Enhanced community board with 5-post previews per category and proper error handling
  - Improved visual consistency with gradient branding across logo and key elements
  - Added comprehensive empty states for better user guidance when no content exists
  - Enhanced payment page with better visual hierarchy and trust indicators
  - Implemented proper null checks throughout data rendering to prevent crashes
  - Refined typography and spacing for better readability and professional appearance

- June 24, 2025: Community board dashboard restoration and code optimization
  - Restored community board to original 4-category dashboard layout with navigation between boards
  - Added board categories: 일반, 질문, 팁, 후기 with individual icons and statistics
  - Implemented proper Dialog descriptions to resolve accessibility warnings
  - Created performance optimization utilities for array operations, formatting, and caching
  - Added memoization for filtered posts and expensive calculations to reduce re-renders
  - Enhanced number formatting for large values (K/M notation) and currency display
  - Optimized component structure to minimize replit cost impact while maintaining functionality

- June 24, 2025: Backend integration preparation and UI restoration
  - Restored original gradient-based UI styling for CommunityPage and MyPage while keeping new functionality
  - Added comprehensive backend API routes for all major features (store info, posts, AI cash, automation, missions)
  - Created extensive database schema with new tables: storeInfos, posts, cashTransactions, automationProgress, challengerMissions
  - Implemented centralized API client with error handling, data transformers, and query key management
  - Added custom React hooks for all major features: useStoreInfo, usePosts, useAiCash, useAutomationProgress, useMissions
  - Prepared complete data flow architecture for senior developer handoff with TODO markers for database integration
  - Enhanced storage interface with all CRUD operations for new features
  - Created structured foundation for real-time progress tracking and AI Cash management

- June 24, 2025: Final system implementation and automation progress tracking
  - Implemented real-time progress tracking for 딸깍AI automation with visual feedback
  - Added store information management system in MyPage with multi-product support
  - Completed premium course system with AI Cash payment integration
  - Enhanced challenger missions with interactive completion tracking (4 daily tasks)
  - Added comprehensive board management (create, edit, delete posts)
  - Unified all payments to AI Cash system with subscription integration
  - Fixed all critical errors and optimized performance
  - Completed mobile-first responsive design across all pages

- June 24, 2025: Critical UI fixes and deployment preparation
  - Fixed text visibility issues across all pages (white text on white background)
  - Applied proper color schemes: text-gray-900 for light mode, dark:text-gray-100 for dark mode
  - Enhanced sidebar navigation with hover effects and proper positioning (top-8 to avoid overlap)
  - Added beautiful animation effects for navigation menu items
  - Completed 2025 Seoul AI Hub company selection celebration banner
  - Finalized "정보성 블로그 v2 Upgrade" premium content display
  - Ensured all navigation pages show proper headers and text visibility
  - Ready for deployment with complete mobile responsiveness and accessibility

- June 30, 2025: Complete backend database and admin system implementation
  - Migrated from MemStorage to PostgreSQL DatabaseStorage with full CRUD operations
  - Added comprehensive database schema: sessions, storeInfos, posts, cashTransactions, automationProgress, challengerMissions
  - Implemented complete admin dashboard with tabbed interface (users, tools, content, settings)
  - Added real-time user management: AI cash updates, user search/filter, role management
  - Created tool management system with activation/deactivation and usage tracking
  - Built community posts system with categories, views, likes, and moderation features
  - Implemented AI cash transaction tracking and mission reward system
  - Added automation progress tracking for multi-stage workflows
  - Created seed data system for development environment with sample users, tools, and templates
  - Fixed all TypeScript errors and established proper database relationships
  - Enhanced admin interface with interactive statistics, search functionality, and bulk operations
  - Removed duplicate upgrade modal to improve UX - now single source of truth in HomePage premium content section
  - Applied hermes-orange brand color to navigation sidebar for consistent UI theming
  - Enhanced achievement banner with soft multi-layer orange gradients for refined startup aesthetic

- June 30, 2025: Major business model restructure and backend handoff preparation
  - Restructured to monthly subscription system as primary business model (Free/Basic/Pro/Enterprise)
  - Moved AI Cash to premium content purchases only, removed from tool usage
  - Prioritized automation features in navigation (moved above community section)
  - Added comprehensive subscription management database schema and API endpoints
  - Created complete backend handoff documentation (BACKEND_HANDOFF.md)
  - Implemented subscription tracking, plan management, and usage limitation systems
  - Deployed database schema changes to production environment
  - Established production-ready foundation focused on 딸깍AI automation as core revenue driver

- June 30, 2025: Database verification and beginner-friendly UI documentation
  - Confirmed complete 12-table database system deployment with all schemas operational
  - Verified users table with 21 fields including subscription management, kakao integration, and gamification
  - Created comprehensive beginner modification guide (BEGINNER_GUIDE.md) for non-developers
  - Added extensive inline comments throughout key UI components for easy text/color changes
  - Database ready for production with user registration, subscription tracking, and all service features

- June 30, 2025: Kakao OAuth integration and business operations management
  - Implemented complete Kakao OAuth authentication system with JWT tokens
  - Added passport-kakao strategy with automatic user creation and account linking
  - Created comprehensive admin business operations panel with real-time database integration
  - Added user plan management (Free/Basic/Pro/Enterprise) with instant database updates
  - Implemented feature access control with toggle switches for each service component
  - Created pricing plan management system with direct editing capabilities
  - Added system-wide feature toggles for maintenance and service control
  - Confirmed PostgreSQL (Neon) database system is optimal and no migration to PlanetScale needed
  - Admin panel fully operational at /admin route with 4-tab interface for complete business management

- June 30, 2025: Tutorial page creation and SNS automation UI improvements
  - Converted "기본 대시보드" menu to "튜토리얼" with comprehensive YouTube video integration
  - Created TutorialHomePage with 4 YouTube videos, progress tracking (1,2,3,4 display), and autoplay for first video
  - Added extensive documentation comments for easy YouTube video replacement by non-developers
  - Enhanced SNS automation page with beginner/advanced mode toggle and conditional content display
  - Implemented proper mode switching behavior that resets content creation interface
  - Added detailed inline comments throughout tutorial page for easy content management

- June 24, 2025: Major UX improvements and backend API foundation
  - Enhanced HomePage with HOT badges and hover effects for better visual feedback
  - Added FloatingActionButton for mobile users with quick access to key features
  - Implemented comprehensive backend API with authentication, user management, and data endpoints
  - Added session management and passport.js authentication framework
  - Created proper route structure for tools, templates, favorites, and chat history
  - Enhanced user schema with additional fields (role, profileImage, bio, isActive)
  - Prepared foundation for Kakao OAuth integration and AI Cash management

- June 24, 2025: Implemented expandable sidebar navigation with hover functionality
  - Desktop: Icon-only sidebar that expands to show labels on hover
  - Mobile: Bottom navigation bar with 4 essential items
  - Reorganized menu structure into 3 main categories: 커뮤니티, 자동화 기능, 고객영역
  - Added new pages: ChallengerPage for 7-day mission tracking
  - Enhanced UI with smooth transitions and responsive design

- June 24, 2025: Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.