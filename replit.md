# Refilter - Сайт по чистке DPF/FAP фильтров

## Overview
Refilter is a professional, sales-oriented landing page for a DPF/FAP filter cleaning service in Grodno. The project aims to maximize conversion and generate leads through a user-friendly interface and clear value propositions. Key capabilities include an interactive cost calculator, online appointment booking, and comprehensive service information.

## User Preferences
- I prefer simple language and clear explanations.
- I like iterative development; let's build step-by-step.
- Ask before making major architectural changes or adding new external dependencies.
- Ensure all changes are thoroughly tested and do not introduce regressions.
- Prioritize solutions that directly contribute to lead generation and user conversion.

## System Architecture
The project is built with a modern web stack designed for performance and maintainability.

**UI/UX Decisions:**
- **Color Palette:** Primary (Deep Blue: `210 85% 25%`) for professionalism, Accent (Electric Orange: `25 95% 55%`) for CTAs, Success (Emerald: `150 70% 45%`) for guarantees.
- **Typography:** Manrope for headings (700/800 weight) and numbers, Inter for body text (400/500/600 weight).
- **Components:** Utilizes Shadcn/ui for core UI elements, custom gradients for hero and accent blocks, smooth animations via Framer Motion, and elevation utilities for hover/active states.
- **Design Approach:** Emphasizes a bright hero section with a gradient background, clear value propositions, dual CTAs, and trust indicators. Sticky floating call and appointment buttons improve accessibility.

**Technical Implementations:**
- **Frontend:** React, TypeScript, Tailwind CSS, Framer Motion.
- **Form Handling:** React Hook Form with Zod for validation.
- **Mapping:** Yandex Maps API integration for location display.
- **Performance Optimization (October 2025 Updates):**
    - **Lazy Loading:** Below-the-fold sections (PriceCalculator, PricingSection, ProcessSection, BookingSection, FaqSection, ContactSection, Footer, StickyButtons) are lazy-loaded using React.lazy() and Suspense to reduce initial JavaScript bundle size.
    - **Advanced Code Splitting:** Vendor chunks are split into smaller, targeted chunks (framer-motion, radix-ui, react-vendor, icons, vendor) for better caching and parallel loading.
    - **Console Removal:** Production builds automatically remove all console.log, console.info, and console.debug statements using Terser.
    - **Server-Side Caching:** Static assets (JS, CSS, fonts, images) are cached for 1 year with immutable flag; HTML is served with no-cache headers.
    - **Resource Hints:** dns-prefetch and preconnect added for Web3Forms API to reduce DNS lookup time.
    - **Optimized Font Loading:** Reduced font variants from 7 to 4 (only critical weights: Inter 400/700, Manrope 700/800).
    - **Theme Color Meta:** Added theme-color meta tag for better mobile browser integration.
    - Critical CSS inlining in `index.html` for instant above-the-fold rendering (includes structural defaults, typography, fixed header).
    - Aggressive image compression via `vite-plugin-image-optimizer`: AVIF (quality: 60), WebP (quality: 75), PNG (quality: 80).
    - Self-hosting fonts via `@fontsource` with built-in `font-display: swap` to eliminate render-blocking requests.
    - Netlify asset optimization (minification, Brotli compression).
    - Correct `robots.txt` and SEO metadata for search engine visibility.
    - Implementation of an ErrorBoundary component for graceful error handling.
    - **Target:** 90+ Google PageSpeed scores on mobile and 95+ on desktop.
- **Accessibility Enhancements:**
    - Comprehensive ARIA labels on all interactive elements (buttons, forms, navigation, calculator, sticky CTAs).
    - Proper ARIA roles and states (aria-pressed, aria-hidden, aria-label, aria-labelledby).
    - Mobile navigation with body scroll lock (prevents background scrolling when menu is open).
    - Semantic HTML5 structure for screen reader compatibility.
    - Target: 100/100 Google PageSpeed Accessibility scores on both mobile and desktop.

**Feature Specifications:**
- **Hero Section:** Prominent block with USP, dual CTAs ("Book Online" / "Call"), and trust indicators.
- **Interactive Cost Calculator:** Allows users to select vehicle type and additional options for instant price calculation.
- **Pricing Block:** Displays core and additional services, highlights popular options, and features a 6-month/50,000 km warranty banner.
- **Cleaning Process:** Visual timeline of 5 steps with before/after photos and technology description.
- **Online Booking Form:** Validated fields (name, phone, vehicle type, date), direct submission to Web3Forms API, success/error handling, and email notifications.
- **FAQ Section:** Accordion-style answers to common questions.
- **Contacts:** Interactive Yandex Map, address, phone, and working hours.
- **SEO:** Meta tags, Open Graph, and semantic markup optimized for relevant search queries.

**System Design Choices:**
- **Monorepo-like Structure:** `client` for frontend, `server` for potential backend (currently minimal), `shared` for common types and schemas.
- **Deployment:** Primarily designed for Netlify, with the booking form leveraging Web3Forms API directly from the frontend to avoid a dedicated backend.

## External Dependencies
- **Web3Forms API:** Used for handling online booking form submissions and email notifications directly from the frontend.
- **Yandex Maps API:** Integrated for displaying the service location interactively.
- **@fontsource:** Used for self-hosting Manrope and Inter fonts.
- **Shadcn/ui:** Provides a collection of re-usable UI components.
- **Framer Motion:** Used for declarative animations.