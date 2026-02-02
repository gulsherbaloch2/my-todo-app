@echo off
echo Setting environment variables in Vercel...

echo First, you need to manually add the environment variables to your Vercel project:
echo 1. Go to your Vercel dashboard: https://vercel.com/dashboard
echo 2. Select your project "p2"
echo 3. Go to Settings -> Environment Variables
echo 4. Add the following variables with their values from your .env.local file:
echo    - DATABASE_URL
echo    - BETTER_AUTH_SECRET
echo    - AUTH_SECRET
echo    - NEXT_PUBLIC_BASE_URL (set to your Vercel deployment URL)
echo    - NEXT_PUBLIC_API_BASE_URL (set to your deployed backend API URL)
echo    - KRO_API_KEY (if you're using the KRO API)
echo.
echo After adding these variables, press any key to redeploy your project...
pause > nul

echo Redeploying your project with the new environment variables...
vercel --prod --force

echo.
echo Your project has been redeployed with the required environment variables.
echo Signup functionality should now work on the live site.
pause