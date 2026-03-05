# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **DataPage** — Unified layout component with `layout="grid"` or `layout="list"`: optional PageHeader, loading, empty state, pagination.
- **Toggle** — `variant="checkbox"`: styled checkbox with label, error, description, tri-state.
- **Grid** — Standalone grid component: items, renderCard, columns (1–4), keyExtractor, gridClassName, threeD. Stories: Default, TwoColumns. Unit tests added.
- **Dialog** — Optional footerActions (array of { label, onClick, icon?, variant?, loading? }) for buttons with icons; footer takes precedence when both footer and footerActions are provided. Stories: WithFooterActionsAndIcons, ConfirmationVariants.
- **Input** — Optional `endAdornment` slot (e.g. button at the end); Storybook stories for icon left/right and endAdornment (Paste, Search, password visibility toggle).
- **Scripts:** `npm run createPackage` (clean, build, pack) and `npm run pack` (remove existing tgz for current version, then npm pack). Double-click scripts `scripts/create-package.bat` (Windows) and `scripts/create-package.command` (macOS) to create the package tgz.
- **Docs:** Grid, DataPage, Dialog (footer actions), Input (icon + endAdornment) in README and Storybook Introduction; Layout section lists DataPage and pagination.

### Removed

- **ModalPortal** — Removed; Dialog now uses React’s `createPortal` directly. There is no public portal component; use `createPortal` in your app if you need a custom portal target.
- **Checkbox** — Removed; use `<Toggle variant="checkbox" />`.
- **GridPage** — Removed; use `<DataPage layout="grid" ... />`.
- **ListPage** — Removed; use `<DataPage layout="list" ... />`.
- **ConfirmationDialog** — Removed; use Dialog with footerActions (and optional icons) for confirmation flows. E2E confirmation-dialog.spec.ts now targets Dialog ConfirmationVariants story.
- **ajv** — Removed from devDependencies (unused).

### Changed

- **React 19** — Peer dependency is now React 19+ (and react-dom). Components use direct `ref` prop (no `forwardRef`); plain function components (no `React.FC`).
- **Node** — `engines` now require Node >= 20.
- **Dialog** — Uses `useId()` for title/labelledby IDs (multiple dialogs no longer share the same ID).
- **Pagination** — Uses `useId()` for page-size select/label (multiple instances safe).
- **Card** — Layout class selection uses a lookup map instead of nested ternaries.
- **Docs:** README and Storybook Introduction list DataPage and Toggle (checkbox variant). CONTRIBUTING recommends plain function components instead of React.FC. README Overlays section and E2E smoke tests updated after ModalPortal removal; README adds a short "Theming" note (CSS variables in one place).
- **Styling (light/dark):** Glassmorphism-style surfaces with shared CSS variables; global `--glass-border` uses a visible tint in light mode (no longer white-on-white). Hover states use explicit `rgba` backgrounds so they are visible in both themes (Button, Accordion, Dialog, Toast, TabNavigation, Pagination, ThemeToggle, Card). TabNavigation panel uses stronger background and text contrast; EmptyState uses stronger glass background. Toggle button variant uses neutral slate styling (no blue) for pressed/hover; switch and checkbox use matching slate when on. StackedCardsDeck cards use opaque backgrounds so stacked cards do not show through.
- **TabNavigation** — Panel content has improved contrast (stronger background, darker text in light mode). Tab and pill hover states visible in light and dark mode.
- **Toast (Storybook)** — Default story shows sample toasts (no add buttons); layout fullscreen and decorator min-height for visibility; stories renamed (e.g. SuccessOnly → Success).
- **Build / pack:** `build` and `dev` use `npx cross-env` so they work when run via double-click or from contexts where `node_modules/.bin` is not on PATH. `clean` and `pack` use `npx rimraf` and a node one-liner (delete tgz by version from package.json) so they run reliably on Windows; `pack` no longer uses a glob (fixes "Illegal characters in path" on Windows). `test:e2e:sequential` uses `npx cross-env`.
- **Test report scripts:** `generate-tests-report.bat` and `generate-tests-report.command` now run Playwright e2e with **max workers** (`E2E_USE_MAX_WORKERS=1`) for faster report generation. Final step uses `npm run build` then `npm run pack`.
- **Playwright config:** Worker count: when `E2E_USE_MAX_WORKERS=1` use all CPUs; when using static Storybook (`E2E_USE_STATIC=1`) use 1 worker to avoid timeouts; otherwise CI uses all CPUs, local uses 2. Static Storybook e2e uses `waitUntil: "networkidle"` for story load.

### Fixed

- **StackedCardsDeck:** Scroll-end padding capped to avoid excess empty space on large viewports; single-card case uses zero bottom padding; padding calculation uses container computed padding (no hardcoded values); guards for non-finite padding in tests. Cards use opaque backgrounds in stacked context so lower cards do not show through.
- **Exports:** Public API now exports `QueueCardItem` (matches component; previously documented as `StackedCardItem`).
- **Docs:** README, CONTRIBUTING, Storybook Introduction, and component stories aligned with current exports (no Checkbox, GridPage, ListPage, ConfirmationDialog), React 19 patterns, and styling (glassmorphism, dark/light hover visibility, Toggle neutral palette).
- **Storybook:** StackedCardsDeck stories use only real props (items, containerHeight, cardHeight, spacing, className); removed invalid SubtleMotion story and non-existent args (scaleStep, fadeStep, rotateStep, gap).
- **Tests:** Removed unused imports in DateTimePicker and Form tests; fixed List test type for `BaseListItem`; StackedCardsDeck tests consolidated and coverage improved.
- **Accessibility / contrast:** Text and borders adjusted for WCAG-friendly contrast in light and dark mode (e.g. TabNavigation panel, PageHeader subtitle, Accordion/Toast body text, DateTimePicker/Toast/Alert/Dialog/Dropdown error and icon colors, Card detail labels).
- **Input (Storybook):** Icon and endAdornment stories use `render` so Lucide icons and Button are passed correctly (Storybook does not serialize component refs in args). Input CSS: icon and endAdornment containers use `z-index` so they appear above the input field and are visible.

## [1.0.0] - 2025-02-24

### Added

- Initial release as standalone open-source library.
- Components: Accordion, Alert, Badge, Button, Card, Carousel, DangerZone, DateTimePicker, Dialog, Dropdown, EmptyState, ErrorBoundary, Form, Input, List, LoadingSpinner, PageHeader, Pagination, Progress, SearchInput, StackedCardsDeck, TabNavigation, Toast, Toggle.
- ThemeProvider, useThemeContext, useThemeContextOptional, and ThemeToggle for dark/light mode.
- Full dark mode support via `.dark` class on document root.
- Storybook documentation.
- Unit tests (Vitest) and E2E tests (Playwright).
- CI (lint, typecheck, test, build, e2e) and release workflows for GitHub Actions.
- GitHub Pages deployment for Storybook docs.

[Unreleased]: https://github.com/s7upid/solstice-ui/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/s7upid/solstice-ui/releases/tag/v1.0.0
