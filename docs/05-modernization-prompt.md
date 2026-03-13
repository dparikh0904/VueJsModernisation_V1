# Argon Design System - Complete Modernization Prompt

## EXECUTIVE SUMMARY

This document provides a comprehensive prompt for generating a complete, production-ready **React 18 + TypeScript + Tailwind CSS** application that modernizes the legacy Vue.js Argon Design System. The prompt includes target architecture, migration strategy, infrastructure diagrams, and detailed component specifications.

**Migration Scope**: 6 pages, 47 components, 10 demo sections
**Target Output**: ~7,200 lines of TypeScript/TSX code across 59 files
**Timeline**: 5 weeks across 4 migration waves

---

## ROLE & CONTEXT

**Role**: You are a Senior Full-Stack Developer and Solutions Architect with 15+ years of experience building modern web applications. You specialize in:
- React 18 with TypeScript
- Tailwind CSS design systems
- Node.js/Express backends
- PostgreSQL databases
- JWT authentication patterns
- Cloud-native architectures

**Context**: You are building a NEW React application from scratch to replace a legacy Vue.js 2.5 application. This is a **greenfield rebuild**, NOT a migration or port. 

**CRITICAL CONSTRAINTS**:
- Generate ONLY React (.tsx/.ts) files — **NEVER generate .vue files**
- Use React 18 functional components with hooks (useState, useEffect, useCallback, useMemo)
- Use TypeScript strict mode for all files
- Use Tailwind CSS for ALL styling — NO SCSS, NO CSS modules, NO styled-components
- Use React Router 6 for navigation
- Use Zustand for global state management
- Use React Hook Form + Zod for form validation
- Use Axios for HTTP requests with interceptors
- Implement secure JWT authentication with httpOnly cookies
- WCAG 2.1 AA accessibility compliance required

---

## 1. TARGET ARCHITECTURE

### 1.1 Architecture Pattern: Modular Monolith

**Decision**: Modular Monolith (Frontend) + Express API (Backend)

**Justification** (Evidence from Stage 3 Capability Map):
- **Small scope**: 6 pages, 18 UI components — microservices would add unnecessary complexity
- **Team size**: 2-3 developers — single deployable unit reduces coordination overhead
- **Low coupling**: Stage 3 identified only 2 external API dependencies (`/api/users/signup`, `/api/users/login`)
- **Future-ready**: Module boundaries allow extraction to microservices if needed

**Module Boundaries** (Aligned to Stage 3 Capabilities):

| Module | Capabilities | Files | Responsibility |
|--------|--------------|-------|----------------|
| **Auth Module** | User Registration, Login, Logout, Token Management | `stores/authStore.ts`, `lib/api.ts` | Authentication state, JWT, API client |
| **Form Module** | Email Validation, Form State | `components/ui/Input.tsx`, `Checkbox.tsx`, etc. | Reusable form components |
| **Navigation Module** | Route Config, Header State | `routes.tsx`, `Header.tsx` | Routing, guards, layout |
| **UI Module** | Design System Components | `components/ui/*` (21 files) | Presentational components |
| **Pages Module** | Page Views | `pages/*` (6 files) | Page composition |

### 1.2 Technology Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Frontend Framework** | React 18.2 + TypeScript 5.x | Modern hooks API, concurrent rendering, strong typing |
| **State Management** | Zustand 4.x | Simple API, TypeScript-first, 3KB bundle |
| **Routing** | React Router 6.x | Standard for React, nested routes, data loading |
| **Styling** | Tailwind CSS 3.x | Utility-first, design tokens, tree-shaking |
| **Forms** | React Hook Form 7.x + Zod | Uncontrolled inputs (performance), schema validation |
| **HTTP Client** | Axios 1.x | Interceptors for auth, request/response transforms |
| **Build Tool** | Vite 5.x | 10x faster than Webpack, native ESM |
| **Testing** | Vitest + React Testing Library | Jest-compatible, Vite integration |
| **Backend** | Node.js 20 + Express 4.x | Existing backend, JWT authentication |
| **Database** | PostgreSQL 16 | ACID compliance, JSON support |
| **Containerization** | Docker + Docker Compose | Consistent environments |

### 1.3 API Design

**Pattern**: REST API with JSON payloads

**Endpoints**:

| Endpoint | Method | Purpose | Request | Response |
|----------|--------|---------|---------|----------|
| `/api/users/signup` | POST | Register | `{ name, email, password }` | `{ user: { id, email, name } }` |
| `/api/users/login` | POST | Login | `{ email, password }` | `{ user, accessToken }` + httpOnly cookie |
| `/api/auth/refresh` | POST | Refresh token | Cookie | `{ accessToken }` |
| `/api/auth/logout` | POST | Logout | Cookie | `{ success: true }` |

---

## 2. ARCHITECTURE DIAGRAM

