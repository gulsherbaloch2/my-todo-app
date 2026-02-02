# Deployment Guide

## Frontend (Next.js) - Deployed on Vercel
✅ Successfully deployed at: https://p2-gky1yzkpt-gulsher-s-projects.vercel.app

## Fixing the Build Error and Signup Functionality
During the build, there was an error: `[Error [BetterAuthError]: Failed to initialize database adapter]`, and the signup functionality is not working on the live site.

To fix these issues, follow these steps:

### Step 1: Update Environment Variables in Vercel Dashboard
1. Go to your project in the [Vercel dashboard](https://vercel.com/dashboard)
2. Select your project "p2"
3. Navigate to Settings > Environment Variables
4. Add the following variables with their values from your `.env.local` file:
   - `DATABASE_URL` (Use your Supabase PostgreSQL URL: postgresql://postgres:[YOUR-PASSWORD]@db.zqsgszqclzophlmgxzjh.supabase.co:5432/postgres - Remember to replace [YOUR-PASSWORD] with your actual password)
   - `BETTER_AUTH_SECRET` (for authentication)
   - `AUTH_SECRET` (for authentication)
   - `NEXT_PUBLIC_BASE_URL` (set to your Vercel deployment URL, e.g., https://p2-gky1yzkpt-gulsher-s-projects.vercel.app)
   - `NEXT_PUBLIC_API_BASE_URL` (set to your deployed backend API URL, e.g., https://your-backend.onrender.com/api)
   - `KRO_API_KEY` (if you're using the KRO API)

### Step 2: Update your auth configuration to handle build time vs runtime by updating `src/lib/better-auth-config.ts`:

   ```typescript
   // src/lib/better-auth-config.ts
   import { betterAuth } from 'better-auth';

   // Check if we're in a build environment
   const isBuildTime = typeof window === 'undefined' && process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'phase-production-build';

   export const auth = betterAuth({
     // Only configure database if not in build time
     ...(isBuildTime ? {} : {
       database: {
         provider: 'postgresql', // Changed to PostgreSQL for production
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
     // Session configuration for production
     session: {
       expiresIn: 7 * 24 * 60 * 60, // 7 days
       updateAge: 24 * 60 * 60, // 24 hours
     },
   });
   ```

### Step 3: Redeploy Your Application
After updating the environment variables and auth configuration, redeploy your application:
- Run the `SET_ENV_AND_DEPLOY.bat` script (Windows) or `SET_ENV_AND_DEPLOY.sh` script (Linux/Mac)
- Or manually run: `vercel --prod --force`

## Backend (FastAPI) - Required for Full Functionality

Your frontend application communicates with your backend API for task management features. Vercel does not natively support Python backends, so you must deploy your backend separately for full functionality.

Follow the detailed instructions in BACKEND_DEPLOYMENT_GUIDE.md to deploy your backend to an appropriate platform like Render, Railway, or PythonAnywhere.

After deploying your backend:
1. Update the `NEXT_PUBLIC_API_BASE_URL` environment variable in Vercel with your backend's deployment URL
2. Redeploy your frontend application

## Connecting Frontend to Backend
Once your backend is deployed, update the API endpoints in your frontend to point to your backend URL.

For example, in your frontend code, replace:
- `http://localhost:8000` with your deployed backend URL

## Environment Variables
Make sure to set the following environment variables in your deployment environments:
- Database connection strings
- Authentication secrets
- API keys

## Troubleshooting

### Common Issues and Solutions

#### Issue: Cannot navigate past login/signup page
- **Cause**: Authentication state not persisting or incorrect redirect URLs
- **Solution**:
  1. Ensure `NEXT_PUBLIC_BASE_URL` is set to your exact Vercel deployment URL
  2. Verify that your auth callbacks are configured correctly
  3. Check browser console for any authentication errors

#### Issue: Session not persisting between page loads
- **Cause**: Cookie settings or domain mismatch
- **Solution**:
  1. Make sure your domain settings in BetterAuth match your deployment URL
  2. Check that cookies are not being blocked by browser settings

#### Issue: Database connection errors
- **Cause**: Incorrect DATABASE_URL or database not accessible
- **Solution**:
  1. Verify your database connection string is correct
  2. Ensure your database provider (Supabase, etc.) is allowing connections from your domain

#### Issue: API calls failing
- **Cause**: Incorrect API base URL or CORS issues
- **Solution**: Make sure your NEXT_PUBLIC_API_BASE_URL is set correctly for production

- If you encounter the BetterAuth database error during build, ensure database connections are only made during runtime, not during build time.
- For local development, ensure your backend is running before starting your frontend.