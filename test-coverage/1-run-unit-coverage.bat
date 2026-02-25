@echo off
REM ============================================
REM 1. Unit test coverage (Vitest)
REM ============================================
set SCRIPT_DIR=%~dp0
set ROOT_DIR=%SCRIPT_DIR%..
cd /d "%ROOT_DIR%"

echo.
echo ==========================================
echo Solstice UI Unit Test Coverage (Vitest)
echo ==========================================
echo.

if not exist "node_modules" (
    echo node_modules not found, running npm install...
    call npm install
)

echo Running Vitest with coverage...
call npm run test:coverage
if errorlevel 1 (
    echo [WARNING] Some tests failed or coverage failed
)

echo.
echo ==========================================
echo Run: node test-coverage\extract-results.js
echo Then: node test-coverage\update-readme-badges.js
echo ==========================================
exit /b 0
