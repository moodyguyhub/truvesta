/** @type {import('next').NextConfig} */
const nextConfig = {
  // Truvesta is UI shell only - no API routes that touch execution
  // All authority logic lives in BrokerOps kernel
  
  // Map Vercel system env vars to NEXT_PUBLIC_ for client-side access
  env: {
    NEXT_PUBLIC_GIT_COMMIT_SHA: process.env.VERCEL_GIT_COMMIT_SHA || process.env.GIT_COMMIT_SHA || 'dev',
  },
}

module.exports = nextConfig
