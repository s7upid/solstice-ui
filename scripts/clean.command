#!/usr/bin/env bash
# ============================================
# Clean build artifacts and node_modules
# Run from repo root or: ./scripts/clean.command
# (chmod +x scripts/clean.command if needed)
# ============================================
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$ROOT_DIR"

echo
echo "=========================================="
echo "Solstice UI - Clean"
echo "=========================================="
echo "Removing coverage, dist, storybook-static,"
echo "playwright-report, test-results, node_modules..."
echo "=========================================="
echo

npm run clean 2>/dev/null || {
  echo "[WARN] npm run clean had issues. Removing known folders manually..."
  rm -rf coverage dist storybook-static playwright-report test-results
  rm -f coverage-report.json
}

if [ -d node_modules ]; then
  echo "Removing node_modules..."
  rm -rf node_modules
  echo "node_modules removed."
else
  echo "node_modules not present, skipping."
fi

echo
echo "Clean finished."
echo
read -p "Press Enter to close..."
