import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import Stripe from 'stripe'

function getEnv(name: string, fallback?: string): string {
  const v = process.env[name] || fallback
  if (!v) throw new Error(`Missing env ${name}`)
  return v
}

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get('token') || ''
    const email = request.nextUrl.searchParams.get('email') || ''
    if (!token || !email) {
      return NextResponse.json({ error: 'missing token or email' }, { status: 400 })
    }

    const secret = new TextEncoder().encode(getEnv('MANAGE_JWT_SECRET', 'dev-secret-change'))
    const { payload } = await jwtVerify(token, secret, {
      issuer: 'axonic-manage',
      audience: 'manage-portal',
    })

    // Email binding check
    if ((payload as any).email !== email) {
      return NextResponse.json({ error: 'token/email mismatch' }, { status: 401 })
    }

    const stripeSecret = getEnv('STRIPE_SECRET_KEY')
    const stripe = new Stripe(stripeSecret, { apiVersion: '2025-08-27.basil' })

    // Lookup Stripe customer by email via your backend first (placeholder)
    // For now, search Stripe directly in test mode
    const customers = await stripe.customers.list({ email, limit: 5 })
    const customer = customers.data.find(c => !c.deleted) || customers.data[0]
    if (!customer?.id) {
      return NextResponse.json({ error: 'customer not found' }, { status: 404 })
    }

    const origin = request.nextUrl.origin
    const returnUrl = `${origin}/our-products/axonmd/`
    const session = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: returnUrl,
    })

    // Redirect to portal
    return NextResponse.redirect(session.url as string, { status: 302 })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Failed' }, { status: 500 })
  }
}
