import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { COUNTRY_CODES } from '@/lib/country-codes'
import { buildExternalUrl, ExternalApiEndpoints } from '@/lib/external-api'

function getCountryNameFromCode(code?: string | null): string | undefined {
  if (!code) return undefined
  const upper = code.toUpperCase()
  return COUNTRY_CODES.find(c => c.code === upper)?.name
}

function normalizeGender(g?: string | null | undefined): 'M' | 'F' | 'O' | undefined {
  if (!g) return undefined
  const v = g.trim().toLowerCase()
  if (v.startsWith('m')) return 'M'
  if (v.startsWith('f')) return 'F'
  return 'O'
}

function toIso(ts?: number | null): string | undefined {
  if (!ts) return undefined
  try { return new Date(ts * 1000).toISOString() } catch { return undefined }
}

function addMonths(iso: string, months: number): string {
  const d = new Date(iso)
  const nd = new Date(d)
  nd.setMonth(d.getMonth() + months)
  return nd.toISOString()
}

function addYears(iso: string, years: number): string {
  const d = new Date(iso)
  const nd = new Date(d)
  nd.setFullYear(d.getFullYear() + years)
  return nd.toISOString()
}

function formatDdMmYyyy(iso: string | undefined): string {
  try {
    if (!iso) return ''
    const d = new Date(iso)
    const dd = String(d.getUTCDate()).padStart(2, '0')
    const mm = String(d.getUTCMonth() + 1).padStart(2, '0')
    const yyyy = d.getUTCFullYear()
    return `${dd}-${mm}-${yyyy}`
  } catch {
    return ''
  }
}

export async function GET() {
  return NextResponse.json({ ok: true })
}

