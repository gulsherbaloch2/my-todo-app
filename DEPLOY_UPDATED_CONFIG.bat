@echo off
echo Updating your deployment with the new database configuration...

echo Please make sure to replace [YOUR-PASSWORD] in your .env.local file 
echo with your actual Supabase database password before continuing.
echo.

echo Press any key to proceed with the deployment...
pause > nul

echo Deploying updated configuration to Vercel...
vercel --prod --force

echo.
echo Your project has been redeployed with the new database configuration.
echo Signup functionality should now work on the live site.
pause