@echo off
REM ============================================
REM Clean build artifacts and node_modules
REM Run from repo root or double-click this script
REM ============================================
set SCRIPT_DIR=%~dp0
set ROOT_DIR=%SCRIPT_DIR%..
cd /d "%ROOT_DIR%"

echo.
echo ==========================================
echo Solstice UI - Clean
echo ==========================================
echo Removing coverage, dist, storybook-static,
echo playwright-report, test-results, node_modules...
echo ==========================================
echo.

call npm run clean
if errorlevel 1 (
    echo [WARN] npm run clean had issues. Removing known folders manually...
    if exist coverage rmdir /s /q coverage
    if exist dist rmdir /s /q dist
    if exist storybook-static rmdir /s /q storybook-static
    if exist playwright-report rmdir /s /q playwright-report
    if exist test-results rmdir /s /q test-results
    if exist coverage-report.json del /q coverage-report.json
)

if exist node_modules (
    echo Removing node_modules...
    rmdir /s /q node_modules
    echo node_modules removed.
) else (
    echo node_modules not present, skipping.
)

echo.
echo Clean finished.
pause
