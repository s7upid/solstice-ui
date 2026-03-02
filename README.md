# Solstice UI

[![Docs](https://img.shields.io/badge/docs-Storybook-ff4785?style=flat-square&logo=storybook)](https://s7upid.github.io/solstice-ui/) [![CI](https://github.com/s7upid/solstice-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/s7upid/solstice-ui/actions/workflows/ci.yml) [![Unit tests](https://img.shields.io/badge/unit%20tests-98%25-brightgreen?style=flat-square&logo=vitest)](https://github.com/s7upid/solstice-ui/actions) [![E2E](https://img.shields.io/badge/e2e-100%25-brightgreen?style=flat-square&logo=playwright)](https://github.com/s7upid/solstice-ui/actions) [![npm](https://img.shields.io/badge/npm-unpublished-lightgrey?style=flat-square)](https://www.npmjs.com/package/solstice-ui) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Solstice UI** — React component library for **dark and light mode**, built with TypeScript, Tailwind CSS, and CSS Modules. Accessible, themable, and ready for any app or design system.

**📖 [Live documentation (Storybook)](https://s7upid.github.io/solstice-ui/)** — browse components and examples online.

---

## Install

```bash
npm install solstice-ui
# or
yarn add solstice-ui
pnpm add solstice-ui
```

**Peer dependencies:** React 18+, React DOM, and **lucide-react** (for icons). Install with:

```bash
npm install solstice-ui react react-dom lucide-react
```

Tailwind CSS v4 (or v3 with `darkMode: 'class'`) is required for dark mode styling. The library is built as ESM-first with tree-shakeable exports and externalized React and lucide-react for a minimal bundle.

---

## Quick start

1. **Import styles** in your app entry (e.g. `main.tsx`):

   ```ts
   import "solstice-ui/styles";
   ```

2. **Theme** (optional). Wrap your app with `ThemeProvider`:

   ```tsx
   import { ThemeProvider } from "solstice-ui";

   <ThemeProvider defaultTheme="light" storageKey="my-app-theme">
     <App />
   </ThemeProvider>
   ```

   Or control theme yourself:

   ```tsx
   import { ThemeToggle } from "solstice-ui";

   <ThemeToggle theme={theme} onToggle={toggleTheme} />
   ```

   Ensure the `dark` class is toggled on `document.documentElement` when using dark mode (e.g. Tailwind `darkMode: 'class'`).

3. **Use components:**

   ```tsx
   import { Button, Input, Card, PageHeader } from "solstice-ui";

   <Button variant="primary">Save</Button>
   <Input label="Email" placeholder="you@example.com" />
   ```

---

## Components

| Category     | Components                                                                 |
|-------------|-----------------------------------------------------------------------------|
| **Core**    | Button, Input, Card, Badge, Dropdown, Form, Alert, Progress, Checkbox     |
| **Layout**  | PageHeader, Grid, GridPage, ListPage, List, TabNavigation, StackedCardsDeck |
| **Feedback**| LoadingSpinner, EmptyState, Toast, ErrorBoundary                           |
| **Overlays**| ModalPortal, Dialog                                                        |
| **Actions** | DangerZone, Pagination, SearchInput, Toggle                               |
| **Forms**   | Input, Checkbox, DateTimePicker, Form                                      |
| **Theme**   | ThemeToggle, ThemeProvider, useThemeContext                                |

All components support dark mode when the root element has the `.dark` class. Browse **[Storybook](https://s7upid.github.io/solstice-ui/)** for live examples and props.

---

## Documentation

- **Live Storybook:** [https://s7upid.github.io/solstice-ui/](https://s7upid.github.io/solstice-ui/) — component docs and examples (published via GitHub Pages).
- **Local Storybook:** Run `npm run storybook` (or `scripts/start-storybook.bat` on Windows, `scripts/start-storybook.command` on macOS). Open http://localhost:6006 — edits to components or `.stories` files hot-reload. Storybook is also built and deployed to **GitHub Pages** on pushes to `main` (see `.github/workflows/docs.yml`). You can run `npm run build-storybook` locally to output a static build to `storybook-static/` if you want to host it elsewhere. See [Contributing](#contributing).

  **GitHub Pages setup:** To publish Storybook to GitHub Pages, configure the repo to use GitHub Actions as the source:

  1. Open the repo on GitHub → **Settings** → **Pages**.
  2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
  3. Click **Save**.

  The workflow in `.github/workflows/docs.yml` will build and deploy Storybook on pushes to `main`. The **Deploy Docs (Storybook)** workflow runs when you use this source.

---

## Scripts (developers)

| Command                 | Description                    |
|-------------------------|--------------------------------|
| `npm run build`         | Build library to `dist/`       |
| `npm run dev`           | Build in watch mode            |
| `npm run test`          | Unit tests (Vitest)            |
| `npm run test:watch`    | Unit tests in watch mode      |
| `npm run test:coverage` | Unit tests with coverage      |
| `npm run test:ci`       | Unit tests + coverage (CI)    |
| `npm run test:e2e`             | E2E tests (Chromium only, fast) |
| `npm run test:e2e:sequential` | E2E tests one-by-one (clearer list output) |
| `npm run test:e2e:all`        | E2E tests (all browsers)       |
| `npm run lint`          | ESLint                         |
| `npm run typecheck`     | TypeScript check               |
| `npm run storybook`     | Start Storybook                |
| `npm run build-storybook` | Build static Storybook       |
| `npm run coverage:report` | Extract coverage to report   |
| `npm run coverage:badges` | Update README badges         |
| `npm run clean`         | Remove coverage, dist, etc.    |

**Convenience scripts:** `scripts/start-storybook.bat` (Windows) / `scripts/start-storybook.command` (macOS) start Storybook. `scripts/generate-tests-report.bat` (Windows) and `scripts/generate-tests-report.command` (macOS) run test coverage and update README badges. See [scripts/README.md](scripts/README.md).

---

## Test coverage & badges

Standard flow:

1. **Unit coverage:** `npm run test:coverage`
2. **Extract results:** `node test-coverage/extract-results.js`
3. **Update badges:** `node test-coverage/update-readme-badges.js`

See [test-coverage/README.md](test-coverage/README.md) for batch/shell scripts and details.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

---

## License

[MIT](LICENSE)
