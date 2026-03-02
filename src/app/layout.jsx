import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";


import Providers from "./providers";
import SiteShell from "@/components/SiteShell";
import { SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: "DetailerStack — Tools & Software for Mobile Detailing",
    template: "%s | DetailerStack",
  },
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "DetailerStack — Tools & Software for Mobile Detailing",
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary",
    title: "DetailerStack — Tools & Software for Mobile Detailing",
    description: DEFAULT_DESCRIPTION,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>
        {/* Google Tag Manager */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        )}
        {/* Global structured data (site-wide) */}
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />

        <Providers>
          <SiteShell>{children}</SiteShell>
        </Providers>
      </body>

 

    </html>
  );
}
