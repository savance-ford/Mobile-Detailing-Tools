/**
 * SEO helpers
 *
 * - NEXT_PUBLIC_SITE_URL should be set in production (e.g. https://yourdomain.com)
 * - We default to localhost for dev.
 */
export const SITE_NAME = "DetailerStack";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const DEFAULT_DESCRIPTION =
  "Compare software, tools, and equipment for mobile car detailing businesses. Reviews, best-for guides, and head-to-head comparisons.";

/** Convert a relative path (e.g. /tools/jobber) into an absolute URL. */
export function absoluteUrl(path = "/") {
  try {
    return new URL(path, SITE_URL).toString();
  } catch {
    return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  }
}

/**
 * buildMetadata
 * Returns a Next.js metadata object with sensible defaults.
 */
export function buildMetadata({ title, description, path = "/", type = "website" }) {
  const finalTitle = title || `${SITE_NAME}`;
  const finalDescription = description || DEFAULT_DESCRIPTION;
  const canonical = path.startsWith("/") ? path : `/${path}`;

  return {
    title: finalTitle,
    description: finalDescription,
    alternates: { canonical },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: absoluteUrl(canonical),
      siteName: SITE_NAME,
      type,
    },
    twitter: {
      card: "summary",
      title: finalTitle,
      description: finalDescription,
    },
  };
}
