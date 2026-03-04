#!/usr/bin/env bash
# ============================================
# 1. Unit test coverage (Vitest)
# ============================================
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$ROOT_DIR"

echo
echo "=========================================="
echo "Solstice UI Unit Test Coverage (Vitest)"
echo "=========================================="
echo

[ ! -d "node_modules" ] && npm install

echo "Running Vitest with coverage..."
npm run test:coverage || true

echo
echo "=========================================="
echo "Next: node test-coverage/extract-results.js"
echo "      node test-coverage/update-readme-badges.js"
echo "=========================================="
echo
read -p "Press Enter to close..."
