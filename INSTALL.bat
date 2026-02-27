@echo off
echo ================================================
echo   Horror Video Prompt Generator
echo   Installation Script
echo ================================================
echo.

echo Checking Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo Then run this script again.
    pause
    exit /b 1
)

echo Node.js found!
node --version
echo.

echo Installing dependencies...
echo This may take 2-5 minutes depending on your internet speed.
echo.

call npm install

if %errorlevel% equ 0 (
    echo.
    echo ================================================
    echo   Installation Complete!
    echo ================================================
    echo.
    echo Next steps:
    echo   1. Get your Gemini API key from:
    echo      https://aistudio.google.com/app/apikey
    echo.
    echo   2. Run START.bat to launch the app
    echo.
    echo ================================================
) else (
    echo.
    echo ERROR: Installation failed!
    echo Please check your internet connection and try again.
)

pause
