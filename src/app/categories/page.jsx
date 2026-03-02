import Categories from '@/views/Categories';

import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, itemListJsonLd, webPageJsonLd } from "@/lib/jsonld";
import { categories } from "@/data/mockData";

export function generateMetadata() {
  return buildMetadata({
    title: "Categories — Mobile Detailing Tools & Software",
    description:
      "Explore tool categories for mobile detailing businesses: scheduling, CRM, marketing, payments, equipment, and more.",
    path: "/categories",
    type: "website",
  });
}

export default function Page() {
  const path = "/categories";
  const pageName = "Categories — Mobile Detailing Tools";
  const description = "Browse tool categories for mobile car detailing businesses.";

  return (
    <>
      <JsonLd data={webPageJsonLd({ path, name: pageName, description })} />
      <JsonLd
        data={breadcrumbJsonLd({
          path,
          items: [
            { name: "Home", path: "/" },
            { name: "Categories", path },
          ],
        })}
      />
      <JsonLd
        data={itemListJsonLd({
          name: "Tool Categories",
          path,
          items: (categories || []).map((c) => ({ name: c.name, path: `/categories/${c.slug}` })),
        })}
      />
      <Categories />
    </>
  );
}
