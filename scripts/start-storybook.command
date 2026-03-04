#!/usr/bin/env bash
# ============================================
# Start Storybook — live component docs
# Edit components or .stories files to see changes at http://localhost:6006
# ============================================
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$ROOT_DIR"

echo
echo "=========================================="
echo "Solstice UI - Storybook"
echo "=========================================="
echo "Open http://localhost:6006 after it starts."
echo "Changes to components or stories hot-reload."
echo "=========================================="
echo

echo "Ensuring dependencies..."
npm install || { echo "[ERROR] npm install failed."; exit 1; }

echo
echo "Starting Storybook..."
npm run storybook
echo
read -p "Press Enter to close..."
