@echo off
echo ================================================
echo   Horror Video Prompt Generator (Desktop Mode)
echo   Starting Electron app...
echo ================================================
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo [1/2] Installing dependencies...
    echo This may take 2-5 minutes...
    call npm install
    echo.
)

echo [2/2] Starting desktop app...
echo.
echo Vui long doi 5-10 giay de Electron mo...
echo.
call npm run dev:desktop

pause
