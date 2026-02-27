@echo off
echo ================================================
echo   Horror Video Prompt Generator
echo   Starting app...
echo ================================================
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo [1/2] Installing dependencies...
    echo This may take 2-5 minutes...
    call npm install
    echo.
)

echo [2/2] Starting app...
echo.
echo App se mo tu dong trong trinh duyet!
echo.
call npm run dev

pause
