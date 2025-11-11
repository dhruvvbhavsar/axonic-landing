import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { COUNTRY_CODES } from '@/lib/country-codes'
import { buildExternalUrlFromRequest, ExternalApiEndpoints } from '@/lib/external-api'

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

function addDays(iso: string, days: number): string {
  const d = new Date(iso)
  const nd = new Date(d)
  nd.setDate(d.getDate() + days)
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
  region: string,
  product: 'axonmd' | 'axonhis' = 'axonmd',
  trialDays?: number
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
    
    // Format plan name and product name
    let productName = 'AxonMD'
    let planName = ''
    
    if (product === 'axonhis') {
      productName = 'AxonHIS'
      planName = plan === 'Lite' ? 'Lite' : plan === 'Pro' ? 'Pro' : plan === 'Advance' ? 'Advance' : plan
    } else {
      planName = plan ? (plan === 'professional' ? 'Professional' : 'Advanced') : ''
    }
    
    const billingCycleName = billingCycle 
      ? (billingCycle === 'monthly' ? 'Monthly' 
        : billingCycle === 'yearly' ? 'Yearly'
        : billingCycle === 'annual' ? 'Annual'
        : billingCycle === 'semi-annual' ? 'Semi-Annual'
        : billingCycle)
      : ''
    const regionName = region || ''
    
    // Create HTML email content
    const displayTrialDays = Number.isFinite(trialDays as any) && (trialDays as any) > 0 ? (trialDays as any) : 90
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a1a1a;">Receipt from Axonic Health</h2>
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
        
        <p>Thank you for your subscription to <strong>${productName}${planName ? ` ${planName}` : ''}</strong>!</p>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 5px 0;"><strong>Invoice Number:</strong> ${invoice.number || invoice.id}</p>
          <p style="margin: 5px 0;"><strong>Date:</strong> ${invoiceDate}</p>
          <p style="margin: 5px 0;"><strong>Amount:</strong> ${formattedAmount}</p>
          ${billingCycleName ? `<p style="margin: 5px 0;"><strong>Billing Cycle:</strong> ${billingCycleName}</p>` : ''}
          ${regionName ? `<p style="margin: 5px 0;"><strong>Region:</strong> ${regionName}</p>` : ''}
        </div>
        
        ${product === 'axonmd' && invoice.status === 'paid' && invoice.amount_paid === 0 ? `
          <p style="color: #28a745; font-weight: bold;">✓ You're currently on a ${displayTrialDays}-day free trial. Your subscription will begin after the trial period.</p>
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
    
    console.log('[receipt-email] Receipt email sent via our service:', customerEmail, 'invoice:', invoice.id, 'product:', product)
  } catch (error: any) {
    console.error('[receipt-email] Failed to send receipt email via our service:', error?.message || error)
    throw error
  }
}

async function sendPartialRegistrationEmail(
  customerEmail: string,
  firstName: string,
  lastName: string,
  resumeUrl: string
): Promise<void> {
  try {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a1a1a;">Complete your AxonMD registration</h2>
        <p>Hi ${firstName || ''} ${lastName || ''},</p>
        <p>Your partial registration is done. Click the button below to complete your profile and finish setup.</p>
        <p style="margin-top: 24px;">
          <a href="${resumeUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">Resume Registration</a>
        </p>
        <p style="color: #666; font-size: 14px; margin-top: 24px;">If the button doesn't work, copy and paste this link into your browser:<br />
        <span style="color:#111">${resumeUrl}</span></p>
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
        <p style="color: #999; font-size: 12px; margin-top: 20px;">
          <em>This is an automated email from Axonic Health.</em>
        </p>
      </div>
    `
    const emailPayload = {
      to: customerEmail,
      from: 'info@axonichealth.com',
      subject: 'AxonMD – Complete your registration',
      data: htmlContent,
    }
    const response = await fetch('https://ojw0jjra11.execute-api.ap-south-1.amazonaws.com/prod/sendEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emailPayload),
    })
    if (!response.ok) {
      throw new Error(`Email API error! status: ${response.status}`)
    }
    console.log('[partial-email] Partial registration email sent:', customerEmail)
  } catch (error: any) {
    console.error('[partial-email] Failed to send partial registration email:', error?.message || error)
  }
}

