import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  
  return NextResponse.json({
    success: true,
    hostname,
    isAmplify: hostname.includes('.amplifyapp.com'),
    isVercel: hostname.includes('.vercel.app'),
    env: {
      MANAGE_JWT_SECRET: process.env.MANAGE_JWT_SECRET || 'NOT_SET',
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ? 'SET (hidden)' : 'NOT_SET',
      STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET ? 'SET (hidden)' : 'NOT_SET',
      NEXT_PUBLIC_BASE_DOMAIN: process.env.NEXT_PUBLIC_BASE_DOMAIN || 'NOT_SET',
    },
    note: 'This endpoint should be removed before production!'
  })
}

