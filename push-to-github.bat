@echo off
echo.
echo ==========================================
echo   GITHUB REPOSITORY SETUP SCRIPT
echo ==========================================
echo.
echo Instructions:
echo 1. Create a new repository on GitHub named 'order-management-system'
echo 2. Copy the repository URL (it will look like: https://github.com/yourusername/order-management-system.git)
echo 3. Replace GITHUB_URL_HERE in this script with your actual URL
echo 4. Run this script
echo.

REM Replace GITHUB_URL_HERE with your actual GitHub repository URL
set REPO_URL=GITHUB_URL_HERE

echo Adding GitHub remote...
git remote add origin %REPO_URL%

echo Pushing to GitHub...
git push -u origin main

echo.
echo ==========================================
echo   SUCCESS! Your code is now on GitHub!
echo ==========================================
echo.
echo Your repository is available at: %REPO_URL%
echo.
pause
