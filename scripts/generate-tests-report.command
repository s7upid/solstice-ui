#!/usr/bin/env bash
# ============================================
# Generate test coverage and update README badges
# Runs: test:coverage -> extract-results -> update-readme-badges
# Double-click on macOS or run: ./scripts/generate-tests-report.command
# ============================================
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$ROOT_DIR"

echo
echo "=========================================="
echo "Solstice UI — Test coverage and badges"
echo "=========================================="
echo

[ ! -d "node_modules" ] && npm install

echo "[1/3] Running unit tests with coverage..."
npm run test:coverage || true
echo

echo "[2/3] Extracting coverage results..."
node test-coverage/extract-results.js || { echo "[ERROR] extract-results.js failed. Ensure coverage/ exists from test:coverage."; exit 1; }
echo

echo "[3/3] Updating README badges..."
node test-coverage/update-readme-badges.js || { echo "[ERROR] update-readme-badges.js failed."; exit 1; }

echo
echo "=========================================="
echo "Done. README.md badges updated."
echo "Commit README.md and optionally coverage-report.json."
echo "=========================================="
