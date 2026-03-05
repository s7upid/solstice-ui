# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

_No changes yet._

## [1.0.0] - 2026-03-05

### Added

- **Initial release** — Standalone React UI component library with dark/light mode, accessible and themable.
- **Requirements:** React 19+ (peer), Node >= 20. Components use direct `ref` prop and plain function components (no `React.FC`).
- **Components:** Accordion, Alert, Badge, Button, Card, Carousel, DangerZone, DataPage, DateTimePicker, Dialog, Dropdown, EmptyState, ErrorBoundary, Form, Grid, Input, List, LoadingSpinner, PageHeader, Pagination, Progress, SearchInput, StackedCardsDeck, TabNavigation, Toast, Toggle.
- **Card** — Title, description, icon/avatar, status badge, details, stats, actions. Optional `onClick` to make the whole card clickable (e.g. open details); keyboard focusable (Enter/Space); action buttons do not trigger the card click. Layouts: default, vertical, horizontal. Set `imageSrc` for image layout with optional action button.
- **DataPage** — Unified layout with `layout="grid"` or `layout="list"`: optional PageHeader, loading, empty state, pagination.
- **Toggle** — Variants: `button`, `switch`, `checkbox` (styled checkbox with label, error, description, tri-state).
- **Grid** — Standalone grid: items, renderCard, columns (1–4), keyExtractor, gridClassName, threeD.
- **Dialog** — Optional `footerActions` (array of `{ label, onClick, icon?, variant?, loading? }`) for buttons with icons.
- **Input** — Optional `endAdornment` slot (e.g. button at the end); icon left/right support.
- **Theme:** ThemeProvider, useThemeContext, useThemeContextOptional, ThemeToggle. Dark mode via `.dark` class on document root. Glassmorphism-style surfaces, shared CSS variables, WCAG-friendly contrast in light and dark.
- **Scripts:** `npm run createPackage` (clean, build, pack), `npm run pack`. Double-click scripts `scripts/create-package.bat` (Windows) and `scripts/create-package.command` (macOS). `generate-tests-report` scripts run lint, unit + e2e tests, extract results, update README badges (no package build).
- **Docs:** README (components table, theming), Storybook Introduction, CONTRIBUTING.
- **Testing:** Unit tests (Vitest), E2E tests (Playwright). CI: lint, typecheck, test, build, e2e; release workflow with GitHub Release and `--allow-same-version` for the version step.
- **Storybook:** Component docs and examples, GitHub Pages deployment.

[Unreleased]: https://github.com/s7upid/solstice-ui/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/s7upid/solstice-ui/releases/tag/v1.0.0
