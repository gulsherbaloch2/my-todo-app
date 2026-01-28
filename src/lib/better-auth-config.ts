// src/lib/better-auth-config.ts
import { betterAuth } from 'better-auth';

export const auth = betterAuth({
  database: {
    provider: 'sqlite',
    url: process.env.DATABASE_URL!,
  },
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