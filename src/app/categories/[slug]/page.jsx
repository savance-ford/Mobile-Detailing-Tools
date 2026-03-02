import { categories, tools } from "@/data/mockData";
import { buildMetadata } from "@/lib/seo";
import CategoryDetail from '@/views/CategoryDetail';
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, itemListJsonLd, webPageJsonLd } from "@/lib/jsonld";

export function generateMetadata({ params }) {
  const slug = params?.slug;
  const cat = (categories || []).find((c) => c.slug === slug);

  if (!cat) {
    return buildMetadata({
      title: "Category Not Found",
      description: "The category you are looking for does not exist (or hasn't been added yet).",
      path: `/categories/${slug || ""}`,
      type: "website",
    });
  }

  return buildMetadata({
    title: `${cat.name} — Tools & Software`,
    description: cat.description || "",
    path: `/categories/${cat.slug}`,
    type: "website",
  });
}

export default function Page({ params }) {
  const slug = params?.slug;
  const cat = (categories || []).find((c) => c.slug === slug);
  const path = `/categories/${slug}`;
  const pageName = cat ? `${cat.name} — Tools & Software` : "Category";
  const description = cat?.description || "";

  const inCategory = (tools || []).filter((t) => t.category_slug === slug);

  return (
    <>
      <JsonLd data={webPageJsonLd({ path, name: pageName, description })} />
      <JsonLd
        data={breadcrumbJsonLd({
          path,
          items: [
            { name: "Home", path: "/" },
            { name: "Categories", path: "/categories" },
            { name: cat?.name || slug, path },
          ],
        })}
      />
      {inCategory.length ? (
        <JsonLd
          data={itemListJsonLd({
            name: `${cat?.name || "Category"} Tools`,
            path,
            items: inCategory.map((t) => ({ name: t.name, path: `/tools/${t.slug}` })),
          })}
        />
      ) : null}
      <CategoryDetail slug={slug} />
    </>
  );
}
