import { guides } from "@/data/mockData";
import { buildMetadata } from "@/lib/seo";
import GuideDetail from '@/views/GuideDetail';
import JsonLd from "@/components/seo/JsonLd";
import { articleJsonLd, breadcrumbJsonLd, webPageJsonLd } from "@/lib/jsonld";
export function generateMetadata({ params }) {
  const slug = params?.slug;
  const guide = (guides || []).find((g) => g.slug === slug);

  if (!guide) {
    return buildMetadata({
      title: "Guide Not Found",
      description: "The guide you are looking for does not exist (or hasn't been added yet).",
      path: `/guides/${slug || ""}`,
      type: "website",
    });
  }

  return buildMetadata({
    title: guide.title,
    description: guide.excerpt || "",
    path: `/guides/${guide.slug}`,
    type: "article",
  });
}

export default function Page({ params }) {
  const slug = params?.slug;
  const guide = (guides || []).find((g) => g.slug === slug);
  const path = `/guides/${slug}`;
  const pageName = guide?.title || "Guide";
  const description = guide?.excerpt || "";

  return (
    <>
      <JsonLd data={webPageJsonLd({ path, name: pageName, description })} />
      <JsonLd
        data={breadcrumbJsonLd({
          path,
          items: [
            { name: "Home", path: "/" },
            { name: "Guides", path: "/guides" },
            { name: guide?.title || slug, path },
          ],
        })}
      />
      {guide ? (
        <JsonLd
          data={articleJsonLd({
            path,
            headline: guide.title,
            description: guide.excerpt,
            section: guide.category_slug?.replace?.(/-/g, " "),
          })}
        />
      ) : null}
      <GuideDetail slug={slug} />
    </>
  );
}
