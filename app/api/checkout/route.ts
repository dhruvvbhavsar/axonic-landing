import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

type BillingCycle = 'monthly' | 'yearly'
type Region = 'UK' | 'India'
type Plan = 'professional' | 'advanced'
type DoctorDetails = {
  firstName?: string
  lastName?: string
  registrationNumber?: string
  email?: string
  countryCode?: string
  phone?: string
  speciality?: string
  gender?: string
  country?: string
}

function getCurrencyForRegion(region: Region): 'inr' | 'gbp' {
  return region === 'UK' ? 'gbp' : 'inr'
}

function getUnitAmountCents(plan: Plan, billingCycle: BillingCycle, region: Region): number {
  // All amounts are in the smallest currency unit (paise or pence)
  if (plan === 'professional') {
    if (region === 'UK') {
      return billingCycle === 'monthly' ? 10000 : 72000 // £100/mo or £720/year
    }
    return billingCycle === 'monthly' ? 200000 : 1500000 // ₹2000/mo or ₹15000/year
  }

  // advanced
  if (region === 'UK') {
    return billingCycle === 'monthly' ? 12500 : 90000 // £125/mo or £900/year
  }
  return billingCycle === 'monthly' ? 250000 : 1800000 // ₹2500/mo or ₹18000/year
}

function getInterval(billingCycle: BillingCycle): 'month' | 'year' {
  return billingCycle === 'monthly' ? 'month' : 'year'
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({})) as {
      plan?: Plan
      billingCycle?: BillingCycle
      region?: Region
      customerEmail?: string
      doctor?: DoctorDetails
      successUrl?: string
      cancelUrl?: string
    }

    const plan: Plan = (body.plan || 'professional')
    const billingCycle: BillingCycle = (body.billingCycle || 'monthly')
    const region: Region = (body.region || 'India')

    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey) {
      return NextResponse.json({ error: 'Missing STRIPE_SECRET_KEY' }, { status: 500 })
    }

    const stripe = new Stripe(secretKey, {
      apiVersion: '2025-08-27.basil',
    })

    const origin = request.headers.get('origin') || 'http://localhost:3000'

    // Placeholder URLs (can be updated later). Using origin to keep flow functional.
    const successUrl = body.successUrl && body.successUrl.length > 0 ? body.successUrl : `${origin}/our-products/axonmd/`
    const cancelUrl = body.cancelUrl && body.cancelUrl.length > 0 ? body.cancelUrl : `${origin}/our-products/axonmd/`

    const currency = getCurrencyForRegion(region)
    const unitAmount = getUnitAmountCents(plan, billingCycle, region)
    const interval = getInterval(billingCycle)

    // Prefer using provided Stripe Price IDs when available (SANDBOX)
    // Region-specific prices: UK -> GBP, India -> INR
    const SANDBOX_PRICE_IDS: Record<Region, Record<Plan, Record<BillingCycle, string>>> = {
      UK: {
        professional: {
          monthly: 'price_1SDLP003TVi4FRa6kCJYA869',
          yearly: 'price_1SDLP003TVi4FRa6mwYKp0GM',
        },
        advanced: {
          monthly: 'price_1SDLRG03TVi4FRa6owv5oN7F',
          yearly: 'price_1SDLRG03TVi4FRa6VV0GCe0j',
        },
      },
      India: {
        professional: {
          monthly: 'price_1SDLP003TVi4FRa6pHsl7y9f',
          yearly: 'price_1SDLP003TVi4FRa65Y1vyh80',
        },
        advanced: {
          monthly: 'price_1SDLRG03TVi4FRa6bPT3CHU0',
          yearly: 'price_1SDLRG03TVi4FRa6C7jF9sfq',
        },
      },
    }

    // Previous LIVE price IDs (commented for reference)
    /*
    const LIVE_PRICE_IDS: Record<Plan, Record<BillingCycle, string>> = {
      professional: {
        monthly: 'price_1SCeTlP10jvuKxaDk2WhXm24',
        yearly: 'price_1SCeTlP10jvuKxaD2FLrFQ3L',
      },
      advanced: {
        monthly: 'price_1SCeXqP10jvuKxaD2L5hdSNS',
        yearly: 'price_1SCeXqP10jvuKxaDAcfCrXiG',
      },
    }
    */

    const mappedPriceId = SANDBOX_PRICE_IDS[region]?.[plan]?.[billingCycle]

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: body.doctor?.email || body.customerEmail,
      metadata: {
        doctor_first_name: body.doctor?.firstName || '',
        doctor_last_name: body.doctor?.lastName || '',
        doctor_registration_number: body.doctor?.registrationNumber || '',
        doctor_country_code: body.doctor?.countryCode || '',
        doctor_phone: body.doctor?.phone || '',
        doctor_speciality: body.doctor?.speciality || '',
        doctor_gender: body.doctor?.gender || '',
        doctor_country: body.doctor?.country || '',
        plan,
        billingCycle,
        region,
      },
      line_items: mappedPriceId
        ? [
            {
              price: mappedPriceId,
              quantity: 1,
            },
          ]
        : [
            {
              price_data: {
                currency,
                product_data: {
                  name: `Axon MD ${plan === 'professional' ? 'Professional' : 'Advanced'} (${region}, ${billingCycle})`,
                },
                unit_amount: unitAmount,
                recurring: {
                  interval,
                  interval_count: 1,
                },
              },
              quantity: 1,
            },
          ],
      subscription_data: {
        trial_period_days: 90,
        metadata: {
          doctor_first_name: body.doctor?.firstName || '',
          doctor_last_name: body.doctor?.lastName || '',
          doctor_registration_number: body.doctor?.registrationNumber || '',
          doctor_country_code: body.doctor?.countryCode || '',
          doctor_phone: body.doctor?.phone || '',
          doctor_speciality: body.doctor?.speciality || '',
          doctor_gender: body.doctor?.gender || '',
          doctor_country: body.doctor?.country || '',
          plan,
          billingCycle,
          region,
        },
      },
      billing_address_collection: 'required',
      automatic_tax: { enabled: false },
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to create checkout session' }, { status: 500 })
  }
}