```mermaid
flowchart TB
    subgraph "Client Layer"
        Browser[Web Browser]
    end

    subgraph "Frontend Application - React 18"
        subgraph "Routing Layer"
            Router[React Router 6]
            Guards[Route Guards]
        end
        
        subgraph "State Layer"
            AuthStore[Zustand Auth Store]
            UIState[Local Component State]
        end
        
        subgraph "UI Layer"
            Pages[Pages: Landing, Components, Login, Register, Profile]
            Components[UI Components: 21 Tailwind Components]
            Layout[Layout: Header, Footer]
        end
        
        subgraph "Service Layer"
            APIClient[Axios API Client]
            Validators[Zod Validators]
        end
    end

    subgraph "Backend - Express"
        ExpressApp[Express Server :3000]
        AuthController[Auth Controller]
        AuthService[Auth Service]
        UserRepo[User Repository]
    end

    subgraph "Data Layer"
        PostgreSQL[(PostgreSQL :5432)]
    end

    Browser --> Router
    Router --> Guards
    Guards --> Pages
    Pages --> Components
    Pages --> Layout
    Pages --> AuthStore
    AuthStore --> APIClient
    APIClient --> ExpressApp
    ExpressApp --> AuthController
    AuthController --> AuthService
    AuthService --> UserRepo
    UserRepo --> PostgreSQL

    classDef frontend fill:#61dafb,stroke:#333
    classDef backend fill:#68d391,stroke:#333
    classDef data fill:#f6ad55,stroke:#333

    class Router,Guards,AuthStore,UIState,Pages,Components,Layout,APIClient,Validators frontend
    class ExpressApp,AuthController,AuthService,UserRepo backend
    class PostgreSQL data
```

---

## 3. MIGRATION STRATEGY

### 3.1 Migration Pattern: Greenfield with Parallel Run

**Pattern**: Complete rebuild with 2-week parallel run period

**Justification**:
- Vue 2.5 → React 18 has no interop path
- Bootstrap 4 → Tailwind CSS requires complete CSS rewrite
- Small codebase (6 pages) — rebuild faster than incremental migration

### 3.2 Migration Waves

#### Wave 1: Foundation (Week 1-2)
**Capabilities**: Route Configuration, API Configuration

| Deliverable | Lines | Cutover Criteria |
|-------------|-------|------------------|
| Vite + React 18 scaffold | 50 | `npm run dev` works |
| Tailwind CSS config | 40 | Theme colors match Argon |
| React Router setup | 60 | All 6 routes accessible |
| Axios API client | 80 | API calls work |
| Zustand auth store | 130 | State persists |

**Rollback Plan**: Delete React project, continue with Vue.js

#### Wave 2: Authentication (Week 2-3)
**Capabilities**: User Registration, Login, Logout, Token Management

| Deliverable | Lines | Cutover Criteria |
|-------------|-------|------------------|
| Login page | 200 | BDD scenarios pass |
| Register page | 230 | BDD scenarios pass |
| Auth store with refresh | 150 | Auto-refresh works |
| Protected routes | 50 | Guards redirect correctly |

**Data Migration**: Dual-cookie support for 2 weeks
**Rollback Plan**: Feature flag to disable new auth

#### Wave 3: UI Components (Week 3-4)
**Capabilities**: Design System Components

| Deliverable | Lines | Cutover Criteria |
|-------------|-------|------------------|
| 21 UI components | 1,700 | All variants render |
| 4 Layout components | 700 | Responsive on all sizes |

**Rollback Plan**: Keep Vue.js deployment active

#### Wave 4: Pages & Polish (Week 4-5)
**Capabilities**: Page Views, Performance, Accessibility

| Deliverable | Lines | Cutover Criteria |
|-------------|-------|------------------|
| Landing page (10 sections) | 2,000 | Visual parity |
| Components showcase | 600 | All demos work |
| Profile page | 100 | User data displays |
| Performance optimization | — | Lighthouse > 90 |
| Accessibility audit | — | axe-core passes |

**Cutover Criteria**:
- All 38 BDD scenarios pass
- Lighthouse score > 90
- Zero security vulnerabilities
- Stakeholder UAT sign-off

**Rollback Plan**:
- CloudFront distribution switch (instant)
- Keep Vue.js deployment for 2 weeks post-cutover

---

## 4. INFRASTRUCTURE DIAGRAM

```mermaid
flowchart LR
    subgraph "Source Control"
        GitHub[GitHub Repository]
    end

    subgraph "CI Pipeline - GitHub Actions"
        Lint[ESLint + Prettier]
        TypeCheck[TypeScript Check]
        Test[Vitest Tests]
        Build[Vite Build]
        Security[npm audit]
    end

    subgraph "Artifact Storage"
        S3[S3 Build Artifacts]
        DockerHub[Docker Registry]
    end

    subgraph "Environments"
        Dev[Development :5173]
        Staging[Staging]
        Prod[Production]
    end

    GitHub --> Lint
    Lint --> TypeCheck
    TypeCheck --> Test
    Test --> Build
    Build --> Security
    Security --> S3
    Security --> DockerHub
    S3 --> Dev
    S3 --> Staging
    Staging --> Prod

    classDef ci fill:#fbd38d,stroke:#333
    classDef deploy fill:#9ae6b4,stroke:#333

    class Lint,TypeCheck,Test,Build,Security ci
    class Dev,Staging,Prod deploy
```

---

## 5. DEPLOYMENT DIAGRAM

