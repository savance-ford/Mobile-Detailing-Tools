import BestFor from '@/views/BestFor';

import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, itemListJsonLd, webPageJsonLd } from "@/lib/jsonld";
import { BEST_FEATURE_PAGES } from "@/lib/bestFeatures";

export function generateMetadata() {
  return buildMetadata({
    title: "Best Tools by Feature for Mobile Detailers",
    description:
      "Find the best software or tool for your needs: scheduling, CRM, invoicing, payments, marketing, automation, and equipment.",
    path: "/best",
    type: "website",
  });
}

export default function Page() {
  const path = "/best";
  const pageName = "Best Tools by Feature for Mobile Detailers";
  const description =
    "Find the best software or tool for your needs: scheduling, CRM, invoicing, payments, marketing, automation, and equipment.";

  return (
    <>
      <JsonLd data={webPageJsonLd({ path, name: pageName, description })} />
      <JsonLd
        data={breadcrumbJsonLd({
          path,
          items: [
            { name: "Home", path: "/" },
            { name: "Best", path },
          ],
        })}
      />
      <JsonLd
        data={itemListJsonLd({
          name: "Best-by-Feature Pages",
          path,
          items: (BEST_FEATURE_PAGES || []).map((f) => ({ name: f.label, path: `/best/${f.feature}` })),
        })}
      />
      <BestFor />
    </>
  );
}