function getRequestOrigin(request: NextRequest): string {
  const proto = request.headers.get('x-forwarded-proto') || 'http'
  const host = request.headers.get('host') || 'localhost:3000'
  return `${proto}://${host}`
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

  // On checkout completion: save partial registration and email resume link
  if (event.type === 'checkout.session.completed') {
    try {
      const session = (event as any).data?.object as Stripe.Checkout.Session
      const md = (session?.metadata || {}) as Record<string, string>
      const product = md.product || 'axonmd' // Default to axonmd for backward compatibility

      // Bifurcate by product type
      if (product === 'axonhis') {
        // Handle AxonHIS organization registration
        const plan = md.plan || ''
        const billingCycle = md.billingCycle || 'monthly'
        const region = md.region || 'India'
        
        // No trial period - immediate start
        const subscriptionStartIso = toIso(session?.created) || new Date().toISOString()
        let subscriptionEndIso: string
        
        if (billingCycle === 'annual') {
          subscriptionEndIso = addYears(subscriptionStartIso, 1)
        } else if (billingCycle === 'semi-annual') {
          subscriptionEndIso = addMonths(subscriptionStartIso, 6)
        } else {
          subscriptionEndIso = addMonths(subscriptionStartIso, 1) // monthly
        }

        // Format dates as YYYY-MM-DD for paymentDetails
        const formatYyyyMmDd = (iso: string): string => {
          try {
            const d = new Date(iso)
            const year = d.getUTCFullYear()
            const month = String(d.getUTCMonth() + 1).padStart(2, '0')
            const day = String(d.getUTCDate()).padStart(2, '0')
            return `${year}-${month}-${day}`
          } catch {
            return ''
          }
        }
        
        const startDate = formatYyyyMmDd(subscriptionStartIso)
        const endDate = formatYyyyMmDd(subscriptionEndIso)

        const countryName = getCountryNameFromCode(session?.customer_details?.address?.country) || region
        
        // Build contact number with country code
        const contactNumber = md.contact_person_country_code && md.contact_person_phone
          ? `${md.contact_person_country_code}${md.contact_person_phone}`
          : md.contact_person_phone || ''
        
        // Build payment details matching ACE format
        const planType = billingCycle === 'monthly' ? '1 month'
          : billingCycle === 'semi-annual' ? '6 months'
          : billingCycle === 'annual' ? '12 months'
          : ''
        
        // Calculate amounts (amount_total is in cents)
        const totalAmount = session?.amount_total ? session.amount_total : 0
        const amount = totalAmount // Same as totalAmount in cents
        const taxAmount = 0
        const subscriptionDiscount = 0
        
        // Prepare payload matching exact format
        const payload = {
          organizationName: md.organization_name || '',
          unitName: md.organization_name || '',
          contactPerson: md.contact_person_name || '',
          organizationEmailId: md.organization_email || '',
          contactNumber: contactNumber,
          emailId: md.contact_person_email || '',
          address: md.address || '',
          postalCode: md.postal_code || '',
          countryId: md.unit_country_id || '',
          stateId: md.unit_state_id || '',
          cityId: md.unit_city_id || '',
          districtId: md.unit_zone_id || '',
          areaId: md.unit_zone_id || '',
          appUrl: md.app_url || (md.subdomain ? `${md.subdomain}.${region === 'India' ? 'his.axonichealth.co.in' : 'his.axonichealth.uk'}` : ''),
          subDomain: md.subdomain || '',
          appId: plan === 'lite' ? 1 : plan === 'pro' ? 2 : 3,
          paymentDetails: JSON.stringify({
            amount: amount,
            TransactionId: session?.payment_intent || session?.id || '',
            planType: planType,
            totalAmount: totalAmount,
            taxAmount: taxAmount,
            subscriptionDiscount: subscriptionDiscount,
            startDate: startDate,
            endDate: endDate,
          }),
        }

        console.log('[organization-save] AxonHIS organization payload', payload)
        // TODO: Uncomment when backend endpoint is ready
        const backendUrl = region === 'India' 
          ? 'https://subscription.axonichealth.co.in/api/createOrganizationFromWeb'
          : 'https://uk.his.axonichealth.uk/api/createOrganizationFromWeb'
        const response = await fetch(backendUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        console.log('[organization-save] response', await response?.json())

        return NextResponse.json({ received: true })
      }

      // Existing AxonMD flow (unchanged)
      const plan = md.plan || ''
      const billingCycle = md.billingCycle || 'monthly'
      const paymentDetails = {
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
        plan,
        billingCycle,
        region: md.region || '',
      }

      const partialPayload = {
        emailId: (session?.customer_details?.email || session?.customer_email || '').toString(),
        firstName: md.doctor_first_name || '',
        lastName: md.doctor_last_name || '',
        subscriptionPaymentDetails: JSON.stringify(paymentDetails),
      }

      const savePartialUrl = buildExternalUrlFromRequest(request, ExternalApiEndpoints.saveDoctorPartial)
      console.log('[doctor-partial-save] payload', partialPayload)
      let partialId: number | null = null
      try {
        const resp = await fetch(savePartialUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(partialPayload),
        })
        const json = await resp.json().catch(() => ({}))
        partialId = json?.object?.doctorPartialRegId ?? null
        console.log('[doctor-partial-save] response', json)
      } catch (e) {
        console.error('[doctor-partial-save] network error', e)
      }

      // Email resume link
      try {
        const origin = getRequestOrigin(request)
        const resumeUrl = partialId
          ? `${origin}/our-products/axonmd/resume/${encodeURIComponent(partialId)}`
          : `${origin}/our-products/axonmd/`
        const customerEmail = (session?.customer_details?.email || session?.customer_email || '').toString()
        if (customerEmail) {
          await sendPartialRegistrationEmail(
            customerEmail,
            md.doctor_first_name || '',
            md.doctor_last_name || '',
            resumeUrl
          )
        }
      } catch (e) {
        console.error('[doctor-partial-email] error', e)
      }
    } catch (e) {
      console.error('[doctor-partial] transform error', e)
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

      // Bifurcate by product type from subscription metadata
      const subMetadata = (subscription as any)?.metadata || {}
      const product = subMetadata.product || 'axonmd' // Default to axonmd

      if (product === 'axonhis') {
        // Handle AxonHIS organization subscription update
        // No update calls - only send receipt email
        
        const plan = subMetadata.plan || ''
        const region = subMetadata.region || ''
        const interval = (subscription as any)?.items?.data?.[0]?.price?.recurring?.interval
        const intervalCount = (subscription as any)?.items?.data?.[0]?.price?.recurring?.interval_count || 1
        const billingCycle = interval === 'year' ? 'annual' 
          : interval === 'month' && intervalCount === 6 ? 'semi-annual'
          : 'monthly'

        // Get customer email
        let emailId = (invoice?.customer_email || '') as string
        if (!emailId && customerId) {
          try {
            const customer = await stripe.customers.retrieve(customerId)
            emailId = (customer as any)?.email || ''
          } catch {
            // ignore
          }
        }

        // Send receipt email for AxonHIS
        try {
          const invoiceId = invoice?.id
          if (invoiceId && typeof invoiceId === 'string') {
            let invoiceObj = await stripe.invoices.retrieve(invoiceId)
            
            if (invoiceObj.status === 'draft') {
              try {
                const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoiceId)
                if (finalizedInvoice.status === 'open' && finalizedInvoice.amount_due > 0) {
                  await stripe.invoices.pay(invoiceId)
                }
                invoiceObj = await stripe.invoices.retrieve(invoiceId)
              } catch (finalizeError: any) {
                console.log('[receipt-email] Finalization note:', finalizeError?.message)
              }
            }
            
            if (emailId && (invoiceObj.status === 'paid' || (invoiceObj.status === 'open' && invoiceObj.amount_paid === 0))) {
              const planName = plan === 'lite' ? 'Lite' : plan === 'pro' ? 'Pro' : 'Advance'
              await sendReceiptEmail(invoiceObj, emailId, planName, billingCycle, region, 'axonhis')
            }
          }
        } catch (receiptError: any) {
          console.error('[receipt-email] Failed to send receipt email for AxonHIS:', receiptError?.message || receiptError)
        }

        return NextResponse.json({ received: true })
      }

      // Existing AxonMD flow (unchanged)

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
          const trialDaysMeta = (subscription as any)?.metadata?.trial_days
          const trialDays = parseInt(trialDaysMeta || '90', 10)
          
          // Send receipt email if invoice is paid (or open for $0 trial invoices) and we have customer email
          if ((invoiceObj.status === 'paid' || (invoiceObj.status === 'open' && invoiceObj.amount_paid === 0)) && customerEmail) {
            await sendReceiptEmail(invoiceObj, customerEmail, plan, billingCycle, region, 'axonmd', (Number.isFinite(trialDays) && trialDays > 0) ? trialDays : 90)
          }
        }
      } catch (receiptError: any) {
        console.error('[receipt-email] Failed to send receipt email for payment:', receiptError?.message || receiptError)
        // Don't throw - continue with webhook processing
      }

      // Per new flow: do not call external update here; perform update after resume save.
      console.log('[doctor-update] skipped in webhook; handled after resume save')
    } catch (e) {
      console.error('[doctor-update] transform error', e)
    }
  }

  // Handle cancellation schedule/renewal toggles: customer.subscription.updated
  if (event.type === 'customer.subscription.updated') {
    try {
      const sub = (event as any).data?.object as any
      const previous = (event as any).data?.previous_attributes as any

      // Bifurcate by product type
      const subMetadata = sub?.metadata || {}
      const product = subMetadata.product || 'axonmd'

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

      if (product === 'axonhis') {
        // Handle AxonHIS organization subscription updates
        // No update calls - just return success
        return NextResponse.json({ received: true })
      }

      // Existing AxonMD flow (unchanged)
      // Build payload per spec
      const updateUrl = buildExternalUrlFromRequest(request, ExternalApiEndpoints.updateDoctor)
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

      // Bifurcate by product type
      const subMetadata = sub?.metadata || {}
      const product = subMetadata.product || 'axonmd'

      const customerId = typeof sub?.customer === 'string' ? sub.customer : sub?.customer?.id
      let emailId = ''
      if (customerId) {
        try {
          const customer = await stripe.customers.retrieve(customerId)
          emailId = (customer as any)?.email || ''
        } catch {}
      }

      if (product === 'axonhis') {
        // Handle AxonHIS organization subscription deletion
        // No update calls - just return success
        return NextResponse.json({ received: true })
      }

      // Existing AxonMD flow (unchanged)
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
      const updateUrl = buildExternalUrlFromRequest(request, ExternalApiEndpoints.updateDoctor)
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



