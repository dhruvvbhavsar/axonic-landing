# Subdomain Setup Guide for Product Pages

This guide will help you configure subdomain-based routing for your product pages on AWS Amplify.

## 🚀 What's Been Implemented

The codebase has been updated to support subdomain routing for products:

### Products that will have subdomains:
- `axonhis.yourdomain.com` → AxonHIS
- `axonmd.yourdomain.com` → AxonMD
- `axonlab.yourdomain.com` → AxonLab
- `axonsurge.yourdomain.com` → AxonSurge
- `axonpharma.yourdomain.com` → AxonPharma
- `axonhealthhub.yourdomain.com` → AxonHealthHub
- `axoncare.yourdomain.com` → AxonCare

## 📁 Files Modified

1. **`middleware.ts`** - New file that handles subdomain detection and routing
2. **`lib/utils.ts`** - Added utility functions for subdomain URL generation
3. **`app/our-products/page.tsx`** - Updated product links to use subdomains
4. **`app/our-products/[slug]/page.tsx`** - Updated navigation links
5. **`app/our-products/[slug]/not-found.tsx`** - Updated error page links

## ⚙️ Environment Setup

### 1. Next.js Configuration Update

**IMPORTANT:** The `output: 'export'` setting has been removed from `next.config.ts` because middleware requires server-side functionality. This means your app will now run as a full Next.js application instead of a static export.

### 2. Create Environment Variables

Create a `.env.local` file in your project root:

```env
# Replace 'yourdomain.com' with your actual domain
NEXT_PUBLIC_BASE_DOMAIN=yourdomain.com
```

**Important:** Replace `yourdomain.com` with your actual domain name.

## 🌐 AWS Amplify Configuration

### 1. Domain Configuration

1. **Go to AWS Amplify Console**
   - Navigate to your app
   - Go to "Domain management" in the left sidebar

2. **Add your custom domain**
   - Click "Add domain"
   - Enter your domain (e.g., `yourdomain.com`)
   - Follow the verification process

3. **Configure DNS Records**
   
   In your DNS provider (e.g., Route 53, Cloudflare, GoDaddy), add these records:

   ```
   # Main domain
   Type: CNAME
   Name: www
   Value: [your-amplify-domain].amplifyapp.com

   # Wildcard subdomain for products
   Type: CNAME
   Name: *
   Value: [your-amplify-domain].amplifyapp.com

   # Root domain (A record - get IP from Amplify)
   Type: A
   Name: @
   Value: [Amplify-provided-IP]
   ```

### 2. Amplify App Configuration

**Note:** Since we removed `output: 'export'`, your app will now deploy as a full Next.js application with SSR support, which is required for middleware to work.

Add these environment variables in Amplify Console:

1. Go to "Environment variables" in your app settings
2. Add:
   ```
   NEXT_PUBLIC_BASE_DOMAIN = yourdomain.com
   ```

### 3. Build Settings

Ensure your `amplify.yml` includes proper build configuration:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

## 🔄 How It Works

1. **Middleware Detection**: When someone visits `axonhis.yourdomain.com`, the middleware detects the subdomain
2. **Internal Rewrite**: The request is internally rewritten to `/our-products/axonhis`
3. **Content Serving**: The product page is served as if it's on the subdomain
4. **Navigation**: Links are updated to maintain proper subdomain navigation

## 🧪 Testing

### Local Development

1. **Add local domain mappings** (optional for testing):
   ```bash
   # Edit /etc/hosts (macOS/Linux) or C:\Windows\System32\drivers\etc\hosts (Windows)
   127.0.0.1 axonhis.localhost
   127.0.0.1 axonmd.localhost
   127.0.0.1 axonlab.localhost
   # ... add all product subdomains
   ```

2. **Update environment variable**:
   ```env
   NEXT_PUBLIC_BASE_DOMAIN=localhost:3000
   ```

3. **Test locally**:
   ```bash
   npm run dev
   # Visit http://axonhis.localhost:3000
   ```

### Production Testing

1. Wait for DNS propagation (up to 48 hours)
2. Test each product subdomain:
   - `https://axonhis.yourdomain.com`
   - `https://axonmd.yourdomain.com`
   - etc.

## 🚨 Important Notes

1. **DNS Propagation**: Changes may take up to 48 hours to propagate globally
2. **SSL Certificates**: Amplify will automatically provision SSL certificates for subdomains
3. **Wildcard Support**: The `*` CNAME record enables all product subdomains
4. **SEO Considerations**: Each subdomain will be treated as a separate site by search engines

## 🐛 Troubleshooting

### Common Issues:

1. **"Middleware cannot be used with output: export" error**:
   - Make sure `output: 'export'` is removed from `next.config.ts`
   - The app must run as a full Next.js application, not a static export

2. **Subdomain not working**:
   - Check DNS records are correctly set
   - Verify environment variables in Amplify
   - Ensure DNS propagation is complete
   - Confirm Amplify is deploying as Next.js SSR (not static)

3. **SSL Certificate issues**:
   - Amplify should auto-provision certificates
   - May take a few minutes after DNS verification

4. **Middleware not triggering**:
   - Verify `middleware.ts` is in the project root
   - Check the matcher configuration
   - Ensure the app is deployed with SSR support

5. **Links not working**:
   - Ensure `NEXT_PUBLIC_BASE_DOMAIN` is set correctly
   - Check the utility functions are imported properly

## 📞 Support

If you encounter issues:
1. Check AWS Amplify logs in the console
2. Verify DNS settings with your provider
3. Test middleware functionality locally first

---

**Next Steps**: 
1. Set up your domain in AWS Amplify
2. Configure DNS records
3. Update environment variables
4. Deploy and test! 