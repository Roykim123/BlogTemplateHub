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