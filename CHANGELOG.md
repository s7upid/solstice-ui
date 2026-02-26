# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **GridPage** — Layout component: optional PageHeader plus responsive card grid. Props: title, description, icon, actions, items, renderCard, columns (1–4), loading, empty state (emptyTitle, emptyDescription), keyExtractor, threeD, className, gridClassName. Stories: WithCards, TwoColumns, Empty, Loading. Unit and e2e tests added.
- **ListPage** — Layout component: optional PageHeader plus list. Props: title, description, icon, actions, items, renderItem, loading, empty state, keyExtractor, listClassName, threeD, className. Stories: WithSimpleList, WithCardsInList, Empty, Loading. Unit and e2e tests added.
- **Docs:** GridPage and ListPage added to README Components table (Layout) and to Storybook Documentation/Introduction.

### Changed

- **Test report scripts:** `generate-tests-report.bat` and `generate-tests-report.command` now run Playwright e2e with **max workers** (`E2E_USE_MAX_WORKERS=1`) for faster report generation.
- **Playwright config:** Worker count: when `E2E_USE_MAX_WORKERS=1` use all CPUs; when using static Storybook (`E2E_USE_STATIC=1`) use 1 worker to avoid timeouts; otherwise CI uses all CPUs, local uses 2. Static Storybook e2e uses `waitUntil: "networkidle"` for story load.

### Fixed

- **StackedCardsDeck:** Scroll-end padding capped to avoid excess empty space on large viewports; single-card case uses zero bottom padding; padding calculation uses container computed padding (no hardcoded values); guards for non-finite padding in tests.
- **Exports:** Public API now exports `QueueCardItem` (matches component; previously documented as `StackedCardItem`).
- **Docs:** README and Storybook Introduction component lists aligned (Layout: PageHeader, GridPage, ListPage, List, TabNavigation, StackedCardsDeck; Actions: Toggle not ToggleButton).
- **Storybook:** StackedCardsDeck stories use only real props (items, containerHeight, cardHeight, spacing, className); removed invalid SubtleMotion story and non-existent args (scaleStep, fadeStep, rotateStep, gap).
- **Tests:** Removed unused imports in DateTimePicker and Form tests; fixed List test type for `BaseListItem`; StackedCardsDeck tests consolidated and coverage improved.

## [1.0.0] - 2025-02-24

### Added

- Initial release as standalone open-source library.
- Components: Accordion, Alert, Badge, Button, Card, Carousel, Checkbox, ConfirmationDialog, DangerZone, DateTimePicker, Dialog, Dropdown, EmptyState, ErrorBoundary, Form, Input, List, LoadingSpinner, ModalPortal, PageHeader, Pagination, Progress, SearchInput, StackedCardsDeck, TabNavigation, Toast, Toggle.
- ThemeProvider, useThemeContext, useThemeContextOptional, and ThemeToggle for dark/light mode.
- Full dark mode support via `.dark` class on document root.
- Storybook documentation.
- Unit tests (Vitest) and E2E tests (Playwright).
- CI (lint, typecheck, test, build, e2e) and release workflows for GitHub Actions.
- GitHub Pages deployment for Storybook docs.

[Unreleased]: https://github.com/s7upid/solstice-ui/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/s7upid/solstice-ui/releases/tag/v1.0.0
