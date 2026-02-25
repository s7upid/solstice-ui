# Scripts

Convenience scripts to run common tasks from the repo root (e.g. when double-clicking or from any working directory).

| Script | Platform | Description |
|--------|-----------|-------------|
| `start-storybook.bat` | Windows | Starts Storybook at http://localhost:6006. Run from repo root or double-click; edits to components or `.stories` files hot-reload. |
| `start-storybook.command` | macOS | Same as above. Double-click in Finder or run `./scripts/start-storybook.command` (make executable with `chmod +x scripts/start-storybook.command` if needed). |
| `clean.bat` | Windows | Removes build artifacts (coverage, dist, storybook-static, playwright-report, test-results, coverage-report.json) and **node_modules**. Run from repo root or double-click. |
| `clean.command` | macOS | Same as above. Run `./scripts/clean.command` (make executable with `chmod +x scripts/clean.command` if needed). |
| `generate-tests-report.bat` | Windows | Runs **all tests** (unit with coverage + e2e), extracts results, and updates README badges for **unit test %** and **e2e test %**. Same as: `npm run test:coverage` then `E2E_JSON_REPORT=1 npm run test:e2e` then `node test-coverage/extract-results.js` then `node test-coverage/update-readme-badges.js`. |
| `generate-tests-report.command` | macOS | Same as above. Double-click in Finder or run `./scripts/generate-tests-report.command` (make executable with `chmod +x scripts/generate-tests-report.command` if needed). |

For full npm scripts (build, test, lint, etc.), see the main [README](../README.md). Details on coverage and badges: [test-coverage/README.md](../test-coverage/README.md).
