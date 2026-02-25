# Moving Solstice UI to its own repository

Use this guide when you copy this package into a **new, standalone Git repository** so it can be developed and published independently (e.g. as an open-source library).

## 1. Create the new repo

- Create a new empty repository (e.g. on GitHub): `your-org/solstice-ui`.
- Do **not** initialize with a README (so you can push the existing content).

## 2. Copy package contents to repo root

Copy **everything** from this folder (e.g. `solstice-ui/` or the original `packages/shared-ui/`) into the **root** of the new repository:

- `package.json`, `tsconfig.json`, `vitest.config.ts`, `playwright.config.ts`, `vite.config.ts`
- `postcss.config.cjs`, `tailwind.config.ts`, `eslint.config.js`
- `src/`, `test/`, `e2e/`, `.storybook/`
- `.github/`, `.nvmrc`, `.gitignore`
- `README.md`, `LICENSE`, `CONTRIBUTING.md`, `CHANGELOG.md`, `SECURITY.md`
- This file (`MIGRATION-STANDALONE-REPO.md`) — optional to keep

So the new repo root should look like:

```
solstice-ui/
├── .github/
├── .storybook/
├── e2e/
├── src/
├── test/
├── package.json
├── README.md
├── ...
```

## 3. Update repository URLs

In **package.json** set:

```json
"repository": {
  "type": "git",
  "url": "https://github.com/your-org/solstice-ui.git"
},
"homepage": "https://github.com/your-org/solstice-ui#readme",
"bugs": {
  "url": "https://github.com/your-org/solstice-ui/issues"
}
```

In **README.md** replace every `your-username` with your GitHub org or username (badges and links).

In **CHANGELOG.md** replace `your-username` in the compare and release links.

## 4. Optional: Rename the npm package

If you publish to npm under a different name or scope:

- In **package.json** set `"name": "@your-org/solstice-ui"` (or any valid name).
- In **README.md** update the install command and any “solstice-ui” references to match.
- In **.github/workflows/release.yml** the `npm publish` step will use this name; for scoped packages you may need `--access public` (already present).

## 5. First-time setup in the new repo

```bash
cd /path/to/new-repo
npm install
npm run build
npm run test
npm run storybook   # open http://localhost:6006
```

Fix any path or config issues (e.g. `src/index.css` or Storybook preview paths) so build, test, and Storybook all work from the repo root.

## 6. GitHub settings (for GitHub-hosted repo)

- **GitHub Pages:** Settings → Pages → Source: **GitHub Actions**. This allows the “Deploy Docs (Storybook)” workflow to publish the built Storybook.
- **Secrets (for npm publish):** Settings → Secrets and variables → Actions → New repository secret: `NPM_TOKEN` with an npm automation token (from npmjs.com → Access Tokens).

## 7. Publishing a release

1. Bump version in `package.json` and add an entry in `CHANGELOG.md`.
2. Commit, push, then create a **Release** on GitHub (e.g. tag `v1.0.0`, “Publish to npm”).
3. The **Release** workflow will run and publish the package to npm (using `NPM_TOKEN`).

After this, the package is a standalone, open-source library that others can install with `npm install solstice-ui` (or your scoped name) and use in their projects.
