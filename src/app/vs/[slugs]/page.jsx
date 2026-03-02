import { tools } from "@/data/mockData";
import { buildMetadata } from "@/lib/seo";
import VSDetail from '@/views/VSDetail';
import JsonLd from "@/components/seo/JsonLd";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  itemListJsonLd,
  softwareApplicationJsonLd,
  webPageJsonLd,
} from "@/lib/jsonld";
export function generateMetadata({ params }) {
  const slugs = params?.slugs || "";
  const [slugA, slugB] = slugs.split("-vs-");
  const toolA = (tools || []).find((t) => t.slug === slugA);
  const toolB = (tools || []).find((t) => t.slug === slugB);

  if (!toolA || !toolB) {
    return buildMetadata({
      title: "Comparison Not Found",
      description: "This comparison page could not be generated for the requested tools.",
      path: `/vs/${slugs}`,
      type: "website",
    });
  }

  const title = `${toolA.name} vs ${toolB.name} — Which is Better for Mobile Detailing?`;
  const description = `A side-by-side comparison of ${toolA.name} and ${toolB.name}: pricing, key features, pros/cons, and who each is best for.`;

  return buildMetadata({
    title,
    description,
    path: `/vs/${slugs}`,
    type: "article",
  });
}

export default function Page({ params }) {
  const slugs = params?.slugs || "";
  const [slugA, slugB] = slugs.split("-vs-");
  const toolA = (tools || []).find((t) => t.slug === slugA);
  const toolB = (tools || []).find((t) => t.slug === slugB);

  const path = `/vs/${slugs}`;
  const pageName = toolA && toolB ? `${toolA.name} vs ${toolB.name}` : "VS Comparison";
  const description =
    toolA && toolB
      ? `A side-by-side comparison of ${toolA.name} and ${toolB.name}: pricing, key features, pros/cons, and who each is best for.`
      : "A side-by-side comparison of two tools.";

  return (
    <>
      <JsonLd data={webPageJsonLd({ path, name: pageName, description })} />
      <JsonLd
        data={breadcrumbJsonLd({
          path,
          items: [
            { name: "Home", path: "/" },
            { name: "VS", path: "/vs" },
            { name: pageName, path },
          ],
        })}
      />
      {toolA && toolB ? (
        <>
          <JsonLd
            data={articleJsonLd({
              path,
              headline: `${toolA.name} vs ${toolB.name}`,
              description,
              section: "Comparisons",
            })}
          />
          <JsonLd
            data={itemListJsonLd({
              name: `${toolA.name} vs ${toolB.name}`,
              path,
              items: [
                { name: toolA.name, path: `/tools/${toolA.slug}` },
                { name: toolB.name, path: `/tools/${toolB.slug}` },
              ],
            })}
          />
          {/* Optional: include the individual SoftwareApplication schemas too */}
          <JsonLd data={softwareApplicationJsonLd(toolA)} />
          <JsonLd data={softwareApplicationJsonLd(toolB)} />
        </>
      ) : null}
      <VSDetail slugs={slugs} />
    </>
  );
}
