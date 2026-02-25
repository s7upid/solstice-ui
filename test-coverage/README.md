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

2. **E2E tests (optional for badges):**  
   `npm run test:e2e`  
   (Playwright runs against Storybook; the **generate-tests-report** scripts run this before extracting coverage. The README badge percentage is from **unit** coverage only.)

3. **Extract:**  
   `node test-coverage/extract-results.js`

4. **Update README:**  
   `node test-coverage/update-readme-badges.js`

5. Commit the updated `README.md` and optionally `coverage-report.json`.

## Badges (unit % and e2e %)

The **generate-tests-report** scripts run unit tests with coverage and e2e tests (Playwright), then write `coverage-report.json` with:

- **unit**: Vitest line coverage percentage (from `coverage/coverage-summary.json`).
- **e2e**: Playwright test pass percentage (from `test-coverage/e2e-results.json`, written when `E2E_JSON_REPORT=1`).

README badges are updated to show **Unit tests: X%** and **E2E: X%** (pass rate). The scripts set `E2E_JSON_REPORT=1` when running e2e so the JSON results file is produced.

## Badge placeholders

README should contain one badge line (e.g. the standard CI, Unit tests, E2E, npm, License badges). The script **removes any existing badge lines** and writes a single updated line, so running it multiple times will not create duplicates. The repo slug is set in `update-readme-badges.js` as `REPO_SLUG` (default: `s7upid/solstice-ui`); change it if you use a fork so badge links point to your repo.
