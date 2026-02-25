#!/usr/bin/env bash
# ============================================
# Generate test coverage and update README badges
# Runs: test:coverage -> test:e2e -> extract-results -> update-readme-badges
# Double-click on macOS or run: ./scripts/generate-tests-report.command
# ============================================
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$ROOT_DIR"

echo
echo "=========================================="
echo "Solstice UI - Test coverage and badges"
echo "=========================================="
echo

[ ! -d "node_modules" ] && npm install

echo "[1/5] Running unit tests with coverage..."
npm run test:coverage || true
echo

echo "[2/5] Ensuring Playwright browsers are installed..."
npx playwright install
echo

echo "[3/5] Running e2e tests (Playwright)..."
E2E_JSON_REPORT=1 npm run test:e2e || { echo "[ERROR] E2E tests failed."; exit 1; }
echo

echo "[4/5] Extracting coverage results..."
node test-coverage/extract-results.js || { echo "[ERROR] extract-results.js failed. Ensure coverage/ exists from test:coverage."; exit 1; }
echo

echo "[5/5] Updating README badges..."
node test-coverage/update-readme-badges.js || { echo "[ERROR] update-readme-badges.js failed."; exit 1; }

echo
echo "=========================================="
echo "Done. README.md badges updated."
echo "Commit README.md and optionally coverage-report.json."
echo "=========================================="