```mermaid
flowchart TB
    subgraph "DNS"
        DNS[Route 53 / Cloudflare]
    end

    subgraph "CDN"
        CDN[CloudFront / Cloudflare CDN]
    end

    subgraph "Docker Compose Stack"
        subgraph "Frontend Container"
            Vite[Vite Dev Server :5173]
        end

        subgraph "Backend Container"
            Express[Express Server :3000]
        end

        subgraph "Database Container"
            Postgres[(PostgreSQL :5432)]
        end
    end

    DNS --> CDN
    CDN --> Vite
    Vite --> Express
    Express --> Postgres

    classDef container fill:#bee3f8,stroke:#333
    classDef data fill:#f6ad55,stroke:#333

    class Vite,Express container
    class Postgres data
```

---

## 6. TRADEOFF ANALYSIS

### 6.1 State Management: Zustand vs Redux

| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| **Zustand** | Simple API, 3KB bundle, TypeScript-first | Smaller ecosystem | ✅ **SELECTED** |
| Redux Toolkit | Industry standard, large ecosystem | 15KB bundle, more boilerplate | ❌ Rejected |
| React Context | Built-in, no dependency | Performance issues with frequent updates | ❌ Rejected |

**Rationale**: Authentication state is simple. Zustand provides 90% of Redux features with 10% complexity.

### 6.2 Styling: Tailwind vs CSS-in-JS

| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| **Tailwind CSS** | Fast development, 10KB purged, design tokens | Verbose HTML | ✅ **SELECTED** |
| Styled Components | Component-scoped, dynamic theming | Runtime overhead, larger bundle | ❌ Rejected |
| CSS Modules | Scoped styles, no runtime | More files, no design tokens | ❌ Rejected |

**Rationale**: Tailwind CSS is explicitly required. Modern v3 has excellent DX and performance.

### 6.3 Form Handling: React Hook Form vs Formik

| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| **React Hook Form** | 8KB bundle, uncontrolled (fast), Zod integration | — | ✅ **SELECTED** |
| Formik | Mature, large ecosystem | 13KB, performance issues | ❌ Rejected |

**Rationale**: React Hook Form is 40% smaller with better TypeScript support.

---

## 7. NON-FUNCTIONAL REQUIREMENTS

### 7.1 Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| Initial Load Time | < 2 seconds | Lighthouse |
| Time to Interactive | < 3 seconds | Lighthouse |
| First Contentful Paint | < 1.5 seconds | Lighthouse |
| Bundle Size | < 150KB gzipped | Webpack Analyzer |
| Lighthouse Score | > 90 | CI Pipeline |

### 7.2 Security Requirements

| Requirement | Implementation |
|-------------|----------------|
| HTTPS | TLS 1.3 enforced |
| Secure Cookies | httpOnly, Secure, SameSite=Strict |
| CSRF Protection | CSRF tokens for state-changing requests |
| XSS Prevention | DOMPurify, React auto-escaping |
| JWT Expiration | Access: 15 min, Refresh: 7 days |
| Input Validation | Zod schema validation |

### 7.3 Accessibility (WCAG 2.1 AA)

| Criterion | Implementation |
|-----------|----------------|
| Keyboard Navigation | Tab, Enter, Escape support |
| Focus Indicators | Tailwind `focus:ring` classes |
| Color Contrast | ≥ 4.5:1 ratio |
| Screen Reader | ARIA labels, semantic HTML |
| Form Labels | `<label>` for all inputs |

### 7.4 Observability

| Tool | Purpose |
|------|---------|
| Sentry | Error tracking |
| Lighthouse CI | Performance monitoring |
| CloudWatch | Infrastructure metrics |

---

## 8. EXACT FILE STRUCTURE TO GENERATE

### Frontend Components (21 files)

```
src/components/ui/
├── Alert.tsx           (~80 lines) - 4 color variants, dismissible, with icons
├── Badge.tsx           (~40 lines) - 5 color variants, pill shape
├── Button.tsx          (~120 lines) - 6 colors, 3 sizes, loading state, icon support
├── Card.tsx            (~50 lines) - shadow, hover, image support
├── Checkbox.tsx        (~60 lines) - custom styled, label support
├── CloseButton.tsx     (~25 lines) - X button for dismissing
├── Dropdown.tsx        (~100 lines) - trigger, menu, items, dividers
├── Icon.tsx            (~30 lines) - icon wrapper component
├── Input.tsx           (~160 lines) - icons, labels, error states, multiple types
├── Modal.tsx           (~140 lines) - header, body, footer, backdrop, 3 types
├── Nav.tsx             (~120 lines) - navigation wrapper
├── NavbarToggle.tsx    (~30 lines) - mobile menu toggle
├── Pagination.tsx      (~150 lines) - numbered pages, prev/next, active state
├── Progress.tsx        (~80 lines) - labeled, percentage, animated
├── Radio.tsx           (~60 lines) - custom styled, group support
├── Slider.tsx          (~100 lines) - range slider with labels
├── Switch.tsx          (~50 lines) - toggle switch
├── Tabs.tsx            (~200 lines) - tabs, tab panes, pills layout, icon support
├── Tooltip.tsx         (~80 lines) - 4 positions, hover trigger
└── index.ts            (~25 lines) - export all components
```

### Frontend Layout Components (4 files)

```
src/components/layout/
├── Header.tsx          (~250 lines) - logo, nav items, auth buttons, mobile menu
├── Footer.tsx          (~150 lines) - links, social icons, copyright
├── StarterHeader.tsx   (~160 lines) - alternate header for starter template
└── StarterFooter.tsx   (~130 lines) - alternate footer for starter template
```

### Frontend Pages (6 files)

