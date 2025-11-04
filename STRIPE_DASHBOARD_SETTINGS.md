# Stripe Dashboard Settings Configuration

## 📍 Exact Dashboard URLs & Settings

### 1. Customer Email Settings

**URL**: https://dashboard.stripe.com/settings/billing/automatic

**Settings to Enable**:

```
☑️ Automatically send receipts to customers
☑️ Send receipts for successful payments
☑️ Send receipts for refunds
☑️ Email customers about failed payments
```

**Additional Options** (Recommended):

```
☑️ Send upcoming invoice email (7 days before renewal)
☑️ Email customers about subscription changes
```

---

### 2. Email Notifications

**URL**: https://dashboard.stripe.com/settings/emails

**Customer Emails Section**:

```
Email Type                     | Status | Send When
-------------------------------|--------|------------------------------------------
Successful payments           | ✅ ON  | Immediately after payment succeeds
Failed payments               | ✅ ON  | Immediately after payment fails
Refund issued                 | ✅ ON  | When refund is processed
Upcoming invoice              | ⚪ OFF | 7 days before renewal (optional)
Subscription canceled         | ⚪ OFF | When subscription is canceled (optional)
Trial ending reminder         | ✅ ON  | 3 days before trial ends (recommended)
```

**Email Customization**:

- Click "Customize" on any email type
- Add custom message (optional)
- Preview email before saving

---

### 3. Invoice Settings

**URL**: https://dashboard.stripe.com/settings/billing/invoice

**Invoice Configuration**:

```
Setting                        | Value
-------------------------------|------------------------------------------
Invoice numbering              | Automatic (INV-0001, INV-0002, etc.)
Statement descriptor           | AXONMD SUBSCRIPTION
Default payment terms          | Due on receipt
Automatic email invoices       | ✅ ON
Days until due                 | 0 (immediate)
```

**Invoice Footer** (Optional):

```
Thank you for your business!
For support, contact us at support@axonichealth.com
Visit: https://axonmd.axonichealth.com
```

---

### 4. Public Business Information

**URL**: https://dashboard.stripe.com/settings/public

**Required Information**:

```
Business name:         Axonic Health
Support email:         support@axonichealth.com
Support phone:         [Your support phone number]

Business address:
  Line 1:             [Your street address]
  Line 2:             [Suite/Unit number if applicable]
  City:               [Your city]
  State/Province:     [Your state]
  Postal code:        [Your postal code]
  Country:            [United Kingdom or India]

Tax information:
  VAT/Tax ID:         [If applicable]
```

**Optional But Recommended**:

```
Website:              https://axonichealth.com
Privacy policy URL:   https://axonichealth.com/privacy-policy
Terms of service URL: https://axonichealth.com/terms-conditions
```

---

### 5. Branding (Invoice Appearance)

**URL**: https://dashboard.stripe.com/settings/branding

**Brand Assets**:

```
Logo:                 Upload Axonic Health logo (recommended: 512x512px PNG)
Icon:                 Upload favicon (128x128px PNG)
Brand color:          #3B82F6 (Blue - your primary color)
Accent color:         #1E40AF (Darker blue)
```

**Invoice Appearance**:

- Preview how invoices will look to customers
- Ensure logo and colors match your brand
- Check both light and dark mode appearance

---

### 6. Subscription Settings

**URL**: https://dashboard.stripe.com/settings/billing/automatic

**Trial Period Handling**:

```
☑️ Create invoices for trials
☑️ Email trial confirmation receipts
☑️ Send trial ending reminders (3 days before)
```

**Payment Collection**:

```
Collection method:     Charge automatically
Failed payment retry:  Smart retries (Stripe default)
Max retries:          4 attempts over 2 weeks
```

---

### 7. Webhook Configuration

**URL**: https://dashboard.stripe.com/webhooks

**Webhook Endpoint** (Already configured):

```
Production: https://axonichealth.com/api/stripe/webhook
Test:       https://your-staging-url/api/stripe/webhook
```

**Events to Listen For** (Already handled in code):

```
✅ checkout.session.completed
✅ invoice.payment_succeeded
✅ invoice.payment_failed
✅ customer.subscription.updated
✅ customer.subscription.deleted
```

---

## 🎨 Email Template Customization (Optional)

### Successful Payment Email Template

**Subject Line** (Default):

