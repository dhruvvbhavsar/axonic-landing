# Stripe Invoice Email - Quick Setup Guide

## 🎯 Quick Action Items

### Step 1: Enable Invoice Emails (2 minutes)
1. Go to https://dashboard.stripe.com/settings/billing/automatic
2. Toggle ON: **"Automatically send receipts to customers"**
3. Save changes

### Step 2: Configure Email Settings (3 minutes)
1. Go to https://dashboard.stripe.com/settings/emails
2. Enable these notifications:
   - ✅ Successful payments
   - ✅ Failed payments  
   - ✅ Subscription changes (recommended)
3. Save changes

### Step 3: Add Company Info (5 minutes)
1. Go to https://dashboard.stripe.com/settings/public
2. Fill in:
   - Business name: **Axonic Health**
   - Support email: **support@axonichealth.com**
   - Business address (full address required)
   - Tax ID (if applicable)
3. Save changes

### Step 4: Customize Invoice Appearance (Optional, 5 minutes)
1. Go to https://dashboard.stripe.com/settings/branding
2. Upload your logo
3. Choose brand colors
4. Preview invoice
5. Save changes

## ✅ Verification

After setup, test the flow:

1. **Test Mode**: Use test card `4242 4242 4242 4242`
2. Complete a trial signup at `/our-products/axonmd`
3. Check email inbox for invoice
4. Verify invoice contains:
   - ✅ Company name and logo
   - ✅ $0 amount (for trial)
   - ✅ Trial period details
   - ✅ Next billing date (90 days out)
   - ✅ PDF attachment

## 🔧 Code Changes Made

The following was added to `app/api/checkout/route.ts`:

```typescript
invoice_creation: {
  enabled: true,
  invoice_data: {
    description: `AxonMD ${plan} Plan - 90 Day Free Trial`,
    metadata: {
      doctor_name: `${firstName} ${lastName}`,
      plan,
      billingCycle,
      region,
    },
    footer: 'Thank you for choosing AxonMD. For support, contact us at support@axonichealth.com',
  },
}
```

## 📧 What Customers Receive

### Trial Signup Email
- **Subject**: "Receipt from Axonic Health [Stripe]"
- **Contains**: 
  - Invoice for $0 (trial confirmation)
  - AxonMD Professional/Advanced Plan details
  - Trial period: 90 days
  - Next charge date
  - PDF invoice attachment

### Recurring Payment Email
- **Subject**: "Receipt from Axonic Health [Stripe]"
- **Contains**:
  - Payment receipt
  - Amount charged (£100/₹2000 or £125/₹2500)
  - Billing period
  - Next charge date
  - PDF invoice attachment

## 🚀 Deploy Checklist

Before going live:

- [ ] Test in Stripe test mode
- [ ] Verify email delivery to spam folder
- [ ] Check invoice PDF formatting
- [ ] Confirm company details are correct
- [ ] Test both trial and paid invoices
- [ ] Switch to live mode
- [ ] Update webhook endpoints for production
- [ ] Monitor first few customer invoices

## 📞 Support

If customers don't receive invoices:
1. Check Stripe Dashboard → Payments → Find payment → "Send receipt"
2. Verify email in customer details
3. Check spam folder
4. Manually resend from Stripe Dashboard

---

**Setup Time**: ~15 minutes total
**Status**: Ready to deploy ✅

