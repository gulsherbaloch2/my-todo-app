#!/bin/bash
# Script to set environment variables in Vercel

echo "Setting environment variables in Vercel..."

# Extract values from .env.local
DATABASE_URL_VALUE=$(grep DATABASE_URL .env.local | cut -d '=' -f2-)
BETTER_AUTH_SECRET_VALUE=$(grep BETTER_AUTH_SECRET .env.local | cut -d '=' -f2-)
AUTH_SECRET_VALUE=$(grep AUTH_SECRET .env.local | cut -d '=' -f2-)
NEXT_PUBLIC_BASE_URL_VALUE=$(grep NEXT_PUBLIC_BASE_URL .env.local | cut -d '=' -f2-)
NEXT_PUBLIC_API_BASE_URL_VALUE=$(grep NEXT_PUBLIC_API_BASE_URL .env.local | cut -d '=' -f2-)
KRO_API_KEY_VALUE=$(grep KRO_API_KEY .env.local | cut -d '=' -f2-)

# Add the required environment variables to your Vercel project
echo "$DATABASE_URL_VALUE" | vercel env add DATABASE_URL production
echo "$BETTER_AUTH_SECRET_VALUE" | vercel env add BETTER_AUTH_SECRET production
echo "$AUTH_SECRET_VALUE" | vercel env add AUTH_SECRET production
echo "$NEXT_PUBLIC_BASE_URL_VALUE" | vercel env add NEXT_PUBLIC_BASE_URL production
echo "$NEXT_PUBLIC_API_BASE_URL_VALUE" | vercel env add NEXT_PUBLIC_API_BASE_URL production
echo "$KRO_API_KEY_VALUE" | vercel env add KRO_API_KEY production

echo "Environment variables have been added to your Vercel project."
echo "Now redeploying your project with the new environment variables..."
vercel --prod --force

echo "Your project has been redeployed with the required environment variables."
echo "Signup functionality should now work on the live site."