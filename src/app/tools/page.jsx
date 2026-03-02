import Compare from '@/views/Compare';

import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, itemListJsonLd, webPageJsonLd } from "@/lib/jsonld";
import { tools } from "@/data/mockData";

export function generateMetadata() {
  return buildMetadata({
    title: "All Tools & Software for Mobile Detailing",
    description:
      "Browse our complete directory of software, tools, and equipment for mobile car detailing businesses. Filter by feature to find exactly what you need.",
    path: "/tools",
    type: "website",
  });
}

export default function Page() {
  const path = "/tools";
  const pageName = "All Tools & Software for Mobile Detailing";
  const description =
    "Browse our complete directory of software, tools, and equipment for mobile car detailing businesses. Filter by feature to find exactly what you need.";

  return (
    <>
      <JsonLd data={webPageJsonLd({ path, name: pageName, description })} />
      <JsonLd
        data={breadcrumbJsonLd({
          path,
          items: [
            { name: "Home", path: "/" },
            { name: "Tools", path },
          ],
        })}
      />
      <JsonLd
        data={itemListJsonLd({
          name: "Tools Directory",
          path,
          items: (tools || []).map((t) => ({ name: t.name, path: `/tools/${t.slug}` })),
        })}
      />
      <Compare />
    </>
  );
}