```
src/pages/
├── Landing.tsx         (~800 lines) - hero, features, cards, contact form
├── Components.tsx      (~600 lines) - showcase all UI components
├── Login.tsx           (~200 lines) - auth form with validation
├── Register.tsx        (~230 lines) - signup form with validation
├── Profile.tsx         (~100 lines) - user info display
└── Starter.tsx         (~80 lines) - base template page
```

### Frontend Component Sections (15 files)

```
src/pages/sections/
├── Hero.tsx            (~90 lines) - landing page hero banner
├── BasicElements.tsx   (~90 lines) - buttons, typography, colors
├── Inputs.tsx          (~80 lines) - form input examples
├── CustomControls.tsx  (~260 lines) - checkboxes, radios, toggles, sliders
├── Navigation.tsx      (~200 lines) - 6 navbar color variants
├── JavascriptComponents.tsx (~120 lines) - wrapper for interactive demos
├── TabsSection.tsx     (~110 lines) - tabs and pills examples
├── Modals.tsx          (~170 lines) - 3 modal type demos
├── Tooltips.tsx        (~110 lines) - tooltip position demos
├── DatePickers.tsx     (~80 lines) - single and range datepicker
├── Typography.tsx      (~290 lines) - headings, text, images
├── ProgressPagination.tsx (~80 lines) - progress bars and pagination
├── Icons.tsx           (~80 lines) - icon gallery
├── Examples.tsx        (~100 lines) - sample use cases
└── DownloadSection.tsx (~130 lines) - CTA section
```

### Backend Files (8 files)

```
backend/src/
├── server.ts           (~80 lines) - Express app setup
├── config/database.ts  (~60 lines) - PostgreSQL connection
├── routes/index.ts     (~20 lines) - API routes
├── controllers/auth.controller.ts (~150 lines) - auth handlers
├── services/auth.service.ts (~150 lines) - auth business logic
├── repositories/user.repository.ts (~80 lines) - database queries
├── models/user.model.ts (~40 lines) - TypeScript interfaces
└── validators/auth.validator.ts (~20 lines) - Zod schemas
```

---

## Component Specifications

### Alert Component
```
Variants: success (#2dce89), info (#11cdef), warning (#fb6340), danger (#f5365c)
Features:
- Full-width colored background
- Left icon: thumbs-up (success), bell (info), exclamation (warning), fire (danger)
- Bold label text + message
- Dismiss X button on right
- Fade out animation on dismiss
```

### Navbar Component
```
6 Color Variants:
1. Default (#172b4d) - dark navy with heart/chat/settings icons
2. Primary (#5e72e4) - blue with Discover/Profile/Settings links
3. Success (#2dce89) - green with heart/chat/settings icons
4. Danger (#f5365c) - red with Facebook/Twitter/Google+/Instagram icons
5. Warning (#fb6340) - orange with Facebook/Twitter/Pinterest icons
6. Info (#11cdef) - cyan with Facebook/Twitter/Instagram text links

Structure:
- Left: "DEFAULT COLOR" or "MENU" text
- Right: nav links OR social icons
- Full-width bar
```

### Tabs Component
```
2 Styles:
1. With Icons - pill buttons with icon + text (Home, Profile, Messages)
2. With Text - pill buttons with text only

Features:
- Active tab highlighted in primary color
- Content panel switches on tab click
- Horizontal layout
- Rounded pill shape
```

### Modal Component
```
3 Types:
1. Default - simple content modal
2. Notification - alert-style with icon
3. Form - contains input fields

Structure:
- Header with title + close button
- Body content area
- Footer with action buttons
- Dark backdrop overlay
- Centered on screen
- Slide-down animation
```

### Progress Bar Component
```
Features:
- "TASK COMPLETED" label above
- Percentage text on right (40%, 60%)
- Animated fill bar
- Primary color gradient
- Rounded ends
```

### Pagination Component
```
Features:
- Previous arrow (<)
- Numbered pages (1, 2, 3, 4, 5)
- Next arrow (>)
- Active page highlighted
- Rounded button style
- Two style variants shown
```

### Images Component
```
4 Styles:
1. Default - standard rectangular image
2. Circle - circular cropped image (rounded-full)
3. Raised - rectangular with shadow
4. Circle Raised - circular with shadow

Display as grid of 4 sample images
```

### Datepicker Component
```
2 Modes:
1. Single Date - select one date
2. Date Range - select start and end date

Features:
- Calendar icon in input field
- Format: YYYY-MM-DD
- Calendar popup on click
```

### Custom Controls Section
```
Includes:
- Checkboxes (custom styled, multiple examples)
- Radio buttons (grouped selection)
- Toggle switches (on/off)
- Range sliders (with min/max labels)
```

---

## Color System (Exact Hex Codes)

| Color | Hex Code | Usage |
|-------|----------|-------|
| Primary | #5e72e4 | Main actions, links, active states |
| Success | #2dce89 | Positive actions, confirmations |
| Danger | #f5365c | Errors, destructive actions |
| Warning | #fb6340 | Cautions, alerts |
| Info | #11cdef | Informational elements |
| Default | #172b4d | Navigation, dark elements |
| Secondary | #f7fafc | Light backgrounds |
| White | #ffffff | Card backgrounds |

---

## Typography

