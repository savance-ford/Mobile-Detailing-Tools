import VSIndex from '@/views/VSIndex';

import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, itemListJsonLd, webPageJsonLd } from "@/lib/jsonld";
import { tools } from "@/data/mockData";

export function generateMetadata() {
  return buildMetadata({
    title: "Head-to-Head Comparisons for Mobile Detailing Tools",
    description:
      "Side-by-side comparisons of the top software and tools for mobile detailing businesses. Pricing, features, pros/cons, and best use-cases.",
    path: "/vs",
    type: "website",
  });
}

export default function Page() {
  const path = "/vs";
  const pageName = "Head-to-Head Comparisons for Mobile Detailing Tools";
  const description =
    "Side-by-side comparisons of the top software and tools for mobile detailing businesses. Pricing, features, pros/cons, and best use-cases.";

  // Generate a reasonable number of comparison URLs for JSON-LD (keep payload small).
  const pairs = [];
  for (let i = 0; i < (tools || []).length; i++) {
    for (let j = i + 1; j < (tools || []).length; j++) {
      const a = tools[i];
      const b = tools[j];
      const sharedTags = (a.feature_tags || []).filter((t) => (b.feature_tags || []).includes(t));
      if (sharedTags.length > 0 || a.category_slug === b.category_slug) {
        pairs.push({
          name: `${a.name} vs ${b.name}`,
          path: `/vs/${a.slug}-vs-${b.slug}`,
        });
      }
      if (pairs.length >= 50) break;
    }
    if (pairs.length >= 50) break;
  }

  return (
    <>
      <JsonLd data={webPageJsonLd({ path, name: pageName, description })} />
      <JsonLd
        data={breadcrumbJsonLd({
          path,
          items: [
            { name: "Home", path: "/" },
            { name: "VS", path },
          ],
        })}
      />
      {pairs.length ? <JsonLd data={itemListJsonLd({ name: "VS Comparisons", path, items: pairs })} /> : null}
      <VSIndex />
    </>
  );
}
