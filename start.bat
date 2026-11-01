@echo off
title Pooja portfolio
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed. Download the LTS version from https://nodejs.org and try again.
  pause
  exit /b 1
)

echo Checking packages. The first run takes a minute or two...
call npm install --no-audit --no-fund
if errorlevel 1 (
  echo.
  echo Installing failed. If the message mentions your Node.js version, install the latest LTS from https://nodejs.org
  pause
  exit /b 1
)

echo Starting your portfolio. It will open in your browser. Close this window to stop it.
call npm run dev -- --open
pause
