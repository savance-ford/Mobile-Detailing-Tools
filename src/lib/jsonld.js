/**
 * jsonld helpers
 *
 * Keep JSON-LD minimal + accurate. Only include fields you actually know.
 */

import { SITE_NAME, SITE_URL, DEFAULT_DESCRIPTION, absoluteUrl } from "@/lib/seo";

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    inLanguage: "en-US",
    publisher: { "@id": ORG_ID },
  };
}

export function webPageJsonLd({ path = "/", name, description }) {
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
}

export function breadcrumbJsonLd({ path = "/", items = [] }) {
  // items: [{ name: 'Home', path: '/' }, ...]
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

function parseUsdPriceMaybe(pricingStartsAt) {
  if (!pricingStartsAt) return null;
  // Avoid percent-based pricing (e.g., payment processing fees).
  if (pricingStartsAt.includes("%")) return null;
  const match = pricingStartsAt.match(/\$\s*([0-9]+(?:\.[0-9]+)?)/);
  if (!match) return null;
  const value = Number(match[1]);
  return Number.isFinite(value) ? value : null;
}

export function softwareApplicationJsonLd(tool) {
  if (!tool) return null;
  const url = absoluteUrl(`/tools/${tool.slug}`);
  const price = parseUsdPriceMaybe(tool.pricing_starts_at);

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.short_description || tool.best_for || "",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url,
    inLanguage: "en-US",
    publisher: { "@id": ORG_ID },
    keywords: (tool.feature_tags || []).join(", ") || undefined,
  };

  if (price !== null) {
    schema.offers = {
      "@type": "Offer",
      price,
      priceCurrency: "USD",
      url,
    };
  }

  // Remove undefined keys for cleaner JSON.
  Object.keys(schema).forEach((k) => schema[k] === undefined && delete schema[k]);
  return schema;
}

export function faqPageJsonLd(faqs = [], path = "/") {
  if (!faqs?.length) return null;
  const url = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: faqs
      .filter((f) => f?.question && f?.answer)
      .map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer,
        },
      })),
  };
}

export function articleJsonLd({
  path = "/",
  headline,
  description,
  section,
}) {
  const url = absoluteUrl(path);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    articleSection: section || undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
    },
    url,
    inLanguage: "en-US",
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };

  Object.keys(schema).forEach((k) => schema[k] === undefined && delete schema[k]);
  return schema;
}

export function itemListJsonLd({ name, path = "/", items = [] }) {
  const url = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${url}#itemlist`,
    name,
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Thing",
        name: it.name,
        url: absoluteUrl(it.path),
      },
    })),
  };
}
