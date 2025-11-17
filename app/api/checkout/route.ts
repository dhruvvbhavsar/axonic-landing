import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

type BillingCycle = 'monthly' | 'yearly'
type BillingCycleHIS = 'monthly' | 'semi-annual' | 'annual'
type Region = 'UK' | 'India'
type Plan = 'basic' | 'professional' | 'advanced'
type PlanHIS = 'lite' | 'pro' | 'advance'
type Product = 'axonmd' | 'axonhis'

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

type OrganizationDetails = {
  organizationName?: string
  contactPerson?: string
  organizationEmail?: string
  email?: string
  phone?: string
  countryCode?: string
  beds?: number
  address?: string
  postalCode?: string
  contactNumber?: string
  subDomain?: string
  appUrl?: string
}

type UnitMasterDto = {
  countryId?: number
  stateId?: number
  cityId?: number
  zoneId?: number
}

function getCurrencyForRegion(region: Region): 'inr' | 'gbp' {
  return region === 'UK' ? 'gbp' : 'inr'
}

function getUnitAmountCents(plan: Plan, billingCycle: BillingCycle, region: Region): number {
  // All amounts are in the smallest currency unit (paise or pence)
  if (plan === 'basic') {
    if (region === 'UK') {
      return billingCycle === 'monthly' ? 7500 : 54000 // £75/mo or £540/year
    }
    return billingCycle === 'monthly' ? 150000 : 1080000 // ₹1500/mo or ₹10800/year
  }

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

function getUnitAmountCentsHIS(plan: PlanHIS, billingCycle: BillingCycleHIS, region: Region): number {
  // All amounts are in the smallest currency unit (paise or pence)
  if (region === 'India') {
    // India pricing (INR in paise)
    if (plan === 'lite') {
      if (billingCycle === 'monthly') return 1700000 // ₹17,000
      if (billingCycle === 'semi-annual') return 3850000 // ₹38,500
      return 11500000 // ₹1,15,000 annual
    }
    if (plan === 'pro') {
      if (billingCycle === 'monthly') return 10000000 // ₹1,00,000
      if (billingCycle === 'semi-annual') return 22500000 // ₹2,25,000
      return 65000000 // ₹6,50,000 annual
    }
    // advance
    if (billingCycle === 'monthly') return 20000000 // ₹2,00,000
    if (billingCycle === 'semi-annual') return 45000000 // ₹4,50,000
    return 130000000 // ₹13,00,000 annual
  }

  // UK pricing (GBP in pence)
  if (plan === 'lite') {
    if (billingCycle === 'monthly') return 20000 // £200
    if (billingCycle === 'semi-annual') return 117500 // £1,175
    return 235000 // £2,350 annual
  }
  if (plan === 'pro') {
    if (billingCycle === 'monthly') return 45000 // £450
    if (billingCycle === 'semi-annual') return 265000 // £2,650
    return 530000 // £5,300 annual
  }
  // advance
  if (billingCycle === 'monthly') return 130000 // £1,300
  if (billingCycle === 'semi-annual') return 765000 // £7,650
  return 1530000 // £15,300 annual
}

function getIntervalHIS(billingCycle: BillingCycleHIS): 'month' | 'year' {
  return billingCycle === 'annual' ? 'year' : 'month'
}

function getIntervalCountHIS(billingCycle: BillingCycleHIS): number {
  if (billingCycle === 'monthly') return 1
  if (billingCycle === 'semi-annual') return 6
  return 1 // annual uses 'year' interval
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({})) as {
      product?: Product
      plan?: Plan | PlanHIS
      billingCycle?: BillingCycle | BillingCycleHIS
      region?: Region
      customerEmail?: string
      doctor?: DoctorDetails
      organization?: OrganizationDetails
      privateNetwork?: boolean
      unitMasterDto?: UnitMasterDto
      successUrl?: string
      cancelUrl?: string
    }

    const product: Product = (body.product || 'axonmd')
    const region: Region = (body.region || 'India')

    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey) {
      return NextResponse.json({ error: 'Missing STRIPE_SECRET_KEY' }, { status: 500 })
    }

    const stripe = new Stripe(secretKey, {
      apiVersion: '2025-08-27.basil',
    })

    const origin = request.headers.get('origin') || 'http://localhost:3000'
    
    // Read environment selection from header (for dev/local environments)
    const externalApiAlias = request.headers.get('x-external-api') || ''
    // Only store non-production aliases (never store 'axonmd')
    const envAlias = externalApiAlias && externalApiAlias !== 'axonmd' ? externalApiAlias : ''

    // Route to AxonHIS flow
    if (product === 'axonhis') {
      return handleAxonHISCheckout(body, region, origin, envAlias)
    }

    // Existing AxonMD flow (unchanged for backward compatibility)
    const plan: Plan = (body.plan as Plan || 'professional')
    const billingCycle: BillingCycle = (body.billingCycle as BillingCycle || 'monthly')

    // Placeholder URLs (can be updated later). Using origin to keep flow functional.
    const successUrl = body.successUrl && body.successUrl.length > 0 ? body.successUrl : `${origin}/our-products/axonmd/`
    const cancelUrl = body.cancelUrl && body.cancelUrl.length > 0 ? body.cancelUrl : `${origin}/our-products/axonmd/`

    const currency = getCurrencyForRegion(region)
    const unitAmount = getUnitAmountCents(plan, billingCycle, region)
    const interval = getInterval(billingCycle)

    // Fetch dynamic trial days from internal proxy (fallback to 90)
    const runtimeEnv = process.env.NEXT_PUBLIC_RUNTIME_ENV || 'dev'
    let trialDays = 90
    try {
      const trialsResp = await fetch(`${origin}/api/trials/axonmd?env=${runtimeEnv}`, { cache: 'no-store' })
      if (trialsResp.ok) {
        const json = await trialsResp.json().catch(() => ({}))
        const parsed = Number(json?.data?.trialDays)
        if (Number.isFinite(parsed) && parsed > 0) {
          trialDays = parsed
        }
      }
    } catch {}

    // Prefer using provided Stripe Price IDs when available (SANDBOX)
    // Region-specific prices: UK -> GBP, India -> INR
    const SANDBOX_PRICE_IDS: Record<Region, Record<Plan, Record<BillingCycle, string>>> = {
      UK: {
        basic: {
          monthly: '', // TODO: Add Stripe Price ID for Basic plan (UK, monthly)
          yearly: '', // TODO: Add Stripe Price ID for Basic plan (UK, yearly)
        },
        professional: {
          monthly: 'price_1SDLP003TVi4FRa6kCJYA869',
          yearly: 'price_1SDLP003TVi4FRa6mwYKp0GM',

          // monthly: 'price_1SPcZqP10jvuKxaDFladS0Un',
          // yearly: 'price_1SPcZqP10jvuKxaDQlmDZatE',
        },
        advanced: {
          monthly: 'price_1SDLRG03TVi4FRa6owv5oN7F',
          yearly: 'price_1SDLRG03TVi4FRa6VV0GCe0j',

          // monthly: 'price_1SPcZmP10jvuKxaD1wG0AJc6',
          // yearly: 'price_1SPcZmP10jvuKxaDMVwdvrYh',
        },
      },
      India: {
        basic: {
          monthly: '', // TODO: Add Stripe Price ID for Basic plan (India, monthly)
          yearly: '', // TODO: Add Stripe Price ID for Basic plan (India, yearly)
        },
        professional: {
          monthly: 'price_1SDLP003TVi4FRa6pHsl7y9f',
          yearly: 'price_1SDLP003TVi4FRa65Y1vyh80',

          // monthly: 'price_1SPcZqP10jvuKxaDGDQ075i4',
          // yearly: 'price_1SPcZqP10jvuKxaDnqLu4IwG',
        },
        advanced: {
          monthly: 'price_1SDLRG03TVi4FRa6bPT3CHU0',
          yearly: 'price_1SDLRG03TVi4FRa6C7jF9sfq',

          // monthly: 'price_1SPcZmP10jvuKxaD4Xne3ZxR',
          // yearly: 'price_1SPcZmP10jvuKxaDCknV0mNV',
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

    // Build metadata object with environment alias if present
    const sessionMetadata: Record<string, string> = {
      product: 'axonmd',
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
      private_network: body.privateNetwork ? 'true' : 'false',
      unit_country_id: body.unitMasterDto?.countryId?.toString() || '',
      unit_state_id: body.unitMasterDto?.stateId?.toString() || '',
      unit_city_id: body.unitMasterDto?.cityId?.toString() || '',
      unit_zone_id: body.unitMasterDto?.zoneId?.toString() || '',
      trial_days: String(trialDays),
    }
    
    // Add environment alias to metadata if present (for dev/local environments)
    if (envAlias) {
      sessionMetadata.external_api_alias = envAlias
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: body.doctor?.email || body.customerEmail,
      metadata: sessionMetadata,
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
                name: `Axon MD ${plan === 'basic' ? 'Basic' : plan === 'professional' ? 'Professional' : 'Advanced'} (${region}, ${billingCycle})`,
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
        trial_period_days: trialDays,
        metadata: sessionMetadata,
      },
      billing_address_collection: 'required',
      automatic_tax: { enabled: false },
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to create checkout session' }, { status: 500 })
  }
}

async function handleAxonHISCheckout(
  body: {
    plan?: Plan | PlanHIS
    billingCycle?: BillingCycle | BillingCycleHIS
    organization?: OrganizationDetails
    unitMasterDto?: UnitMasterDto
    successUrl?: string
    cancelUrl?: string
  },
  region: Region,
  origin: string,
  envAlias: string
) {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    return NextResponse.json({ error: 'Missing STRIPE_SECRET_KEY' }, { status: 500 })
  }

  const stripe = new Stripe(secretKey, {
    apiVersion: '2025-08-27.basil',
  })

  const plan = (body.plan as PlanHIS || 'lite')
  const billingCycle = (body.billingCycle as BillingCycleHIS || 'monthly')

  // Default URLs for AxonHIS
  const successUrl = body.successUrl && body.successUrl.length > 0
    ? body.successUrl
    : `${origin}/our-products/axonhis/success/`
  const cancelUrl = body.cancelUrl && body.cancelUrl.length > 0
    ? body.cancelUrl
    : `${origin}/our-products/axonhis/`

  const currency = getCurrencyForRegion(region)
  const unitAmount = getUnitAmountCentsHIS(plan, billingCycle, region)
  const interval = getIntervalHIS(billingCycle)
  const intervalCount = getIntervalCountHIS(billingCycle)

  // TODO: Replace with actual Stripe Price IDs once created in Stripe Dashboard
  // See STRIPE_AXONHIS_SETUP_GUIDE.md for instructions
  // Example structure:
  const AXONHIS_PRICE_IDS: Record<Region, Record<PlanHIS, Record<BillingCycleHIS, string>>> = {
    India: {
      lite: { monthly: 'price_1SQOtV03TVi4FRa6XB76tkTA', 'semi-annual': 'price_1SQOtV03TVi4FRa6E4U5qQ5t', annual: 'price_1SQOtV03TVi4FRa6ODkOQNbP' },
      pro: { monthly: 'price_1SQOwX03TVi4FRa6PlhomHpS', 'semi-annual': 'price_1SQOwX03TVi4FRa6MzsSdT4H', annual: 'price_1SQOwX03TVi4FRa6SPXuIK53' },
      advance: { monthly: 'price_1SQP2n03TVi4FRa6j6jc3ofN', 'semi-annual': 'price_1SQP2n03TVi4FRa66xOJUvYO', annual: 'price_1SQP2n03TVi4FRa6d8CZmEVt' },
    },
    UK: {
      lite: { monthly: 'price_1SQOtV03TVi4FRa6NIuuQafX', 'semi-annual': 'price_1SQOtV03TVi4FRa6LthOsVSz', annual: 'price_1SQOtV03TVi4FRa69o4dBpDf' },
      pro: { monthly: 'price_1SQOwX03TVi4FRa6JqueyzlZ', 'semi-annual': 'price_1SQOwX03TVi4FRa6btYWD2j2', annual: 'price_1SQOwX03TVi4FRa6n3aVSA3S' },
      advance: { monthly: 'price_1SQP2n03TVi4FRa6TUiE3vwN', 'semi-annual': 'price_1SQP2n03TVi4FRa6IDDI7tWh', annual: 'price_1SQP2n03TVi4FRa6nAqBZe0P' },
    },
  }
  const mappedPriceId = AXONHIS_PRICE_IDS[region]?.[plan]?.[billingCycle]

  // Use inline price_data for now (dummy Price IDs not yet created)
  const planName = plan === 'lite' ? 'Lite' : plan === 'pro' ? 'Pro' : 'Advance'
  const billingCycleName = billingCycle === 'monthly' ? 'Monthly'
    : billingCycle === 'semi-annual' ? 'Semi-Annual'
      : 'Annual'

  // Build metadata object with environment alias if present
  const sessionMetadata: Record<string, string> = {
    product: 'axonhis',
    organization_name: body.organization?.organizationName || '',
    contact_person_name: body.organization?.contactPerson || '',
    contact_person_email: body.organization?.email || '',
    contact_person_phone: body.organization?.phone || '',
    contact_person_country_code: body.organization?.countryCode || '',
    organization_email: body.organization?.organizationEmail || '',
    beds_count: body.organization?.beds?.toString() || '',
    address: body.organization?.address || '',
    postal_code: body.organization?.postalCode || '',
    subdomain: body.organization?.subDomain || '',
    app_url: body.organization?.appUrl || '',
    plan,
    billingCycle,
    region,
    unit_country_id: body.unitMasterDto?.countryId?.toString() || '',
    unit_state_id: body.unitMasterDto?.stateId?.toString() || '',
    unit_city_id: body.unitMasterDto?.cityId?.toString() || '',
    unit_zone_id: body.unitMasterDto?.zoneId?.toString() || '',
  }
  
  // Add environment alias to metadata if present (for dev/local environments)
  if (envAlias) {
    sessionMetadata.external_api_alias = envAlias
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    success_url: successUrl,
    cancel_url: cancelUrl,
    customer_email: body.organization?.organizationEmail || body.organization?.email,
    metadata: sessionMetadata,
    line_items: [
      {
        price_data: {
          currency,
          product_data: {
            name: `AxonHIS ${planName} (${region}, ${billingCycleName})`,
          },
          unit_amount: unitAmount,
          recurring: {
            interval,
            interval_count: intervalCount,
          },
        },
        quantity: 1,
      },
    ],
    subscription_data: {
      metadata: sessionMetadata,
    },
    billing_address_collection: 'required',
    automatic_tax: { enabled: false },
  })

  return NextResponse.json({ url: session.url })
}


