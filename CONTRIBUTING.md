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

| Script                 | Description                              |
|------------------------|------------------------------------------|
| `npm run build`        | Build library (dist/)                    |
| `npm run dev`          | Build in watch mode                      |
| `npm run test`         | Run unit tests (Vitest)                  |
| `npm run test:e2e`     | Run E2E tests (Playwright)               |
| `npm run lint`         | Lint with ESLint                         |
| `npm run typecheck`    | TypeScript check                         |
| `npm run storybook`    | Start Storybook dev server               |
| `npm run build-storybook` | Build static Storybook                |
| `npm run clean`        | Remove coverage, dist, storybook-static, etc. |
| `npm run createPackage`| Clean, build, then create package tgz (solstice-ui-&lt;version&gt;.tgz) |

## Adding a new component

1. Add the component under `src/components/ComponentName/`.
2. Add a `ComponentName.stories.tsx` for Storybook.
3. Export the component from `src/index.ts`.
4. Add unit tests in `ComponentName.test.tsx`.
5. Add e2e tests in `e2e/component-name.spec.ts` (use `gotoStory(page, "components-componentname--story-name")`). See existing specs (e.g. `e2e/button.spec.ts`, `e2e/grid-page.spec.ts`) for the pattern.
6. Update **README.md** (Components table) and **Documentation/Introduction** in Storybook (`src/docs/Introduction.stories.tsx`) so the new component is listed.
7. Ensure styles support dark mode via `:global(.dark)` where needed.
8. Add an entry to **CHANGELOG.md** under [Unreleased] when the change is notable.

## Code style

- TypeScript strict mode.
- Use existing patterns (e.g. `cn()` for class names, CSS modules).
- Use plain function components with typed props (no `React.FC`).

## Pull requests

1. Create a branch from `main`: `git checkout -b feature/your-feature`.
2. Make your changes and add/update tests.
3. Run `npm run lint`, `npm run typecheck`, `npm run test`, and optionally `npm run test:e2e`.
4. Push and open a PR. Fill in the PR template and link any related issues.

## Releasing (maintainers)

Releases are fully automated via CI. When a version tag is pushed, CI runs all checks (lint, typecheck, tests, build, e2e) and — only if everything passes — creates a GitHub Release with the `.tgz` package and an auto-generated changelog. The release then triggers npm publish.

1. Add an entry to `CHANGELOG.md` under `[Unreleased]` (optional but recommended).
2. Commit and push your changes to `main`.
3. Create and push a version tag:

   ```bash
   git tag v1.2.0
   git push origin v1.2.0
   ```

4. CI runs the full pipeline. If all checks pass, a GitHub Release is created automatically with the changelog and `.tgz` attached.
5. The GitHub Release triggers the **Release** workflow, which publishes to npm.

The version in the release package is derived from the tag — no need to manually update `package.json`.

Storybook is deployed to GitHub Pages on push to `main` via `.github/workflows/docs.yml`.
