@echo off
REM ============================================
REM Create package — clean, build, then create tgz
REM Double-click to run (or run from scripts folder).
REM Output: solstice-ui-<version>.tgz in project root
REM ============================================
set SCRIPT_DIR=%~dp0
set ROOT_DIR=%SCRIPT_DIR%..
cd /d "%ROOT_DIR%"

echo.
echo ==========================================
echo Solstice UI - Create Package
echo ==========================================
echo Clean, build, then pack. Package tgz in project root.
echo ==========================================
echo.

if not exist "node_modules" (
    echo node_modules not found, running npm install...
    call npm install
    if errorlevel 1 (
        echo [ERROR] npm install failed.
        pause
        exit /b 1
    )
    echo.
)

echo Running: npm run createPackage
echo.
call npm run createPackage
if errorlevel 1 (
    echo [ERROR] createPackage failed.
    pause
    exit /b 1
)

echo.
echo ==========================================
echo Done. Package tgz is in the project root.
echo ==========================================
echo.
pause
exit /b 0
