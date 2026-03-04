@echo off
REM ============================================
REM 2. E2E tests (Playwright) — requires Storybook
REM ============================================
set SCRIPT_DIR=%~dp0
set ROOT_DIR=%SCRIPT_DIR%..
cd /d "%ROOT_DIR%"

echo.
echo ==========================================
echo Solstice UI E2E Tests (Playwright)
echo ==========================================
echo.

call npm run test:e2e
echo.
pause
exit /b %errorlevel%
