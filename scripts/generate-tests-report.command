#!/usr/bin/env bash
# ============================================
# Generate test coverage and update README badges
# Runs: lint -> test:coverage -> test:e2e -> extract-results -> update-readme-badges -> build+pack
# Double-click on macOS or run: ./scripts/generate-tests-report.command
# ============================================
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$ROOT_DIR"

# Keep window open on exit when run by double-click (e.g. from Finder)
finish() { read -p "Press Enter to close..."; }
trap finish EXIT

echo
echo "=========================================="
echo "Solstice UI - Test coverage and badges"
echo "=========================================="
echo

[ ! -d "node_modules" ] && npm install

echo "[1/6] Running lint..."
npm run lint || { echo "[ERROR] Lint failed. Fix lint errors and run again."; exit 1; }
echo

echo "[2/6] Running unit tests with coverage..."
npm run test:coverage || true
echo

echo "[3/6] Ensuring Playwright browsers are installed..."
npx playwright install
echo

echo "[4/6] Running e2e tests (Playwright)..."
E2E_JSON_REPORT=1 E2E_USE_MAX_WORKERS=1 npm run test:e2e || { echo "[ERROR] E2E tests failed."; exit 1; }
echo

echo "[5/6] Extracting coverage results..."
node test-coverage/extract-results.js || { echo "[ERROR] extract-results.js failed. Ensure coverage/ exists from test:coverage."; exit 1; }
echo

echo "[6/6] Updating README badges..."
node test-coverage/update-readme-badges.js || { echo "[ERROR] update-readme-badges.js failed."; exit 1; }

echo

echo "[7/7] Building and packing distributable..."
npm run build || { echo "[ERROR] Build failed."; exit 1; }
rm -f solstice-ui-1.0.0.tgz
npm pack || { echo "[ERROR] npm pack failed."; exit 1; }
echo "[SUCCESS] solstice-ui-1.0.0.tgz created."
echo

echo "=========================================="
echo "Done. README.md badges updated."
echo "Package: solstice-ui-1.0.0.tgz ready."
echo "Commit README.md, coverage-report.json, and solstice-ui-1.0.0.tgz."
echo "=========================================="
echo
