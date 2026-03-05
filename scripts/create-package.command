#!/usr/bin/env bash
# ============================================
# Create package — clean, build, then create tgz
# Double-click on macOS or run: ./scripts/create-package.command
# Output: solstice-ui-<version>.tgz in project root
# ============================================
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$ROOT_DIR"

# Keep window open on exit when run by double-click
finish() { read -p "Press Enter to close..."; }
trap finish EXIT

echo
echo "=========================================="
echo "Solstice UI - Create Package"
echo "=========================================="
echo "Clean, build, then pack. Output: solstice-ui-<version>.tgz"
echo "=========================================="
echo

[ ! -d "node_modules" ] && echo "Installing dependencies..." && npm install && echo

echo "Running: npm run createPackage"
echo
npm run createPackage || { echo "[ERROR] createPackage failed."; exit 1; }

echo
echo "=========================================="
echo "Done. Package tgz is in the project root."
echo "=========================================="
echo
