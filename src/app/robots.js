import { SITE_URL } from "@/lib/seo";

/**
 * Next.js Metadata Route: /robots.txt
 * Docs: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
