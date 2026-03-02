import Home from '@/views/Home';

import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { webPageJsonLd } from "@/lib/jsonld";

export function generateMetadata() {
  return buildMetadata({
    title: "DetailerStack — Tools & Software for Mobile Detailing",
    description:
      "Compare software, tools, and equipment for mobile car detailing businesses. Reviews, best-for guides, and head-to-head comparisons.",
    path: "/",
    type: "website",
  });
}

export default function Page() {
  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          path: "/",
          name: "DetailerStack — Tools & Software for Mobile Detailing",
          description:
            "Compare software, tools, and equipment for mobile car detailing businesses. Reviews, best-for guides, and head-to-head comparisons.",
        })}
      />
      <Home />
    </>
  );
}
