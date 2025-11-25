type BillingCycle = 'monthly' | 'yearly'
type BillingCycleHIS = 'monthly' | 'semi-annual' | 'annual'
type Region = 'UK' | 'India'
type Plan = 'basic' | 'professional' | 'advanced'
type PlanHIS = 'lite' | 'pro' | 'advance'

function isProductionEnv(): boolean {
  const runtimeEnv = process.env.NEXT_PUBLIC_RUNTIME_ENV
  return runtimeEnv === 'prod' || runtimeEnv === 'production'
}

// AxonMD Price IDs - Sandbox (for dev/local environments)
const AXONMD_SANDBOX_PRICE_IDS: Record<Region, Record<Plan, Record<BillingCycle, string>>> = {
  UK: {
    basic: {
      monthly: 'price_1SXSgz03TVi4FRa6honW3sS0', 
      yearly: 'price_1SXShz03TVi4FRa6L4w66cIa', 
    },
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
    basic: {
      monthly: 'price_1SXSfm03TVi4FRa6QuK9uvVW', 
      yearly: 'price_1SXSgT03TVi4FRa69Qk4DOkx', 
    },
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

// AxonMD Price IDs - Production
const AXONMD_PRODUCTION_PRICE_IDS: Record<Region, Record<Plan, Record<BillingCycle, string>>> = {
  UK: {
    basic: {
      monthly: 'price_1SXSqZP10jvuKxaDvIrZB9oK', 
      yearly: 'price_1SXSqZP10jvuKxaD8tIuycjo', 
    },
    professional: {
      monthly: 'price_1SPcZqP10jvuKxaDFladS0Un',
      yearly: 'price_1SPcZqP10jvuKxaDQlmDZatE',
    },
    advanced: {
      monthly: 'price_1SPcZmP10jvuKxaD1wG0AJc6',
      yearly: 'price_1SPcZmP10jvuKxaDMVwdvrYh',
    },
  },
  India: {
    basic: {
      monthly: 'price_1SXSqZP10jvuKxaD4ssBNOIa', 
      yearly: 'price_1SXSqZP10jvuKxaDM2msERNN', 
    },
    professional: {
      monthly: 'price_1SPcZqP10jvuKxaDGDQ075i4',
      yearly: 'price_1SPcZqP10jvuKxaDnqLu4IwG',
    },
    advanced: {
      monthly: 'price_1SPcZmP10jvuKxaD4Xne3ZxR',
      yearly: 'price_1SPcZmP10jvuKxaDCknV0mNV',
    },
  },
}

// AxonHIS Price IDs - Sandbox (production IDs not yet added)
const AXONHIS_SANDBOX_PRICE_IDS: Record<Region, Record<PlanHIS, Record<BillingCycleHIS, string>>> = {
  India: {
    lite: {
      monthly: 'price_1SQOtV03TVi4FRa6XB76tkTA',
      'semi-annual': 'price_1SQOtV03TVi4FRa6E4U5qQ5t',
      annual: 'price_1SQOtV03TVi4FRa6ODkOQNbP',
    },
    pro: {
      monthly: 'price_1SQOwX03TVi4FRa6PlhomHpS',
      'semi-annual': 'price_1SQOwX03TVi4FRa6MzsSdT4H',
      annual: 'price_1SQOwX03TVi4FRa6SPXuIK53',
    },
    advance: {
      monthly: 'price_1SQP2n03TVi4FRa6j6jc3ofN',
      'semi-annual': 'price_1SQP2n03TVi4FRa66xOJUvYO',
      annual: 'price_1SQP2n03TVi4FRa6d8CZmEVt',
    },
  },
  UK: {
    lite: {
      monthly: 'price_1SQOtV03TVi4FRa6NIuuQafX',
      'semi-annual': 'price_1SQOtV03TVi4FRa6LthOsVSz',
      annual: 'price_1SQOtV03TVi4FRa69o4dBpDf',
    },
    pro: {
      monthly: 'price_1SQOwX03TVi4FRa6JqueyzlZ',
      'semi-annual': 'price_1SQOwX03TVi4FRa6btYWD2j2',
      annual: 'price_1SQOwX03TVi4FRa6n3aVSA3S',
    },
    advance: {
      monthly: 'price_1SQP2n03TVi4FRa6TUiE3vwN',
      'semi-annual': 'price_1SQP2n03TVi4FRa6IDDI7tWh',
      annual: 'price_1SQP2n03TVi4FRa6nAqBZe0P',
    },
  },
}

// AxonHIS Price IDs - Production (TODO: Add production price IDs when available)
const AXONHIS_PRODUCTION_PRICE_IDS: Record<Region, Record<PlanHIS, Record<BillingCycleHIS, string>>> = {
  India: {
    lite: {
      monthly: 'price_1SXSqgP10jvuKxaDt9pDc0Sk', // TODO: Add Stripe Price ID for Lite plan (India, monthly)
      'semi-annual': 'price_1SXSqhP10jvuKxaDYxkdEdZB', // TODO: Add Stripe Price ID for Lite plan (India, semi-annual)
      annual: 'price_1SXSqgP10jvuKxaDnuUbtSW4', // TODO: Add Stripe Price ID for Lite plan (India, annual)
    },
    pro: {
      monthly: 'price_1SXSqlP10jvuKxaDJMcxRp8o', // TODO: Add Stripe Price ID for Pro plan (India, monthly)
      'semi-annual': 'price_1SXSqlP10jvuKxaDdUE6SHVf', // TODO: Add Stripe Price ID for Pro plan (India, semi-annual)
      annual: 'price_1SXSqlP10jvuKxaDsNFq5wnO', // TODO: Add Stripe Price ID for Pro plan (India, annual)
    },
    advance: {
      monthly: 'price_1SXSqnP10jvuKxaDjvUoU6RU', // TODO: Add Stripe Price ID for Advance plan (India, monthly)
      'semi-annual': 'price_1SXSqnP10jvuKxaD8NKuo6pR', // TODO: Add Stripe Price ID for Advance plan (India, semi-annual)
      annual: 'price_1SXSqnP10jvuKxaDyM722LAQ', // TODO: Add Stripe Price ID for Advance plan (India, annual)
    },
  },
  UK: {
    lite: {
      monthly: 'price_1SXSqgP10jvuKxaDU7MwciBn', // TODO: Add Stripe Price ID for Lite plan (UK, monthly)
      'semi-annual': 'price_1SXSqgP10jvuKxaDQFZ9Fdq7', // TODO: Add Stripe Price ID for Lite plan (UK, semi-annual)
      annual: 'price_1SXSqgP10jvuKxaDOpj79h8r', // TODO: Add Stripe Price ID for Lite plan (UK, annual)
    },
    pro: {
      monthly: 'price_1SXSqlP10jvuKxaDUHMrEdwb', // TODO: Add Stripe Price ID for Pro plan (UK, monthly)
      'semi-annual': 'price_1SXSqlP10jvuKxaDkscpmltw', // TODO: Add Stripe Price ID for Pro plan (UK, semi-annual)
      annual: 'price_1SXSqlP10jvuKxaDwb2k473L', // TODO: Add Stripe Price ID for Pro plan (UK, annual)
    },
    advance: {
      monthly: 'price_1SXSqnP10jvuKxaD14NI7w5h', // TODO: Add Stripe Price ID for Advance plan (UK, monthly)
      'semi-annual': 'price_1SXSqnP10jvuKxaDgm3AyGfA', // TODO: Add Stripe Price ID for Advance plan (UK, semi-annual)
      annual: 'price_1SXSqnP10jvuKxaDF5WLz2LJ', // TODO: Add Stripe Price ID for Advance plan (UK, annual)
    },
  },
}

/**
 * Get AxonMD price ID based on environment, region, plan, and billing cycle
 */
export function getAxonMDPriceId(
  region: Region,
  plan: Plan,
  billingCycle: BillingCycle
): string {
  const priceIds = isProductionEnv() ? AXONMD_PRODUCTION_PRICE_IDS : AXONMD_SANDBOX_PRICE_IDS
  return priceIds[region]?.[plan]?.[billingCycle] || ''
}

/**
 * Get AxonHIS price ID based on environment, region, plan, and billing cycle
 */
export function getAxonHISPriceId(
  region: Region,
  plan: PlanHIS,
  billingCycle: BillingCycleHIS
): string {
  const priceIds = isProductionEnv() ? AXONHIS_PRODUCTION_PRICE_IDS : AXONHIS_SANDBOX_PRICE_IDS
  return priceIds[region]?.[plan]?.[billingCycle] || ''
}