| Element | Size | Weight |
|---------|------|--------|
| Heading 1 | 3rem (48px) | Bold |
| Heading 2 | 2.5rem (40px) | Bold |
| Heading 3 | 2rem (32px) | Bold |
| Heading 4 | 1.5rem (24px) | Bold |
| Heading 5 | 1.25rem (20px) | Bold |
| Heading 6 | 1rem (16px) | Bold |
| Body | 1rem (16px) | Normal |
| Small | 0.875rem (14px) | Normal |
| Lead | 1.25rem (20px) | Light |

Font Family: Open Sans

---

## Page Specifications

### Landing Page (~800 lines)
```
Sections:
1. Hero - gradient background, headline, subtext, CTA buttons
2. Feature Cards - 3 cards with icons (Argon, Django, React)
3. Basic Elements - button examples, color swatches
4. Inputs Section - form field examples
5. Custom Controls - checkboxes, radios, toggles
6. Navigation - 6 navbar variants
7. Javascript Components - tabs, modals, tooltips, datepicker
8. Icons Gallery - icon display grid
9. Examples - sample cards and layouts
10. Download CTA - call-to-action section
11. Contact Form - name, email, message fields
```

### Components Page (~600 lines)
```
Demonstrates ALL UI components:
- Buttons (all variants and sizes)
- Alerts (all 4 colors)
- Badges (all 5 colors)
- Cards (simple, hover, image)
- Inputs (all states)
- Checkboxes, Radios, Switches
- Dropdowns
- Modals (3 types)
- Tabs (2 styles)
- Progress Bars
- Pagination
- Navbars (6 colors)
- Tooltips
- Datepickers
- Images (4 styles)
- Typography
```

### Login Page (~200 lines)
```
Features:
- Gradient purple background
- Centered white card
- Social login buttons (Github, Google)
- "Or sign in with credentials" divider
- Email input with icon
- Password input with icon
- Remember me checkbox
- Sign In button
- Forgot password link
- Create account link
```

### Register Page (~230 lines)
```
Features:
- Gradient purple background
- Centered white card
- Social signup buttons (Github, Google)
- "Or sign up with credentials" divider
- Name input with icon
- Email input with icon
- Password input with icon
- Agree to terms checkbox
- Create Account button
- Already have account link
```

### Profile Page (~100 lines)
```
Features:
- Header with cover image
- User avatar (circular)
- User name and location
- Stats row (friends, photos, comments)
- Bio/description text
- Show More button
```

---

## Authentication Flow

### Registration
1. User fills name, email, password
2. Frontend validates inputs
3. POST /api/users/signup
4. Backend creates user in PostgreSQL
5. Returns success, redirect to login

### Login
1. User fills email, password
2. Frontend validates inputs
3. POST /api/users/login
4. Backend verifies credentials
5. Returns JWT access token + sets refresh token cookie
6. Frontend stores user in state
7. Redirect to home

### Session Management
- Access token: 15 minutes expiry
- Refresh token: 7 days expiry (httpOnly cookie)
- Auto-refresh on 401 response

### Logout
1. POST /api/auth/logout
2. Backend clears refresh token
3. Frontend clears state
4. Redirect to home

---

## Expected Output Size

| Category | Files | Lines |
|----------|-------|-------|
| UI Components | 21 | ~1,700 |
| Layout Components | 4 | ~700 |
| Pages | 6 | ~2,000 |
| Page Sections | 15 | ~2,000 |
| Backend | 8 | ~600 |
| Config/Utils | 5 | ~200 |
| **TOTAL** | **59** | **~7,200** |

---

## Success Criteria

### Functional Requirements
- [ ] 59 files generated
- [ ] ~7,000+ lines of code
- [ ] All 6 navbar color variants working
- [ ] All 4 alert variants with icons
- [ ] Tabs with icons and text-only variants
- [ ] 3 modal types (default, notification, form)
- [ ] Progress bars with labels and percentages
- [ ] Pagination with numbered pages
- [ ] Datepicker with single and range modes
- [ ] Images in 4 styles
- [ ] Full authentication flow (register, login, logout)
- [ ] Profile page with user data
- [ ] Responsive on all screen sizes

### Non-Functional Requirements
- [ ] Pages load within 2 seconds
- [ ] Works on Chrome, Firefox, Safari, Edge
- [ ] Responsive from 320px to 1920px
- [ ] Keyboard accessible
- [ ] Screen reader compatible

---

## Deliverables

1. Complete frontend application (React 18 + TypeScript + Tailwind)
2. Backend API (Express + TypeScript)
3. Database schema (PostgreSQL)
4. Docker Compose for local development
5. README with setup instructions
6. Sample user credentials for testing

---

## 9. DETAILED CODE TEMPLATES

### 9.1 Component Template (Button.tsx)

Generate ALL components following this exact pattern:

```tsx
import React from 'react';
import { cn } from '@/lib/utils';

// 1. Define TypeScript interface for props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'default';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// 2. Define variant styles as const object
const variantStyles = {
  primary: 'bg-[#5e72e4] hover:bg-[#525fd5] text-white',
  success: 'bg-[#2dce89] hover:bg-[#26af74] text-white',
  danger: 'bg-[#f5365c] hover:bg-[#d32a4e] text-white',
  warning: 'bg-[#fb6340] hover:bg-[#e55a39] text-white',
  info: 'bg-[#11cdef] hover:bg-[#0eb4cf] text-white',
  default: 'bg-[#172b4d] hover:bg-[#0f1d32] text-white',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

// 3. Export named component with forwardRef
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    isLoading, 
    leftIcon, 
    rightIcon, 
    children, 
    disabled,
    ...props 
  }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-semibold rounded-md',
          'transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5e72e4]',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

### 9.2 Page Template (Login.tsx)

Generate ALL pages following this exact pattern:

```tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { Button, Input, Checkbox } from '@/components/ui';

