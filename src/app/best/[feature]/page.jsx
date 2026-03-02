import { BEST_FEATURE_PAGES } from "@/lib/bestFeatures";
import { buildMetadata } from "@/lib/seo";
import BestForDetail from '@/views/BestForDetail';
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, itemListJsonLd, webPageJsonLd } from "@/lib/jsonld";
import { tools } from "@/data/mockData";
export function generateMetadata({ params }) {
  const feature = params?.feature;
  const entry = (BEST_FEATURE_PAGES || []).find((fp) => fp.feature === feature);

  const title = entry?.label
    ? `${entry.label} for Mobile Detailers`
    : `Best ${feature || "Tools"} for Mobile Detailers`;

  const description = entry?.label
    ? `Curated picks and comparisons for ${entry.label.toLowerCase()} — built for mobile car detailing businesses.`
    : "Curated picks and comparisons — built for mobile car detailing businesses.";

  return buildMetadata({
    title,
    description,
    path: `/best/${feature || ""}`,
    type: "website",
  });
}

export default function Page({ params }) {
  const feature = params?.feature;
  const entry = (BEST_FEATURE_PAGES || []).find((fp) => fp.feature === feature);
  const label = entry?.label || `Best ${feature || "Tools"}`;

  const path = `/best/${feature}`;
  const pageName = `${label} for Mobile Detailers`;
  const description = `Curated picks and comparisons for ${label.toLowerCase()} — built for mobile car detailing businesses.`;

  const matching = (tools || []).filter((t) => (t.feature_tags || []).includes(feature));

  return (
    <>
      <JsonLd data={webPageJsonLd({ path, name: pageName, description })} />
      <JsonLd
        data={breadcrumbJsonLd({
          path,
          items: [
            { name: "Home", path: "/" },
            { name: "Best", path: "/best" },
            { name: label, path },
          ],
        })}
      />
      {matching.length ? (
        <JsonLd
          data={itemListJsonLd({
            name: `${label} (Picks)`,
            path,
            items: matching.map((t) => ({ name: t.name, path: `/tools/${t.slug}` })),
          })}
        />
      ) : null}
      <BestForDetail featureParam={feature} />
    </>
  );
}