```
Receipt from Axonic Health [#{{INVOICE_NUMBER}}]
```

**Custom Message** (Add above invoice):

```
Thank you for choosing AxonMD!

Your payment has been processed successfully. You can access your clinic 
management dashboard at: https://axonmd.axonichealth.com

If you have any questions, our support team is here to help.

Best regards,
The Axonic Health Team
```

**Footer** (Add below invoice):

```
Need help? Contact us at support@axonichealth.com
Visit our help center: https://axonichealth.com/contact-us

Axonic Health | Transforming Healthcare with AI
```

---

## 📱 Mobile-Optimized Invoice

Ensure invoices look good on mobile by:

1. Go to https://dashboard.stripe.com/settings/branding
2. Click "Preview invoice"
3. Test mobile view (375px width)
4. Adjust logo size if needed
5. Verify all text is readable

---

## 🧪 Testing Checklist

### Test Mode (Before Production)

1. Switch to "Test mode" toggle in Stripe Dashboard
2. Create test subscription using card: `4242 4242 4242 4242`
3. Complete checkout at `/our-products/axonmd`
4. **Check test email** for invoice within 2 minutes
5. Verify invoice contains:
   - ✅ Axonic Health branding
   - ✅ $0.00 amount for trial
   - ✅ "90 Day Free Trial" description
   - ✅ Next billing date (90 days from now)
   - ✅ Support contact information
   - ✅ PDF attachment

### Live Mode (After Production)

1. Switch to "Live mode" in Stripe Dashboard
2. Monitor first few customer signups
3. Verify invoice emails are sent
4. Check spam folder for test accounts
5. Confirm PDF attachments work

---

## 🔍 Monitoring Invoice Delivery

### Check Recent Invoices

1. Go to https://dashboard.stripe.com/invoices
2. Filter by "Date" (last 7 days)
3. For each invoice, verify:
   - Status: "Paid" or "Open"
   - Email sent: ✅ checkmark visible
   - Customer email: Correct email address

### Resend Invoice Manually

If customer didn't receive invoice:

1. Go to https://dashboard.stripe.com/invoices
2. Find the invoice by customer email or invoice number
3. Click on the invoice
4. Click "Send invoice" button
5. Confirm resend

### View Email Logs

1. Go to https://dashboard.stripe.com/logs
2. Filter by "email.sent" events
3. Check delivery status and errors

---

## 📊 Sample Invoice Preview

### Trial Signup Invoice ($0)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INVOICE #INV-0001
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

From:
Axonic Health
[Your Business Address]
support@axonichealth.com

To:
Dr. [Customer Name]
[Customer Email]

Date: November 3, 2025
Due: Due on receipt
Status: PAID

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Description                        Amount
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

AxonMD Professional Plan          £0.00
90 Day Free Trial
Starting: Nov 3, 2025
Trial ends: Feb 1, 2026

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Subtotal:                         £0.00
Total:                            £0.00
Amount Paid:                      £0.00
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Next Charge: £100.00 on Feb 1, 2026

Thank you for choosing AxonMD!
For support, contact us at support@axonichealth.com
```

### Recurring Payment Invoice (After Trial)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INVOICE #INV-0052
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

From:
Axonic Health
[Your Business Address]
support@axonichealth.com

To:
Dr. [Customer Name]
[Customer Email]

Date: February 1, 2026
Due: Due on receipt
Status: PAID

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Description                        Amount
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

AxonMD Professional Plan          £100.00
Billing period:
Feb 1, 2026 - Mar 1, 2026

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Subtotal:                         £100.00
Total:                            £100.00
Amount Paid:                      £100.00
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Payment method: •••• 4242 (Visa)
Next Charge: £100.00 on Mar 1, 2026

Thank you for choosing AxonMD!
For support, contact us at support@axonichealth.com
```

---

## 🎯 Action Summary

**Do these NOW** (15 minutes):

1. ✅ Enable automatic invoice emails
2. ✅ Configure email notifications4
3. ✅ Add company information
4. ✅ Upload logo and set brand colors
5. ✅ Test with test card in test mode

**Optional** (Later):

- Customize email templates
- Add custom invoice footer
- Set up invoice reminders
- Configure dunning emails

---

**Last Updated**: November 3, 2025
**Status**: Ready for production deployment ✅
