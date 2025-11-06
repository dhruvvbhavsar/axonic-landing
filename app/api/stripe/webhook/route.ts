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

async function sendReceiptEmail(
  invoice: Stripe.Invoice,
  customerEmail: string,
  plan: string,
  billingCycle: string,
  region: string
): Promise<void> {
  try {
    // Get invoice link - prefer hosted_invoice_url, fallback to invoice PDF
    const invoiceLink = invoice.hosted_invoice_url || invoice.invoice_pdf || `https://dashboard.stripe.com/invoices/${invoice.id}`
    
    // Format amount based on currency
    const amount = invoice.amount_paid / 100 // Convert from cents
    const currency = invoice.currency?.toUpperCase() || 'USD'
    const currencySymbol = currency === 'INR' ? '₹' : currency === 'GBP' ? '£' : '$'
    const formattedAmount = `${currencySymbol}${amount.toFixed(2)}`
    
    // Format date
    const invoiceDate = invoice.created ? new Date(invoice.created * 1000).toLocaleDateString() : new Date().toLocaleDateString()
    
    // Format plan name
    const planName = plan ? (plan === 'professional' ? 'Professional' : 'Advanced') : 'AxonMD'
    const billingCycleName = billingCycle ? (billingCycle === 'monthly' ? 'Monthly' : 'Yearly') : ''
    const regionName = region || ''
    
    // Create HTML email content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a1a1a;">Receipt from Axonic Health</h2>
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
        
        <p>Thank you for your subscription to <strong>AxonMD ${planName}</strong>!</p>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 5px 0;"><strong>Invoice Number:</strong> ${invoice.number || invoice.id}</p>
          <p style="margin: 5px 0;"><strong>Date:</strong> ${invoiceDate}</p>
          <p style="margin: 5px 0;"><strong>Amount:</strong> ${formattedAmount}</p>
          ${billingCycleName ? `<p style="margin: 5px 0;"><strong>Billing Cycle:</strong> ${billingCycleName}</p>` : ''}
          ${regionName ? `<p style="margin: 5px 0;"><strong>Region:</strong> ${regionName}</p>` : ''}
        </div>
        
        ${invoice.status === 'paid' && invoice.amount_paid === 0 ? `
          <p style="color: #28a745; font-weight: bold;">✓ You're currently on a 90-day free trial. Your subscription will begin after the trial period.</p>
        ` : ''}
        
        <p style="margin-top: 30px;">
          <a href="${invoiceLink}" 
             style="background-color: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
            View Invoice
          </a>
        </p>
        
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
        
        <p style="color: #666; font-size: 14px;">
          For support, contact us at <a href="mailto:support@axonichealth.com">support@axonichealth.com</a>
        </p>
        
        <p style="color: #999; font-size: 12px; margin-top: 20px;">
          <em>This is an automated receipt from Axonic Health. Please keep this for your records.</em>
        </p>
      </div>
    `
    
    const emailPayload = {
      to: customerEmail,
      from: 'info@axonichealth.com',
      subject: `Receipt from Axonic Health - Invoice ${invoice.number || invoice.id}`,
      data: htmlContent
    }
    
    const response = await fetch('https://ojw0jjra11.execute-api.ap-south-1.amazonaws.com/prod/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload)
    })
    
    if (!response.ok) {
      throw new Error(`Email API error! status: ${response.status}`)
    }
    
    console.log('[receipt-email] Receipt email sent via our service:', customerEmail, 'invoice:', invoice.id)
  } catch (error: any) {
    console.error('[receipt-email] Failed to send receipt email via our service:', error?.message || error)
    throw error
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

      // Note: Receipt emails are sent via invoice.payment_succeeded event to avoid duplicates
      // Only handle doctor registration here, not email sending

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

      // Automatically refund the ₹1/£1 setup fee
      try {
        const paymentIntentId = session?.payment_intent
        if (paymentIntentId && typeof paymentIntentId === 'string') {
          // Retrieve the payment intent to get charge details
          const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
          const chargeId = paymentIntent?.latest_charge
          
          if (chargeId && typeof chargeId === 'string') {
            // Retrieve charge to check line items
            const charge = await stripe.charges.retrieve(chargeId)
            
            // Refund only the setup fee amount (100 paise/pence = ₹1/£1)
            // The setup fee is 100 in smallest currency unit
            const setupFeeAmount = 100
            
            const refund = await stripe.refunds.create({
              charge: chargeId,
              amount: setupFeeAmount,
              reason: 'requested_by_customer',
              metadata: {
                reason: 'Automatic refund of AxonMD setup fee',
                session_id: session?.id || '',
                customer_email: (session?.customer_details?.email || session?.customer_email || '').toString(),
              },
            })
            
            console.log('[auto-refund] Setup fee refunded successfully', {
              refund_id: refund.id,
              amount: setupFeeAmount,
              currency: charge.currency,
              charge_id: chargeId,
              session_id: session?.id,
            })
          } else {
            console.log('[auto-refund] No charge found for payment intent:', paymentIntentId)
          }
        } else {
          console.log('[auto-refund] No payment intent found in session')
        }
      } catch (refundError: any) {
        console.error('[auto-refund] Failed to refund setup fee:', refundError?.message || refundError)
        // Don't throw - we still want the webhook to succeed even if refund fails
      }
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

      // Send receipt email for successful payment using our email service
      // This is the single source of truth for receipt emails to avoid duplicates
      try {
        const invoiceId = invoice?.id
        if (invoiceId && typeof invoiceId === 'string') {
          let invoiceObj = await stripe.invoices.retrieve(invoiceId)
          
          // For draft invoices (common with trial signups), finalize first
          if (invoiceObj.status === 'draft') {
            try {
              const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoiceId)
              if (finalizedInvoice.status === 'open' && finalizedInvoice.amount_due > 0) {
                await stripe.invoices.pay(invoiceId)
              }
              // Retrieve updated invoice after finalization
              invoiceObj = await stripe.invoices.retrieve(invoiceId)
            } catch (finalizeError: any) {
              console.log('[receipt-email] Finalization note:', finalizeError?.message)
              // Continue with draft invoice if finalization fails
            }
          }
          
          // Get customer email
          let customerEmail = (invoiceObj.customer_email || '') as string
          if (!customerEmail && customerId) {
            try {
              const customer = await stripe.customers.retrieve(customerId)
              customerEmail = (customer as any)?.email || ''
            } catch {
              // ignore
            }
          }
          
          // Get plan and region from subscription metadata
          const plan = (subscription as any)?.metadata?.plan || ''
          const billingCycle = (subscription as any)?.metadata?.billingCycle || ''
          const region = (subscription as any)?.metadata?.region || ''
          
          // Send receipt email if invoice is paid (or open for $0 trial invoices) and we have customer email
          if ((invoiceObj.status === 'paid' || (invoiceObj.status === 'open' && invoiceObj.amount_paid === 0)) && customerEmail) {
            await sendReceiptEmail(invoiceObj, customerEmail, plan, billingCycle, region)
          }
        }
      } catch (receiptError: any) {
        console.error('[receipt-email] Failed to send receipt email for payment:', receiptError?.message || receiptError)
        // Don't throw - continue with webhook processing
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



