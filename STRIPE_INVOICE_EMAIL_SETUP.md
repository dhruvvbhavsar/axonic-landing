# Stripe Invoice Email Setup for AxonMD

This guide explains how to configure Stripe to automatically send invoice emails to customers after payment (including during the trial period).

## What's Been Implemented

The code has been updated to enable invoice creation during checkout:
- `invoice_creation.enabled = true` in the checkout session
- Custom invoice descriptions and metadata for better tracking
- Professional footer with support contact information

## Stripe Dashboard Configuration

To enable automatic invoice emails, you need to configure settings in your Stripe Dashboard:

### 1. Enable Customer Emails for Invoices

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Navigate to **Settings** → **Billing** → **Customer emails**
3. Enable the following email notifications:
   - ✅ **Successful payments** - Send receipt when payment succeeds
   - ✅ **Failed payments** - Notify customer of failed payment attempts
   - ✅ **Upcoming invoice** - Remind customers before renewal (optional)
   - ✅ **Subscription changes** - Notify on plan changes (optional)

### 2. Customize Invoice Email Template (Optional)

1. Go to **Settings** → **Emails** → **Successful payment**
2. Customize the email template:
   - Add your logo
   - Customize the message
   - Add custom colors matching your brand
   - Preview the email before saving

### 3. Configure Invoice Settings

1. Go to **Settings** → **Billing** → **Invoices**
2. Configure:
   - **Invoice numbering** - Set your preferred format
   - **Invoice memo** - Add default notes for all invoices
   - **Statement descriptor** - What appears on customer's bank statement (e.g., "AXONMD SUBSCRIPTION")
   - **Email invoices** - Ensure "Automatically email invoices" is enabled

### 4. Set Company Information

1. Go to **Settings** → **Public business information**
2. Fill in:
   - Business name: **Axonic Health**
   - Support email: **support@axonichealth.com**
   - Business address (required for invoices)
   - Phone number (optional)

## How It Works

### For Trial Signups (Day 0)
1. User completes checkout for 90-day free trial
2. Stripe creates a $0 invoice for the trial
3. Customer receives invoice email with:
   - Trial confirmation
   - Plan details (Professional/Advanced)
   - Next billing date (90 days from signup)
   - Invoice PDF attachment

### For Recurring Payments (After Trial)
1. Stripe automatically charges customer after trial ends
2. `invoice.payment_succeeded` webhook fires
3. Customer receives invoice email with:
   - Payment receipt
   - Billing period details
   - Invoice PDF attachment
   - Next billing date

## Testing Invoice Emails

### Using Stripe Test Mode

1. Switch to **Test mode** in Stripe Dashboard
2. Create a test checkout session using your staging URL
3. Use Stripe test card: `4242 4242 4242 4242`
4. Complete checkout
5. Check the email address used during checkout for the invoice

### Testing Webhooks Locally

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login to your Stripe account
stripe login

# Forward webhooks to your local server
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Test the checkout flow
npm run dev
# Navigate to http://localhost:3000/our-products/axonmd
```

## Verification Checklist

After deployment, verify:

- [ ] Customers receive invoice email immediately after trial signup
- [ ] Invoice includes correct plan (Professional/Advanced)
- [ ] Invoice shows $0 for trial period
- [ ] Invoice displays next billing date (90 days from signup)
- [ ] Customers receive invoice email after recurring payment
- [ ] Invoice PDFs are properly formatted with company info
- [ ] Email "From" address is correct
- [ ] Support contact information is visible

## Webhook Events

The following webhook events are handled for invoice management:

1. **checkout.session.completed**
   - Creates initial trial invoice
   - Invoice automatically emailed by Stripe

2. **invoice.payment_succeeded**
   - Triggered for recurring payments after trial
   - Invoice automatically emailed by Stripe
   - Updates subscription dates in your backend

3. **invoice.payment_failed**
   - Customer notified of failed payment
   - Retry logic handled by Stripe

## Troubleshooting

### Customers not receiving invoice emails

1. Check Stripe Dashboard → **Settings** → **Billing** → **Customer emails**
   - Ensure "Successful payments" is enabled
   
2. Check email in Stripe Dashboard → **Payments** → Select payment → View invoice
   - Click "Send invoice" to manually resend

3. Verify customer email in webhook logs:
   ```
   checkout.session.completed → customer_details.email
   ```

### Invoice shows incorrect information

1. Check metadata in checkout session (app/api/checkout/route.ts)
2. Verify invoice_data description and footer
3. Update company information in Stripe Dashboard settings

### $0 Invoice for Trial Period

This is **expected behavior**. Stripe creates a $0 invoice for trial subscriptions to:
- Confirm the subscription was created
- Show the trial period
- Display when the first payment will be charged

## Environment Variables

Ensure these are set in your production environment:

```bash
# Required for invoice functionality
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Used by webhook for backend integration
# (already configured in your external-api.ts)
```

## Additional Resources

- [Stripe Invoices Documentation](https://stripe.com/docs/invoicing)
- [Stripe Email Customization](https://stripe.com/docs/receipts)
- [Stripe Webhooks Guide](https://stripe.com/docs/webhooks)
- [Testing Stripe](https://stripe.com/docs/testing)

## Support

For questions about invoice configuration, contact:
- Technical Support: dhruv.bhavsar@axonichealth.com
- Stripe Support: https://support.stripe.com/

---

**Last Updated:** November 3, 2025

