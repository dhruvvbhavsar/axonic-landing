# Setup Guide for Users Without a Domain

Since you don't have a custom domain yet, here are your options to get subdomain routing working.

## 🎯 **Your Options**

### **Option 1: Test Locally (Quick Start)**
The code has been updated to automatically fallback to path-based routing on localhost.

**What works now:**
- `localhost:3000/our-products` → Main products page with regular links
- `localhost:3000/our-products/axonhis` → AxonHIS product page
- Links work normally without subdomain functionality

**To test:**
```bash
npm run dev
```
Visit `http://localhost:3000/our-products` and click on any product.

### **Option 2: Use AWS Amplify's Default Domain**
When you deploy to AWS Amplify, you get a free domain like:
`yourappname.amplifyapp.com`

You can use this for subdomain testing:
- `axonhis.yourappname.amplifyapp.com`
- `axonmd.yourappname.amplifyapp.com`
- etc.

**To set this up:**
1. Deploy your app to AWS Amplify
2. Note your app's URL (e.g., `abc123.amplifyapp.com`)
3. In DNS settings, add wildcard CNAME: `*.abc123.amplifyapp.com`

### **Option 3: Get a Domain (Recommended for Production)**

## 💰 **Domain Providers & Pricing**

| Provider | Price (per year) | Pros |
|----------|------------------|------|
| **Namecheap** | $10-15 | Cheap, good interface |
| **Cloudflare** | $10 | Fast DNS, good security |
| **AWS Route 53** | $12 | Integrates well with Amplify |
| **GoDaddy** | $12-20 | Popular, lots of features |

### **Recommended: Namecheap + Cloudflare**
1. **Buy domain from Namecheap** (~$12/year)
2. **Use Cloudflare for DNS** (free)
3. **Point to AWS Amplify** 

## 🚀 **Quick Setup with Any Domain**

Once you have a domain:

### 1. **Update Environment**
Create `.env.local`:
```env
NEXT_PUBLIC_BASE_DOMAIN=yourdomain.com
```

### 2. **DNS Configuration**
Add these records in your DNS provider:

```
# Main domain
Type: A
Name: @
Value: [Amplify IP - get from console]

# WWW subdomain  
Type: CNAME
Name: www
Value: yourdomain.com

# Wildcard for products
Type: CNAME 
Name: *
Value: yourdomain.com
```

### 3. **AWS Amplify Setup**
1. Go to Amplify Console → Domain Management
2. Add custom domain: `yourdomain.com`
3. Add environment variable: `NEXT_PUBLIC_BASE_DOMAIN=yourdomain.com`
4. Deploy

## 🧪 **Testing Subdomain Functionality**

### **Method 1: Local Testing with Host File**
Edit your hosts file to simulate subdomains:

**Windows:** `C:\Windows\System32\drivers\etc\hosts`
**Mac/Linux:** `/etc/hosts`

Add:
```
127.0.0.1 axonhis.localhost
127.0.0.1 axonmd.localhost
127.0.0.1 axonlab.localhost
127.0.0.1 axonsurge.localhost
127.0.0.1 axonpharma.localhost
127.0.0.1 axonhealthhub.localhost
127.0.0.1 axoncare.localhost
```

Update `.env.local`:
```env
NEXT_PUBLIC_BASE_DOMAIN=localhost
```

Then test: `http://axonhis.localhost:3000`

### **Method 2: Use a Test Domain**
Services like **nip.io** provide free wildcard DNS:
- `axonhis.192.168.1.100.nip.io` → points to 192.168.1.100
- No setup required!

## 📱 **Current Behavior**

The implementation now automatically detects your environment:

**On localhost:**
- ✅ Products page works normally
- ✅ Links use path-based routing (`/our-products/slug`)
- ✅ Navigation links work from subdomains back to main domain
- ✅ No subdomain functionality, but app works

**With domain:**
- ✅ Products page uses subdomain links
- ✅ Subdomain routing works (`product.domain.com`)
- ✅ Navigation automatically redirects to main domain
- ✅ Full functionality

**On product subdomains (e.g., `axonhis.localhost:3000`):**
- ✅ Shows the product page correctly
- ✅ Navigation links redirect back to main domain
- ✅ Footer links redirect back to main domain
- ✅ Seamless user experience

## 🎉 **Recommendation for You**

**For immediate testing:**
```bash
npm run dev
# Visit http://localhost:3000/our-products
# Everything works normally!
```

**For production in the future:**
1. **Buy a domain** ($10-15/year from Namecheap)
2. **Use Cloudflare DNS** (free)
3. **Deploy to AWS Amplify** 
4. **Set up wildcard DNS**

## 💡 **Why This Setup is Great**

1. **Works immediately** - No domain needed for development
2. **Scales easily** - Just add domain when ready
3. **No code changes** - Same codebase works for both scenarios
4. **Production ready** - Subdomain routing activates automatically
5. **Smart navigation** - Automatically handles subdomain to main domain navigation

## 🔧 **Latest Updates**

**All Issues Fixed** (Latest):
- ✅ Navigation links now work correctly from product subdomains
- ✅ When on `axonhis.localhost:3000`, clicking "Careers" goes to `localhost:3000/careers`
- ✅ Footer links also redirect properly
- ✅ Hydration errors completely resolved
- ✅ Server/client component issues fixed
- ✅ Seamless user experience across main domain and subdomains

**Files Updated:**
- `components/navigation.tsx` - Smart navigation for subdomain routing
- `components/footer.tsx` - Footer links with subdomain support
- `components/back-to-products-button.tsx` - Separate client component (NEW)
- `components/not-found-navigation.tsx` - Separate client component (NEW)
- `middleware.ts` - Subdomain detection and routing
- `lib/utils.ts` - Helper functions for URL generation
- `app/our-products/[slug]/page.tsx` - Fixed server component issues
- `app/our-products/[slug]/not-found.tsx` - Fixed server component issues

---

**Bottom line:** Your app works perfectly right now for testing. Get a domain when you're ready to go live! 🚀 