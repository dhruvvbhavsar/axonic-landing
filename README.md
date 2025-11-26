# Axonic Landing

Axonic Healthcare landing page built with Next.js.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## External API Base Switcher (Development Only)

The application includes a runtime API base switcher that allows developers to switch between different external API endpoints without redeploying the application. This feature is only available in development and local environments.

### Environment Variables

The switcher visibility is controlled by the `NEXT_PUBLIC_RUNTIME_ENV` environment variable:

- `NEXT_PUBLIC_RUNTIME_ENV=dev` - Enables the switcher and allows switching between QA and PP endpoints
- `NEXT_PUBLIC_RUNTIME_ENV=local` - Enables the switcher and allows switching between QA and PP endpoints
- Any other value or unset - Switcher is hidden and all requests use the production endpoint (`https://axonmd.axonichealth.co.in`)

### Available API Bases

The switcher allows switching between five external API endpoints (in dev/local only):

1. **OCIPMS QA**: `https://ocipmsqa.axonichealth.com` - QA/testing endpoint
2. **OCICliniq PP**: `https://ocicliniqpp.cliniq.in` - Pre-production endpoint
3. **Staging**: `https://pmstest.axonichealth.co.in` - Staging environment
4. **Hotfix**: `https://ocipmsqahf.axonichealth.com` - Hotfix environment

Production always uses: **`https://axonmd.axonichealth.co.in`** (not accessible via switcher)

### How It Works

1. In development/local environments, a floating button appears in the bottom-right corner of the page.
2. Clicking the button opens a dropdown to select the desired API base.
3. The selection is stored in `localStorage` and persists across page reloads.
4. All API requests from the client include an `x-external-api` header with the selected alias.
5. Server-side API routes read this header and route requests to the corresponding external API base.
6. In production (when `NEXT_PUBLIC_RUNTIME_ENV` is not set to `dev` or `local`), the switcher is hidden and all requests automatically use the AxonMD production endpoint.

### Usage

To enable the switcher in a production build for testing:

```bash
NEXT_PUBLIC_RUNTIME_ENV=dev npm run build
NEXT_PUBLIC_RUNTIME_ENV=dev npm start
```

The switcher will appear and allow runtime switching between API bases without redeployment.
