@echo off
echo Setting up Supabase database connection for your Vercel deployment...

echo Please note: You need to replace [YOUR-PASSWORD] with your actual Supabase database password
echo.

echo 1. Go to your Vercel dashboard: https://vercel.com/dashboard
echo 2. Select your project "p2"
echo 3. Go to Settings -> Environment Variables
echo 4. Add/update the following variables:
echo    - DATABASE_URL: postgresql://postgres:[YOUR-PASSWORD]@db.zqsgszqclzophlmgxzjh.supabase.co:5432/postgres
echo    - NEXT_PUBLIC_BASE_URL: https://p2-gky1yzkpt-gulsher-s-projects.vercel.app
echo    - BETTER_AUTH_SECRET: (copy from your .env.local file)
echo    - AUTH_SECRET: (copy from your .env.local file)
echo    - KRO_API_KEY: (copy from your .env.local file if you're using it)
echo.
echo After adding these variables, press any key to redeploy your project...
pause > nul

echo Redeploying your project with the new environment variables...
vercel --prod --force

echo.
echo Your project has been redeployed with the Supabase database connection.
echo Signup functionality should now work on the live site.
pause