// 1. Define form state interface
interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

// 2. Define validation errors interface
interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  
  // 3. Initialize form state
  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
    rememberMe: false,
  });
  
  const [errors, setErrors] = useState<FormErrors>({});

  // 4. Validation function
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!form.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 5. Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await login(form.email, form.password);
      navigate('/profile');
    } catch (error) {
      setErrors({ general: 'Invalid email or password' });
    }
  };

  // 6. Input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#5e72e4] to-[#825ee4] flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#172b4d]">Sign In</h2>
          <p className="text-gray-500 mt-2">Sign in with credentials</p>
        </div>

        {/* Social Login */}
        <div className="flex gap-4 mb-6">
          <Button variant="default" className="flex-1" type="button">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385..." />
            </svg>
            Github
          </Button>
          <Button variant="default" className="flex-1" type="button">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92..." />
            </svg>
            Google
          </Button>
        </div>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">Or</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.general && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
              {errors.general}
            </div>
          )}

          <Input
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="Email"
            leftIcon={<span>📧</span>}
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="Password"
            leftIcon={<span>🔒</span>}
          />

          <Checkbox
            name="rememberMe"
            checked={form.rememberMe}
            onChange={handleChange}
            label="Remember me"
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            isLoading={isLoading}
          >
            Sign In
          </Button>
        </form>

        {/* Footer Links */}
        <div className="mt-6 text-center text-sm">
          <Link to="/forgot-password" className="text-[#5e72e4] hover:underline">
            Forgot password?
          </Link>
          <span className="mx-2 text-gray-400">|</span>
          <Link to="/register" className="text-[#5e72e4] hover:underline">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
```

### 9.3 Auth Store Template (authStore.ts)

```tsx
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiClient } from '@/lib/api';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await apiClient.post('/api/users/login', { email, password });
          const { user } = response.data;
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error: any) {
          set({ 
            error: error.response?.data?.message || 'Login failed', 
            isLoading: false 
          });
          throw error;
        }
      },

      register: async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
          await apiClient.post('/api/users/signup', { name, email, password });
          set({ isLoading: false });
        } catch (error: any) {
          set({ 
            error: error.response?.data?.message || 'Registration failed', 
            isLoading: false 
          });
          throw error;
        }
      },

      logout: async () => {
        try {
          await apiClient.post('/api/auth/logout');
        } finally {
          set({ user: null, isAuthenticated: false });
        }
      },

      refreshSession: async () => {
        try {
          const response = await apiClient.post('/api/auth/refresh');
          // Token is set via httpOnly cookie by backend
          if (response.data.user) {
            set({ user: response.data.user, isAuthenticated: true });
          }
        } catch {
          get().logout();
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
```

### 9.4 API Client Template (api.ts)

```tsx
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  timeout: 10000,
  withCredentials: true, // Send httpOnly cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add CSRF token if available
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (csrfToken) {
      config.headers['X-CSRF-Token'] = csrfToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh token
        await apiClient.post('/api/auth/refresh');
        // Retry original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed, redirect to login
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
```

### 9.5 Utility Functions Template (utils.ts)

```tsx
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Merge Tailwind classes safely
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date
export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

// Validate email
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
```

---

## 10. BACKEND CODE TEMPLATES

### 10.1 Express Server (server.ts)

```tsx
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authRoutes } from './routes/auth.routes';
import { initDatabase } from './config/database';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api', authRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Initialize database and start server
initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
```

### 10.2 Auth Controller (auth.controller.ts)

```tsx
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { z } from 'zod';

const authService = new AuthService();

// Validation schemas
const signupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});

export const signup = async (req: Request, res: Response) => {
  try {
    const data = signupSchema.parse(req.body);
    const user = await authService.register(data.name, data.email, data.password);
    res.status(201).json({ user });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    res.status(400).json({ message: error.message || 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const data = loginSchema.parse(req.body);
    const { user, accessToken, refreshToken } = await authService.login(data.email, data.password);
    
    // Set refresh token as httpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    
    res.json({ user, accessToken });
  } catch (error: any) {
    res.status(401).json({ message: error.message || 'Invalid credentials' });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: 'No refresh token' });
    }
    
    const { accessToken, newRefreshToken } = await authService.refreshTokens(refreshToken);
    
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    
    res.json({ accessToken });
  } catch (error) {
    res.status(401).json({ message: 'Invalid refresh token' });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('refreshToken');
  res.json({ success: true });
};
```

---

## 11. COMPONENT SPECIFICATIONS (DETAILED)

### 11.1 Alert Component

**File**: `src/components/ui/Alert.tsx`
**Lines**: ~80

```
Props:
- variant: 'success' | 'info' | 'warning' | 'danger' (required)
- title?: string
- children: React.ReactNode (message content)
- dismissible?: boolean (default: false)
- onDismiss?: () => void
- icon?: React.ReactNode (custom icon override)

