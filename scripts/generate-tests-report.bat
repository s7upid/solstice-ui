@echo off
REM ============================================
REM Generate test coverage and update README badges
REM Runs: test:coverage -> test:e2e -> extract-results -> update-readme-badges
REM ============================================
set SCRIPT_DIR=%~dp0
set ROOT_DIR=%SCRIPT_DIR%..
cd /d "%ROOT_DIR%"

echo.
echo ==========================================
echo Solstice UI - Test coverage and badges
echo ==========================================
echo.

if not exist "node_modules" (
    echo node_modules not found, running npm install...
    call npm install
)

echo [1/5] Running unit tests with coverage...
call npm run test:coverage
if errorlevel 1 (
    echo [WARNING] Some tests failed or coverage failed.
    echo Continuing to extract and update badges from existing coverage...
)
echo.

echo [2/5] Ensuring Playwright browsers are installed...
call npx playwright install
echo.
echo [3/5] Running e2e tests (Playwright)...
set E2E_JSON_REPORT=1
call npm run test:e2e
set E2E_JSON_REPORT=
if errorlevel 1 (
    echo [ERROR] E2E tests failed.
    exit /b 1
)
echo.

echo [4/5] Extracting coverage results...
call node test-coverage\extract-results.js
if errorlevel 1 (
    echo [ERROR] extract-results.js failed. Ensure coverage/ exists from test:coverage.
    exit /b 1
)
echo.

echo [5/5] Updating README badges...
call node test-coverage\update-readme-badges.js
if errorlevel 1 (
    echo [ERROR] update-readme-badges.js failed.
    exit /b 1
)

echo.
echo ==========================================
echo Done. README.md badges updated.
echo Commit README.md and optionally coverage-report.json.
echo ==========================================
exit /b 0
