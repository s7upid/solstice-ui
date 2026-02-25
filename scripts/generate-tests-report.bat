@echo off
REM ============================================
REM Generate test coverage and update README badges
REM Runs: test:coverage -> extract-results -> update-readme-badges
REM ============================================
set SCRIPT_DIR=%~dp0
set ROOT_DIR=%SCRIPT_DIR%..
cd /d "%ROOT_DIR%"

echo.
echo ==========================================
echo Solstice UI — Test coverage and badges
echo ==========================================
echo.

if not exist "node_modules" (
    echo node_modules not found, running npm install...
    call npm install
)

echo [1/3] Running unit tests with coverage...
call npm run test:coverage
if errorlevel 1 (
    echo [WARNING] Some tests failed or coverage failed.
    echo Continuing to extract and update badges from existing coverage...
)
echo.

echo [2/3] Extracting coverage results...
call node test-coverage\extract-results.js
if errorlevel 1 (
    echo [ERROR] extract-results.js failed. Ensure coverage/ exists from test:coverage.
    exit /b 1
)
echo.

echo [3/3] Updating README badges...
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
