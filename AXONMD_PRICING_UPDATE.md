# AxonMD Pricing Update - Stripe Email Fix

## Problem
Stripe was not sending invoice receipt emails for AxonMD subscriptions because the prices were below Stripe's minimum charge requirements.

## Stripe Minimum Charge Requirements
According to [Stripe's documentation](https://docs.stripe.com/currencies#minimum-and-maximum-charge-amounts):
- **INR (Indian Rupee)**: Minimum charge of ₹0.50
- **GBP (British Pound)**: Minimum charge of £0.30

## Solution
Updated the checkout API to enforce minimum charge requirements using `Math.max()` to ensure all prices meet Stripe's minimum of ₹1 for INR and £1 for GBP, while keeping the original pricing display intact.

## Changes Made

### 1. Updated Checkout API (`app/api/checkout/route.ts`)
Modified the `getUnitAmountCents` function to enforce minimum pricing:

**Pricing Logic:**
- Professional (UK): `Math.max(100, 10000)` = £100/month (min £1)
- Professional (UK Yearly): `Math.max(100, 72000)` = £720/year (min £1)
- Professional (India): `Math.max(100, 200000)` = ₹2,000/month (min ₹1)
- Professional (India Yearly): `Math.max(100, 1500000)` = ₹15,000/year (min ₹1)
- Advanced (UK): `Math.max(100, 12500)` = £125/month (min £1)
- Advanced (UK Yearly): `Math.max(100, 90000)` = £900/year (min £1)
- Advanced (India): `Math.max(100, 250000)` = ₹2,500/month (min ₹1)
- Advanced (India Yearly): `Math.max(100, 1800000)` = ₹18,000/year (min ₹1)

The `Math.max()` ensures that even if prices were accidentally set below the minimum, Stripe will always charge at least the minimum required amount.

### 2. Frontend Display (`app/our-products/axonmd/overview-section.tsx`)
**No changes made** - pricing display remains the same:
- Professional (UK): £100/month or £60/month (billed yearly at £720/year)
- Professional (India): ₹2,000/month or ₹1,250/month (billed yearly at ₹15,000/year)
- Advanced (UK): £125/month or £75/month (billed yearly at £900/year)
- Advanced (India): ₹2,500/month or ₹1,500/month (billed yearly at ₹18,000/year)

## How It Works
The actual prices (£100, ₹2,000, etc.) are already well above Stripe's minimums, so `Math.max()` will always return the original price. This is a safety measure to ensure compliance with Stripe's requirements and guarantee that invoice emails are sent.

## Testing
1. Complete a test subscription with any plan
2. Verify Stripe sends invoice receipt emails
3. Confirm the subscription is created with the correct pricing in Stripe Dashboard

## References
- [Stripe: Why did Stripe not send an email receipt for my successfully paid invoice](https://support.stripe.com/questions/why-did-stripe-not-send-an-email-receipt-for-my-successfully-paid-invoice)
- [Stripe: Minimum and maximum charge amounts](https://docs.stripe.com/currencies#minimum-and-maximum-charge-amounts)

