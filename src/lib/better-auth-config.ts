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