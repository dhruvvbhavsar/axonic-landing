import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import GaTracker from "@/components/ga-tracker";
import { GA_MEASUREMENT_ID } from "@/lib/gtag";
import { ExternalApiProvider, ExternalApiSwitcher } from "@/components/external-api-switcher";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Axonic Health - AI-Powered Healthcare Solutions",
  description: "Transform healthcare with Axonic's AI-powered solutions including AxonScribe medical scribe, AxonMD diagnostic AI, and comprehensive healthcare management platforms. HIPAA compliant, 95% accuracy.",
  keywords: [
    'healthcare AI',
    'medical AI',
    'AI medical scribe',
    'healthcare technology',
    'medical software',
    'clinical documentation',
    'healthcare automation',
    'Axonic Health'
  ],
  authors: [{ name: 'Axonic Health' }],
  creator: 'Axonic Health',
  publisher: 'Axonic Health',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://axonichealth.com',
    title: 'Axonic Health - AI-Powered Healthcare Solutions',
    description: 'Transform healthcare with AI-powered solutions for medical documentation, diagnostics, and healthcare management.',
    siteName: 'Axonic Health',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Axonic Health - AI-Powered Healthcare Solutions',
    description: 'Transform healthcare with AI-powered solutions for medical documentation, diagnostics, and healthcare management.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ExternalApiProvider>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-gtag-init" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `}
          </Script>
          <Navigation />
          <Suspense fallback={null}>
            <GaTracker />
          </Suspense>
          <main>
            {children}
          </main>
          <Footer />
          <ExternalApiSwitcher />
        </ExternalApiProvider>
      </body>
    </html>
  );
}