Styling:
- success: bg-[#2dce89]/10 border-[#2dce89] text-[#2dce89]
- info: bg-[#11cdef]/10 border-[#11cdef] text-[#11cdef]
- warning: bg-[#fb6340]/10 border-[#fb6340] text-[#fb6340]
- danger: bg-[#f5365c]/10 border-[#f5365c] text-[#f5365c]

Default Icons:
- success: ✓ checkmark
- info: ℹ info circle
- warning: ⚠ exclamation triangle
- danger: 🔥 fire or ✕

Behavior:
- Fade out animation on dismiss (300ms)
- Icon on left, title bold, message below or inline
- Close button on right (if dismissible)
```

### 11.2 Navbar Component

**File**: `src/components/ui/Navbar.tsx`
**Lines**: ~120

```
Props:
- variant: 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'info'
- brand?: string | React.ReactNode
- children: React.ReactNode (nav items)
- sticky?: boolean
- transparent?: boolean

Color Variants (EXACT):
1. default: bg-[#172b4d] - dark navy
2. primary: bg-[#5e72e4] - blue
3. success: bg-[#2dce89] - green
4. danger: bg-[#f5365c] - red
5. warning: bg-[#fb6340] - orange
6. info: bg-[#11cdef] - cyan

Sub-components:
- NavItem: individual nav link
- NavIcon: icon-only nav item
- NavDropdown: dropdown menu

Structure:
- Full-width bar
- Left: brand/logo text
- Right: nav items (links or icons)
- Mobile: hamburger menu toggle
```

### 11.3 Modal Component

**File**: `src/components/ui/Modal.tsx`
**Lines**: ~140

```
Props:
- isOpen: boolean (required)
- onClose: () => void (required)
- title?: string
- size?: 'sm' | 'md' | 'lg' (default: 'md')
- type?: 'default' | 'notification' | 'form'
- children: React.ReactNode (body content)
- footer?: React.ReactNode

Sizes:
- sm: max-w-sm (384px)
- md: max-w-md (448px)
- lg: max-w-lg (512px)

Types:
1. default: standard modal with header/body/footer
2. notification: centered icon, title, message, single button
3. form: contains form inputs, submit/cancel buttons

Behavior:
- Dark backdrop (bg-black/50)
- Click outside to close
- Escape key to close
- Focus trap inside modal
- Slide-down animation on open
- Prevent body scroll when open
```

### 11.4 Tabs Component

**File**: `src/components/ui/Tabs.tsx`
**Lines**: ~200

```
Props:
- defaultValue: string (initial active tab)
- variant?: 'default' | 'pills' (default: 'pills')
- children: React.ReactNode (Tab and TabPanel components)

Sub-components:
- TabList: container for Tab buttons
- Tab: individual tab button
  - value: string (required)
  - icon?: React.ReactNode
  - disabled?: boolean
- TabPanel: content panel
  - value: string (required, matches Tab value)

Styling:
- Pills: rounded-full bg-white shadow when active
- Active: bg-[#5e72e4] text-white
- Inactive: bg-transparent text-gray-600

Behavior:
- Click tab to switch content
- Keyboard: Arrow keys to navigate, Enter to select
- ARIA: role="tablist", role="tab", role="tabpanel"
- Only active TabPanel is visible
```

---

## 12. PAGE SPECIFICATIONS (DETAILED)

### 12.1 Landing Page

**File**: `src/pages/Landing.tsx`
**Lines**: ~800

**Sections** (in order):

1. **Hero Section** (~90 lines)
   - Gradient background (purple to blue)
   - Large headline: "Design System for Bootstrap 4"
   - Subtext paragraph
   - Two CTA buttons: "Get Started" (primary), "Github" (outline)
   - Decorative shapes/blobs

2. **Feature Cards** (~100 lines)
   - 3 cards in a row
   - Each card: icon, title, description
   - Cards: Argon (design), Django (backend), React (frontend)
   - Hover: lift shadow effect

3. **Basic Elements** (~90 lines)
   - Button examples (all 6 colors, all 3 sizes)
   - Color swatches showing the palette
   - Typography samples

4. **Inputs Section** (~80 lines)
   - Text input with icon
   - Success state input
   - Error state input
   - Disabled input

5. **Custom Controls** (~260 lines)
   - Checkboxes (3 examples)
   - Radio buttons (grouped)
   - Toggle switches (3 examples)
   - Range sliders (2 examples)

6. **Navigation Section** (~200 lines)
   - 6 navbar variants stacked vertically
   - Each showing different color and content

7. **Javascript Components** (~120 lines)
   - Tabs demo (with icons, text-only)
   - Modal triggers (3 types)
   - Tooltip examples (4 positions)
   - Datepicker demo

8. **Progress & Pagination** (~80 lines)
   - Progress bars with labels
   - Pagination component

9. **Icons Gallery** (~80 lines)
   - Grid of icon examples
   - Icon names below each

10. **Examples Section** (~100 lines)
    - Sample card layouts
    - Image gallery

11. **Download CTA** (~130 lines)
    - Full-width gradient section
    - Headline and description
    - Download button

12. **Contact Form** (~100 lines)
    - Name, email, message fields
    - Submit button

### 12.2 Components Page

**File**: `src/pages/Components.tsx`
**Lines**: ~600

**Sections**:
- Buttons showcase (all variants, sizes, states)
- Alerts showcase (all 4 colors, dismissible)
- Badges showcase (all 5 colors, pill/rounded)
- Cards showcase (simple, hover, image)
- Inputs showcase (all states, icons)
- Custom controls (checkbox, radio, switch)
- Dropdowns demo
- Modals demo (3 types with triggers)
- Tabs demo (2 styles)
- Progress bars
- Pagination
- Navbars (6 colors)
- Tooltips (4 positions)
- Datepickers
- Images (4 styles)
- Typography

---

## 13. TESTING REQUIREMENTS

### 13.1 Unit Tests (Vitest)

Every component MUST have tests covering:

```tsx
// Example: Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies variant styles', () => {
    render(<Button variant="success">Success</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-[#2dce89]');
  });

  it('shows loading spinner when isLoading', () => {
    render(<Button isLoading>Loading</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('calls onClick handler', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### 13.2 Integration Tests

```tsx
// Example: Login.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Login } from './Login';

describe('Login Page', () => {
  it('shows validation errors for empty fields', async () => {
    render(<BrowserRouter><Login /></BrowserRouter>);
    
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  it('submits form with valid data', async () => {
    render(<BrowserRouter><Login /></BrowserRouter>);
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@test.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    // Assert navigation or success state
  });
});
```

---

## 14. DOCKER CONFIGURATION

### 14.1 docker-compose.yml

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "5173:5173"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - VITE_API_BASE_URL=http://localhost:3000
    depends_on:
      - backend

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    volumes:
      - ./backend:/app
      - /app/node_modules
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@postgres:5432/argon_db
      - JWT_SECRET=your-secret-key
      - CORS_ORIGIN=http://localhost:5173
    depends_on:
      postgres:
        condition: service_healthy

  postgres:
    image: postgres:16-alpine
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=argon_db
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
```

### 14.2 Frontend Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
```

### 14.3 Backend Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
```

---

## 15. SUCCESS CRITERIA (EXPANDED)

### 15.1 Functional Requirements

| ID | Requirement | Verification | Target |
|----|-------------|--------------|--------|
| F1 | All 6 pages render | Manual test | 100% |
| F2 | All 21 UI components work | Component tests | 100% |
| F3 | All 6 navbar colors | Visual test | 100% |
| F4 | All 4 alert variants | Visual test | 100% |
| F5 | Tabs with icons/text | Interactive test | 100% |
| F6 | 3 modal types | Interactive test | 100% |
| F7 | Progress bars | Visual test | 100% |
| F8 | Pagination | Interactive test | 100% |
| F9 | Datepicker | Interactive test | 100% |
| F10 | 4 image styles | Visual test | 100% |
| F11 | Auth flow (register/login/logout) | E2E test | 100% |
| F12 | Token refresh | Integration test | 100% |
| F13 | Protected routes | Integration test | 100% |
| F14 | Form validation | Unit tests | 100% |
| F15 | Responsive design | Device test | 320px-1920px |

### 15.2 Code Quality Requirements

| ID | Requirement | Target |
|----|-------------|--------|
| Q1 | TypeScript strict mode | No `any` types |
| Q2 | ESLint errors | 0 |
| Q3 | Test coverage | > 80% |
| Q4 | Bundle size | < 150KB gzipped |
| Q5 | Lighthouse Performance | > 90 |
| Q6 | Lighthouse Accessibility | > 90 |
| Q7 | No console errors | 0 |

### 15.3 File Count Requirements

| Category | Files | Lines |
|----------|-------|-------|
| UI Components | 21 | ~1,700 |
| Layout Components | 4 | ~700 |
| Pages | 6 | ~2,000 |
| Page Sections | 15 | ~2,000 |
| Backend | 8 | ~600 |
| Config/Utils | 5 | ~200 |
| **TOTAL** | **59** | **~7,200** |

---

## 16. DELIVERABLES CHECKLIST

### Frontend
- [ ] 21 UI components in `src/components/ui/`
- [ ] 4 layout components in `src/components/layout/`
- [ ] 6 pages in `src/pages/`
- [ ] 15 page sections in `src/pages/sections/`
- [ ] Auth store in `src/stores/authStore.ts`
- [ ] API client in `src/lib/api.ts`
- [ ] Utility functions in `src/lib/utils.ts`
- [ ] Routes in `src/routes.tsx`
- [ ] Tailwind config with Argon colors
- [ ] Vite config with path aliases

### Backend
- [ ] Express server setup
- [ ] Auth routes (signup, login, refresh, logout)
- [ ] Auth controller with validation
- [ ] Auth service with JWT logic
- [ ] User repository with PostgreSQL
- [ ] Database schema initialization

### Infrastructure
- [ ] docker-compose.yml
- [ ] Frontend Dockerfile
- [ ] Backend Dockerfile
- [ ] .env.example files
- [ ] README with setup instructions

### Testing
- [ ] Unit tests for all components
- [ ] Integration tests for auth flow
- [ ] Test setup with Vitest

---

*Legacy Reference: /Users/dparikh2/vuejs-argon-design-system*
*Legacy Stats: 56 Vue files, 5,617 lines Vue, 11,756 lines SCSS*
*Target: ~7,200 lines TypeScript/TSX across 59 files*

*Document Version: 2.0*
*Last Updated: March 2026*
