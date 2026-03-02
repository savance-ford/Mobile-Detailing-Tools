import AffiliateDisclosure from '@/views/AffiliateDisclosure';

import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/jsonld";

export function generateMetadata() {
  return buildMetadata({
    title: "Affiliate Disclosure",
    description: "Learn how we use affiliate links and how we may earn commissions at no extra cost to you.",
    path: "/affiliate-disclosure",
    type: "website",
  });
}

export default function Page() {
  const path = "/affiliate-disclosure";
  const pageName = "Affiliate Disclosure";
  const description = "Learn how DetailerStack earns commissions and how affiliate links work.";

  return (
    <>
      <JsonLd data={webPageJsonLd({ path, name: pageName, description })} />
      <JsonLd
        data={breadcrumbJsonLd({
          path,
          items: [
            { name: "Home", path: "/" },
            { name: "Affiliate Disclosure", path },
          ],
        })}
      />
      <AffiliateDisclosure />
    </>
  );
}
