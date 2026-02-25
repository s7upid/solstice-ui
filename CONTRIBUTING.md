# Contributing to Solstice UI

Thank you for considering contributing to Solstice UI.

## Development setup

1. **Fork and clone the repo**

   ```bash
   git clone https://github.com/s7upid/solstice-ui.git
   cd solstice-ui
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Build the library**

   ```bash
   npm run build
   ```

4. **Run tests**

   ```bash
   npm run test          # unit tests
   npm run test:e2e     # Playwright e2e (requires Storybook)
   npm run test:coverage
   ```

5. **Run Storybook (documentation + component development)**

   ```bash
   npm run storybook
   ```

   Or run `scripts/start-storybook.bat` (Windows) / `scripts/start-storybook.command` (macOS). Open http://localhost:6006 to browse components; changes to components or stories hot-reload. Storybook is also deployed to GitHub Pages on pushes to `main` (see `.github/workflows/docs.yml`).

## Scripts

| Script              | Description                    |
|---------------------|--------------------------------|
| `npm run build`     | Build library (dist/)          |
| `npm run dev`      | Build in watch mode            |
| `npm run test`     | Run unit tests (Vitest)        |
| `npm run test:e2e` | Run E2E tests (Playwright)     |
| `npm run lint`     | Lint with ESLint               |
| `npm run typecheck`| TypeScript check               |
| `npm run storybook`| Start Storybook dev server     |
| `npm run build-storybook` | Build static Storybook  |

## Adding a new component

1. Add the component under `src/components/ComponentName/`.
2. Add a `ComponentName.stories.tsx` for Storybook.
3. Export the component from `src/index.ts`.
4. Add unit tests in `ComponentName.test.tsx`.
5. Ensure styles support dark mode via `:global(.dark)` where needed.

## Code style

- TypeScript strict mode.
- Use existing patterns (e.g. `cn()` for class names, CSS modules).
- Prefer `React.FC` or explicit function components with typed props.

## Pull requests

1. Create a branch from `main`: `git checkout -b feature/your-feature`.
2. Make your changes and add/update tests.
3. Run `npm run lint`, `npm run typecheck`, `npm run test`, and optionally `npm run test:e2e`.
4. Push and open a PR. Fill in the PR template and link any related issues.

## Releasing (maintainers)

Releases are published to npm via GitHub Actions when a **GitHub Release** is published.

1. Update version in `package.json` and add an entry to `CHANGELOG.md`.
2. Commit, push, and create a new Release on GitHub (tag e.g. `v1.1.0`).
3. The **Release** workflow will publish the package to npm.

Storybook is deployed to GitHub Pages on push to `main` via `.github/workflows/docs.yml`.
