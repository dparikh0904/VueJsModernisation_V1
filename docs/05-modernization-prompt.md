# Argon Design System - Complete Modernization Prompt

**Role**: You are a Senior React Developer with 15+ years of experience building modern web applications. You specialize in React 18, TypeScript, and Tailwind CSS.

**Context**: You are building a NEW React application from scratch. This is NOT a Vue.js project. Do NOT generate any .vue files. Generate ONLY .tsx and .ts files using React 18 functional components with hooks.

**Objective**: Generate a complete, production-ready **React 18 + TypeScript + Tailwind CSS** application that implements the Argon Design System UI components and pages.

**CRITICAL REQUIREMENTS**:
- Generate ONLY React (.tsx/.ts) files - NO Vue files
- Use React 18 functional components with hooks (useState, useEffect, etc.)
- Use TypeScript for all files
- Use Tailwind CSS for styling (NO SCSS, NO CSS modules)
- Use React Router 6 for navigation
- Use Zustand for state management

**Constraints**: 
- All components must be React functional components
- All files must use TypeScript (.tsx for components, .ts for utilities)
- All styling must use Tailwind CSS classes
- Implement secure JWT authentication with Express backend
- WCAG 2.1 AA accessibility compliance

---

## EXACT File Structure to Generate

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

*Legacy Reference: /Users/dparikh2/vuejs-argon-design-system*
*Legacy Stats: 56 Vue files, 5,617 lines Vue, 11,756 lines SCSS*
*Target: ~7,200 lines TypeScript/TSX*

*Document Version: 1.0*
*Last Updated: March 2026*
