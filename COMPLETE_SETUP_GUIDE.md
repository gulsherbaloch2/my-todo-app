# Complete Setup Guide for Live Vercel Deployment

## Step 1: Update Environment Variables in Vercel Dashboard

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project "p2"
3. Go to Settings -> Environment Variables
4. Add/update the following variables:

   - `DATABASE_URL`: 
     postgresql://postgres:[YOUR-PASSWORD]@db.zqsgszqclzophlmgxzjh.supabase.co:5432/postgres
     (Replace [YOUR-PASSWORD] with your actual Supabase database password)

   - `NEXT_PUBLIC_BASE_URL`:
     https://p2-gky1yzkpt-gulsher-s-projects.vercel.app

   - `NEXT_PUBLIC_API_BASE_URL`:
     https://your-backend-deployment-url.onrender.com/api
     (Replace with your actual deployed backend API URL)

   - `BETTER_AUTH_SECRET`: 
     (Copy from your .env.local file)

   - `AUTH_SECRET`: 
     (Copy from your .env.local file)

   - `KRO_API_KEY`: 
     (Copy from your .env.local file if you're using it)

## Step 2: Update Your Auth Configuration

Update your `src/lib/better-auth-config.ts` file with this code:

```typescript
// src/lib/better-auth-config.ts
import { betterAuth } from 'better-auth';

// Check if we're in a build environment
const isBuildTime = typeof window === 'undefined' && process.env.NODE_ENV === 'production' && !process.env.NEXT_RUNTIME;

export const auth = betterAuth({
  // Only configure database if not in build time
  ...(isBuildTime ? {} : {
    database: {
      provider: 'sqlite', // Note: This will be overridden by the DATABASE_URL
      url: process.env.DATABASE_URL!,
    }
  }),
  secret: process.env.BETTER_AUTH_SECRET!,
  // Add any additional configuration options here
  socialProviders: {
    // Configure social login providers if needed
    // github: {
    //   clientId: process.env.GITHUB_ID!,
    //   clientSecret: process.env.GITHUB_SECRET!,
    // },
    // google: {
    //   clientId: process.env.GOOGLE_ID!,
    //   clientSecret: process.env.GOOGLE_SECRET!,
    // },
  },
});
```

## Step 3: Redeploy Your Application

After setting the environment variables, redeploy your application:

1. Run the UPDATE_SUPABASE_CONFIG.bat script
2. Or manually run: `vercel --prod --force`

## Step 4: Deploy Your Backend API

Before testing, you must deploy your FastAPI backend separately since Vercel only hosts the frontend:

1. Follow the instructions in BACKEND_DEPLOYMENT_GUIDE.md to deploy your backend
2. Once deployed, update your `NEXT_PUBLIC_API_BASE_URL` to your backend's deployment URL
3. Redeploy your frontend on Vercel

## Step 5: Test Your Application

Visit your live site: https://p2-gky1yzkpt-gulsher-s-projects.vercel.app

Try signing up with new credentials. The signup functionality should now work properly, and you should be able to navigate to the dashboard and use the task features.

## Troubleshooting Tips

- If signup still doesn't work, check the browser console for any error messages
- Verify that all environment variables are correctly set in the Vercel dashboard
- Make sure your Supabase database is properly configured and accessible
- Ensure that your backend API is deployed and accessible from your frontend
- Check that your BetterAuth configuration is updated as shown above
- The Enter key should now work for form submissions in both login and signup forms
- Added improved redirect handling after login/signup with small delays to ensure session establishment
- Added error handling for API connection issues on the dashboard page