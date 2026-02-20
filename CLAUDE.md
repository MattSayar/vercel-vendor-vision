# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server (Next.js)
pnpm build        # Production build (TypeScript errors are ignored via next.config.mjs)
pnpm lint         # ESLint
```

## Architecture

This is a **VendorVision** demo app — a supply chain risk intelligence dashboard built for Abnormal Security. It was scaffolded from v0.app.

**Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, pnpm

### Single-page client-side routing

The app has one route (`app/page.tsx`) that acts as a shell. Screen navigation is managed entirely via React state (`useState<Screen>`), not Next.js routing. The `Screen` type is defined in `components/vendor-vision/sidebar-nav.tsx` and includes: `dashboard`, `cases`, `vendor-detail`, `remediation`, `reports`.

The shell composes: `SidebarNav` (left nav) + `TopBar` (header) + a screen component selected by the current `screen` state.

### Data layer

All data is hardcoded in `lib/demo-data.ts` — there is no backend, no API calls, no database. This file exports typed arrays (`vendors`, `riskCases`, `activityFeed`, etc.) and helper functions (`getSeverityColor`, `getSeverityDot`, `getConfidenceColor`).

### UI components

- `components/ui/` — shadcn/ui components (new-york style, Radix primitives, `lucide-react` icons). Configured in `components.json`.
- `components/vendor-vision/` — App-specific screen and layout components. Each `screen-*.tsx` file is a full screen view.

### Styling

- Tailwind CSS v4 with `@tailwindcss/postcss` plugin (no `tailwind.config` file — config is in `app/globals.css`)
- Design tokens (colors, radii, sidebar colors) defined as CSS custom properties in `app/globals.css` using oklch
- Fonts: DM Sans (body) and IBM Plex Mono (monospace), loaded via `next/font/google`
- The `cn()` utility in `lib/utils.ts` merges Tailwind classes (`clsx` + `tailwind-merge`)
- Many colors are hardcoded hex values (e.g., `#EF4444` for critical, `#F97316` for high, `#EAB308` for medium, `#22C55E` for low/success)

### Charts

Uses `recharts` for data visualization (AreaChart, RadarChart, LineChart, BarChart). Chart components are embedded directly in screen components, not abstracted.

### Path aliases

`@/*` maps to the project root (configured in `tsconfig.json`).