export async function POST(request: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  const stripeSecret = process.env.STRIPE_SECRET_KEY
  if (!secret || !stripeSecret) {
    return NextResponse.json({ error: 'Missing Stripe secrets' }, { status: 500 })
  }

  const payload = await request.text()
  const sig = request.headers.get('stripe-signature') as string

  const stripe = new Stripe(stripeSecret, { apiVersion: '2025-08-27.basil' })

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(payload, sig, secret)
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 })
  }

  // Log event basics and metadata for inspection
  try {
    console.log('[stripe] event', {
      id: event.id,
      type: event.type,
      created: event.created,
    })
    const obj: any = (event as any).data?.object
    if (obj?.metadata) {
      console.log('[stripe] metadata', obj.metadata)
    }
    // For checkout.session, also log customer details if present
    if (event.type.startsWith('checkout.session')) {
      console.log('[stripe] checkout.session summary', {
        customer: obj?.customer,
        customer_email: obj?.customer_details?.email || obj?.customer_email,
        subscription: obj?.subscription,
      })
    }
    // For subscription lifecycle changes
    if (event.type === 'customer.subscription.updated') {
      console.log('[stripe] subscription.updated', {
        id: obj?.id,
        status: obj?.status,
        cancel_at_period_end: obj?.cancel_at_period_end,
        cancel_at: obj?.cancel_at,
        canceled_at: obj?.canceled_at,
        current_period_end: obj?.current_period_end,
        current_period_start: obj?.current_period_start,
      })
    }
    if (event.type === 'customer.subscription.deleted') {
      console.log('[stripe] subscription.deleted', {
        id: obj?.id,
        status: obj?.status,
        canceled_at: obj?.canceled_at,
        ended_at: obj?.ended_at,
      })
    }
  } catch (e) {
    console.error('[stripe] log error', e)
  }

  // Transform and forward on checkout.session.completed
  if (event.type === 'checkout.session.completed') {
    try {
      const session = (event as any).data?.object as Stripe.Checkout.Session
      const md = (session?.metadata || {}) as Record<string, string>

      const plan = md.plan || ''
      const billingCycle = md.billingCycle || 'monthly'
      // Trial end is session.created + 90 days
      const trialStartIso = toIso(session?.created) || new Date().toISOString()
      let subscriptionStartIso = addMonths(trialStartIso, 3) // 90 days ~ 3 months
      let subscriptionEndIso = billingCycle === 'yearly'
        ? addYears(subscriptionStartIso, 1)
        : addMonths(subscriptionStartIso, 1)

      const countryName = getCountryNameFromCode(md.doctor_country || session?.customer_details?.address?.country) || 'India'
      const privateNetwork = md.private_network === 'true'
      
      const payload: any = {
        privateNetwork,
        firstName: md.doctor_first_name || '',
        lastName: md.doctor_last_name || '',
        specialty: md.doctor_speciality || '',
        gender: normalizeGender(md.doctor_gender) || 'O',
        countryName,
        mobileNumber: md.doctor_phone || '',
        registrationNumber: md.doctor_registration_number || '',
        emailId: (session?.customer_details?.email || session?.customer_email || '').toString(),
        classificationName: md.doctor_speciality || '',
        sessionObject: {
          unitId: 4,
          hospitalId: 1,
          channelId: 1,
          roleMasterId: 2,
          bucketName: "gastrosurgery--uk/",
        },
        subscriptionStartDate: formatDdMmYyyy(subscriptionStartIso),
        subscriptionEndDate: formatDdMmYyyy(subscriptionEndIso),
        subscriptionPaymentDetails: JSON.stringify({
          eventId: event.id,
          sessionId: session?.id,
          subscriptionId: session?.subscription,
          customerId: session?.customer,
          invoiceId: session?.invoice,
          currency: session?.currency,
          amountSubtotal: session?.amount_subtotal,
          amountTotal: session?.amount_total,
          paymentStatus: session?.payment_status,
          mode: session?.mode,
          lineItems: undefined,
          plan,
          billingCycle,
          region: md.region || '',
        }),
      }
      
      // Add unitMasterDto if private network
      if (privateNetwork) {
        const countryId = parseInt(md.unit_country_id || '0')
        const stateId = parseInt(md.unit_state_id || '0')
        const cityId = parseInt(md.unit_city_id || '0')
        const zoneId = parseInt(md.unit_zone_id || '0')
        
        if (countryId && stateId && cityId && zoneId) {
          payload.unitMasterDto = {
            countryId,
            stateId,
            cityId,
            zoneId,
          }
        }
      }

      // Placeholder endpoint; backend will provide actual URL
      const backendUrl = buildExternalUrl(ExternalApiEndpoints.saveDoctor)
      console.log('[doctor-save] payload', payload)
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch((e) => {
        console.error('[doctor-save] network error', e)
      })
      console.log('[doctor-save] response', await response?.json())
    } catch (e) {
      console.error('[doctor-save] transform error', e)
    }
  }

  // Handle recurring charges: invoice.payment_succeeded
  if (event.type === 'invoice.payment_succeeded') {
    try {
      const invoice = (event as any).data?.object as any
      const subId = typeof invoice?.subscription === 'string' ? invoice.subscription : invoice?.subscription?.id
      const customerId = typeof invoice?.customer === 'string' ? invoice.customer : invoice?.customer?.id

      // Retrieve subscription to get metadata and period dates
      let subscription: Stripe.Subscription | null = null
      if (subId) {
        subscription = await stripe.subscriptions.retrieve(subId)
      }

      // Determine email
      let emailId = (invoice?.customer_email || '') as string
      if (!emailId && customerId) {
        try {
          const customer = await stripe.customers.retrieve(customerId)
          emailId = (customer as any)?.email || ''
        } catch {
          // ignore
        }
      }

      // Compute period start/end from subscription
      const periodStartIso = toIso((subscription as any)?.current_period_start || null)
      const periodEndIso = toIso((subscription as any)?.current_period_end || null)
      const subscriptionStartDate = formatDdMmYyyy(periodStartIso)
      const subscriptionEndDate = formatDdMmYyyy(periodEndIso)

      // Derive metadata
      const plan = (subscription as any)?.metadata?.plan || ''
      const region = (subscription as any)?.metadata?.region || ''
      const interval = (subscription as any)?.items?.data?.[0]?.price?.recurring?.interval
      const billingCycle = interval === 'year' ? 'yearly' : 'monthly'

      const paymentDetails = {
        eventId: event.id,
        sessionId: undefined,
        subscriptionId: subId,
        customerId,
        invoiceId: invoice?.id,
        currency: invoice?.currency,
        amountSubtotal: invoice?.amount_subtotal ?? 0,
        amountTotal: invoice?.amount_paid ?? invoice?.amount_total ?? 0,
        paymentStatus: invoice?.status || 'paid',
        mode: 'subscription',
        plan,
        billingCycle,
        region,
      }

      const payload = {
        emailId,
        subscriptionStartDate,
        subscriptionEndDate,
        subscriptionPaymentDetails: JSON.stringify(paymentDetails),
      }

      const updateUrl = buildExternalUrl(ExternalApiEndpoints.updateDoctor)
      console.log('[doctor-update] payload', payload)
      const response = await fetch(updateUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch((e) => {
        console.error('[doctor-update] network error', e)
      })
      try {
        console.log('[doctor-update] response', await response?.json())
      } catch {}
    } catch (e) {
      console.error('[doctor-update] transform error', e)
    }
  }

  // Handle cancellation schedule/renewal toggles: customer.subscription.updated
  if (event.type === 'customer.subscription.updated') {
    try {
      const sub = (event as any).data?.object as any
      const previous = (event as any).data?.previous_attributes as any

      const customerId = typeof sub?.customer === 'string' ? sub.customer : sub?.customer?.id
      let emailId = ''
      if (customerId) {
        try {
          const customer = await stripe.customers.retrieve(customerId)
          emailId = (customer as any)?.email || ''
        } catch {}
      }

      // Determine if this update schedules a cancellation (or removes it)
      const cancelScheduled = sub?.cancel_at_period_end === true
      const cancelRemoved = previous?.cancel_at_period_end === true && sub?.cancel_at_period_end === false

      // Build payload per spec
      const updateUrl = buildExternalUrl(ExternalApiEndpoints.updateDoctor)
      if (cancelScheduled) {
        // Skip initial toggle events that only mark cancellation_requested
        const reason = sub?.cancellation_details?.feedback || sub?.cancellation_details?.reason
        if (reason === 'cancellation_requested') {
          console.log('[doctor-update][subscription.updated] skip initial cancellation_requested')
          return NextResponse.json({ received: true })
        }
        // Use next cycle start/end: prefer cancel_at, then current_period_end, then trial_end, then billing_cycle_anchor
        const nextCycleIso = toIso(
          sub?.cancel_at || sub?.current_period_end || sub?.trial_end || sub?.billing_cycle_anchor || null
        )
        const payload = {
          emailId,
          // Send end-of-current-cycle date (next cycle start)
          subscriptionEndDate: formatDdMmYyyy(nextCycleIso),
          cancellationReason: reason || 'cancellation_requested',
        }
        console.log('[doctor-update][subscription.updated] payload', payload)
        try {
          const resp = await fetch(updateUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })
          try { console.log('[doctor-update][subscription.updated] response', await resp.json()) } catch {}
        } catch (e) {
          console.error('[doctor-update] network error (subscription.updated)', e)
        }
      } else if (cancelRemoved) {
        const startIso = toIso(sub?.current_period_start || null)
        const endIso = toIso(sub?.current_period_end || null)
        const payload = {
          emailId,
          subscriptionStartDate: formatDdMmYyyy(startIso),
          subscriptionEndDate: formatDdMmYyyy(endIso),
          cancellationReason: 'renewed',
        }
        console.log('[doctor-update][subscription.updated-renew] payload', payload)
        try {
          const resp = await fetch(updateUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })
          try { console.log('[doctor-update][subscription.updated-renew] response', await resp.json()) } catch {}
        } catch (e) {
          console.error('[doctor-update] network error (subscription.updated-renew)', e)
        }
      }
    } catch (e) {
      console.error('[doctor-update] transform error (subscription.updated)', e)
    }
  }

  // Handle finalized cancellation: customer.subscription.deleted
  if (event.type === 'customer.subscription.deleted') {
    try {
      const sub = (event as any).data?.object as any
      const customerId = typeof sub?.customer === 'string' ? sub.customer : sub?.customer?.id
      let emailId = ''
      if (customerId) {
        try {
          const customer = await stripe.customers.retrieve(customerId)
          emailId = (customer as any)?.email || ''
        } catch {}
      }

      // For final deletion, send end-of-cycle date: prefer cancel_at, then current_period_end, then trial_end, then ended_at
      const finalEndIso = toIso(
        sub?.cancel_at || sub?.current_period_end || sub?.trial_end || sub?.ended_at || null
      )
      const payload = {
        emailId,
        // Send end-of-current-cycle date
        subscriptionEndDate: formatDdMmYyyy(finalEndIso),
        cancellationReason: sub?.cancellation_details?.feedback || sub?.cancellation_details?.reason || 'subscription_deleted',
      }
      const updateUrl = buildExternalUrl(ExternalApiEndpoints.updateDoctor)
      console.log('[doctor-update][subscription.deleted] payload', payload)
      try {
        const resp = await fetch(updateUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        try { console.log('[doctor-update][subscription.deleted] response', await resp.json()) } catch {}
      } catch (e) {
        console.error('[doctor-update] network error (subscription.deleted)', e)
      }
    } catch (e) {
      console.error('[doctor-update] transform error (subscription.deleted)', e)
    }
  }

  return NextResponse.json({ received: true })
}

export const config = {
  api: {
    bodyParser: false,
  },
}



