@echo off
REM ============================================
REM Start Storybook — live component docs
REM Edit components or .stories files to see changes at http://localhost:6006
REM ============================================
set SCRIPT_DIR=%~dp0
set ROOT_DIR=%SCRIPT_DIR%..
cd /d "%ROOT_DIR%"

echo.
echo ==========================================
echo Solstice UI - Storybook
echo ==========================================
echo Open http://localhost:6006 after it starts.
echo Changes to components or stories hot-reload.
echo ==========================================
echo.

echo Ensuring dependencies...
call npm install
if errorlevel 1 (
    echo [ERROR] npm install failed.
    pause
    exit /b 1
)

echo.
echo Starting Storybook...
call npx storybook dev -p 6006
echo.
pause
