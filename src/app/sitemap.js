import { SITE_URL } from "@/lib/seo";
import { categories, tools, guides } from "@/data/mockData";
import { BEST_FEATURE_PAGES } from "@/lib/bestFeatures";

/**
 * Next.js Metadata Route: /sitemap.xml
 * Docs: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default function sitemap() {
  const now = new Date();

  const staticRoutes = [
    "/",
    "/tools",
    "/categories",
    "/guides",
    "/best",
    "/vs",
    "/affiliate-disclosure",
    "/privacy",
    "/terms",
  ];

  // Tools
  const toolRoutes = (tools || []).map((t) => `/tools/${t.slug}`);

  // Categories
  const categoryRoutes = (categories || []).map((c) => `/categories/${c.slug}`);

  // Guides
  const guideRoutes = (guides || []).map((g) => `/guides/${g.slug}`);

  // Best-by-feature
  const bestRoutes = (BEST_FEATURE_PAGES || []).map((fp) => `/best/${fp.feature}`);

  // VS pairs (same logic as VSIndex: only meaningful comparisons)
  const vsRoutes = [];
  const list = tools || [];
  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      const a = list[i];
      const b = list[j];
      const sharedTags = (a.feature_tags || []).filter((t) => (b.feature_tags || []).includes(t));
      if (sharedTags.length > 0 || a.category_slug === b.category_slug) {
        vsRoutes.push(`/vs/${a.slug}-vs-${b.slug}`);
      }
    }
  }

  const allRoutes = [
    ...staticRoutes,
    ...toolRoutes,
    ...categoryRoutes,
    ...guideRoutes,
    ...bestRoutes,
    ...vsRoutes,
  ];

  // Deduplicate
  const unique = Array.from(new Set(allRoutes));

  return unique.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
