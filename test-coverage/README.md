# Test coverage & badges

Scripts to run unit coverage, E2E tests, and update README badges.

## Quick run

```bash
# Unit tests with coverage
npm run test:coverage

# Extract coverage and update README badges
node test-coverage/extract-results.js
node test-coverage/update-readme-badges.js
```

## Scripts

| Script | Description |
|--------|-------------|
| `1-run-unit-coverage.bat` / `.sh` | Run Vitest with coverage (output: `coverage/`) |
| `2-run-e2e.bat` / `.sh` | Run Playwright E2E tests (starts Storybook automatically) |
| `extract-results.js` | Read `coverage/coverage-summary.json` → write `coverage-report.json` |
| `update-readme-badges.js` | Read `coverage-report.json` → **replace** existing badge line(s) in README.md with a single updated line (removes duplicates). |

## Full flow (update badges)

1. **Unit coverage:**  
   `npm run test:coverage`  
   (or from repo root: `test-coverage/1-run-unit-coverage.bat` on Windows, `./test-coverage/1-run-unit-coverage.sh` on macOS/Linux)

2. **Extract:**  
   `node test-coverage/extract-results.js`

3. **Update README:**  
   `node test-coverage/update-readme-badges.js`

4. Commit the updated `README.md` and optionally `coverage-report.json`.

## Badge placeholders

README should contain one badge line (e.g. the standard CI, Unit tests, E2E, npm, License badges). The script **removes any existing badge lines** and writes a single updated line, so running it multiple times will not create duplicates. Replace `your-username` in `update-readme-badges.js` (constant `REPO_SLUG`) with your GitHub org/repo so links point to your repo.
