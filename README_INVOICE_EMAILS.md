# 📧 Invoice Email Setup - Quick Start

## What This Does

After a customer signs up for AxonMD (even during the free trial), they'll automatically receive:
- ✅ Invoice email from Stripe
- ✅ PDF invoice attachment
- ✅ Trial confirmation details
- ✅ Next billing date information

## 🎯 Your To-Do (15 minutes)

### Step 1: Go to Stripe Dashboard
https://dashboard.stripe.com/settings/billing/automatic

**Toggle ON**: "Automatically send receipts to customers"

### Step 2: Add Your Company Info
https://dashboard.stripe.com/settings/public

**Fill in**:
- Business name: `Axonic Health`
- Support email: `support@axonichealth.com`
- Business address (required for invoices)

### Step 3: Upload Your Logo (Optional but Recommended)
https://dashboard.stripe.com/settings/branding

**Upload**: Company logo (512x512px PNG)

### Step 4: Test It
1. Switch to "Test mode" in Stripe
2. Complete a test signup at `/our-products/axonmd`
3. Use test card: `4242 4242 4242 4242`
4. Check email for invoice

## ✅ Done!

That's it! Stripe will now automatically send invoice emails for:
- Trial signups ($0 invoice)
- Recurring payments (paid invoices)
- Refunds (if any)

## 📚 Detailed Guides

Need more info? Check these files:

1. **STRIPE_QUICK_SETUP.md** - 15-minute setup guide
2. **STRIPE_DASHBOARD_SETTINGS.md** - Detailed configuration
3. **INVOICE_EMAIL_IMPLEMENTATION_SUMMARY.md** - Complete overview

## 🐛 Issues?

**Email not received?**
→ Check spam folder, verify email in Stripe Dashboard

**Wrong invoice info?**
→ Update Settings → Public business information

**Need to resend?**
→ Stripe Dashboard → Invoices → Find invoice → "Send invoice"

---

**Status**: Ready to configure (code is already deployed) ✅

