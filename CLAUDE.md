## Package Manager

This project uses **Bun** instead of npm. Use `bun` for all package management and script commands (e.g., `bun install`, `bun run dev`, `bun run build`).

## Stack

- **Framework**: Next.js 15 (App Router, React 19, TypeScript)
- **Styling**: Tailwind CSS 3 with CSS custom properties (HSL format) defined in `app/globals.css`
- **Components**: shadcn-ui (New York style, lucide icons, `@/components/ui/`)
- **Theming**: next-themes with light/dark mode via `.dark` class selector
- **Charts**: recharts via shadcn chart wrapper (`ChartContainer`, `ChartTooltip`)
- **Fonts**: Bricolage Grotesque (display/body, `--font-bricolage`) + Red Hat Mono (data values, `--font-mono`)
- **Date formatting**: date-fns
- **SVGs**: @svgr/webpack for importing SVGs as React components

## Color Palette — Forest & Amber

The theme uses a PNW-inspired "Forest & Amber" palette. Colors are defined as HSL CSS variables in `app/globals.css` with both `:root` (light) and `.dark` variants.

- **Primary**: deep forest green (light) / sage green (dark)
- **Accent**: warm amber — used for visual emphasis (title borders, icons, chart highlights)
- **Chart colors**: `--chart-1` through `--chart-5`, amber-to-green range

Always use semantic color tokens (`bg-card`, `text-muted-foreground`, `border-accent`, etc.) — never hardcode hex or HSL values in components.

## Layout Patterns

- **Page structure**: `app/layout.tsx` provides sticky nav + `<main>` (max-w-7xl, centered) + footer
- **Sections**: each dashboard section is wrapped in `<Container>` (`components/layout/container/`) with a `<Title>` that has an amber left-border accent and anchor link
- **Grid dashboard**: the home page uses `space-y-6` with CSS grid for multi-column sections (`grid grid-cols-1 md:grid-cols-2`, etc.)
- **Current conditions**: dense grid (`grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6`)
- **Navigation**: sticky header with section jump links (anchor-based) for both desktop and mobile

## Data Display Conventions

- Use the `font-mono-data` utility class for numeric values (applies Red Hat Mono + tabular-nums)
- Current condition cards: label (small, muted) above value (large, mono, bold) above timestamp (tiny, muted)
- Tables (shadcn `Table`) are preferred over vertical bar charts when label overlap is a concern (see BirdNET)
- Charts use theme-aware colors: `hsl(var(--chart-1))` etc. — never hardcode chart colors

## Data Fetching

- Server components fetch from backend APIs using `async/await` with `fetch()`
- API auth via `X-API-Key` header from `process.env.API_KEY`
- Base URLs from `process.env.API_BASE_URL` and `process.env.FORECAST_INFERENCE_API_BASE_URL`
- Home page uses `export const dynamic = "force-dynamic"`
- Wrap async containers in `<Suspense>` with matching skeleton fallback components
- Error states: show a descriptive message inside a `border-destructive` styled container

## Component Organization

```
components/
  ui/             # shadcn primitives (do not edit manually — use `bunx shadcn@latest add`)
  layout/         # Container, Title
  navigation/     # Header nav with section links
  home/           # Dashboard section containers
    current/      # Current conditions grid
    history/      # 7-day history line charts
    ai-forecast/  # AI forecast summary
    forecast/     # NWS detailed forecast
    alerts/       # NWS weather alerts
    birdnet/      # BirdNET species detection table
    raspberryshake/ # Seismology iframe embed
    electricitymaps/ # Power grid breakdown
    charts/       # Shared chart components (line/, vbar/)
  images/         # Camera cards and containers
  weather/        # Weather icon mapper
  theme/          # ThemeProvider, ModeToggle
  footer/         # Site footer
  share/          # Share button
```

## Key Constraints

- **shadcn components in `components/ui/` should not be manually edited** — they are managed by the shadcn CLI
- **External iframes/embeds**: do not fabricate URL parameters for third-party services without verifying they exist
- **Client components**: only add `"use client"` when the component genuinely needs browser APIs, hooks, or interactivity. Data-fetching containers should remain server components
- **Scroll offset**: elements with `[id]` have `scroll-margin-top: 8rem` in globals.css to clear the sticky navbar
- **Responsive**: all layouts must work on mobile (single column) through desktop (multi-column grid). Use Tailwind responsive prefixes (`sm:`, `md:`, `lg:`)
- **Accessibility**: use proper semantic HTML, sr-only labels, and Radix primitives via shadcn
