#!/usr/bin/env bash
# ============================================
# 2. E2E tests (Playwright)
# ============================================
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$ROOT_DIR"

echo
echo "=========================================="
echo "Solstice UI E2E Tests (Playwright)"
echo "=========================================="
echo

npm run test:e2e
