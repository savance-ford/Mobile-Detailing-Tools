import Guides from '@/views/Guides';

import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, itemListJsonLd, webPageJsonLd } from "@/lib/jsonld";
import { guides } from "@/data/mockData";

export function generateMetadata() {
  return buildMetadata({
    title: "Guides for Mobile Detailing Businesses",
    description:
      "Step-by-step guides on starting, pricing, marketing, and running a mobile car detailing business — plus the software stack to grow.",
    path: "/guides",
    type: "website",
  });
}

export default function Page() {
  const path = "/guides";
  const pageName = "Guides for Mobile Detailers";
  const description = "Step-by-step guides and playbooks for running and growing a mobile detailing business.";

  return (
    <>
      <JsonLd data={webPageJsonLd({ path, name: pageName, description })} />
      <JsonLd
        data={breadcrumbJsonLd({
          path,
          items: [
            { name: "Home", path: "/" },
            { name: "Guides", path },
          ],
        })}
      />
      <JsonLd
        data={itemListJsonLd({
          name: "Guides",
          path,
          items: (guides || []).map((g) => ({ name: g.title, path: `/guides/${g.slug}` })),
        })}
      />
      <Guides />
    </>
  );
}
