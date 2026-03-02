import { tools } from "@/data/mockData";
import { buildMetadata } from "@/lib/seo";
import ToolDetail from '@/views/ToolDetail';
import JsonLd from "@/components/seo/JsonLd";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  softwareApplicationJsonLd,
  webPageJsonLd,
} from "@/lib/jsonld";
export function generateMetadata({ params }) {
  const slug = params?.slug;
  const tool = (tools || []).find((t) => t.slug === slug);

  if (!tool) {
    return buildMetadata({
      title: "Tool Not Found",
      description: "The tool you are looking for does not exist (or hasn't been added yet).",
      path: `/tools/${slug || ""}`,
      type: "website",
    });
  }

  const title = `${tool.name} Review for Mobile Detailers`;
  const description = tool.short_description || tool.long_description?.slice?.(0, 155) || "";

  return buildMetadata({
    title,
    description,
    path: `/tools/${tool.slug}`,
    type: "article",
  });
}

export default function Page({ params }) {
  const slug = params?.slug;
  const tool = (tools || []).find((t) => t.slug === slug);

  const path = `/tools/${slug}`;
  const pageName = tool ? `${tool.name} Review for Mobile Detailers` : "Tool Review";
  const description = tool?.short_description || tool?.best_for || "";

  return (
    <>
      <JsonLd data={webPageJsonLd({ path, name: pageName, description })} />
      <JsonLd
        data={breadcrumbJsonLd({
          path,
          items: [
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
            { name: tool?.name || slug, path },
          ],
        })}
      />
      {tool && <JsonLd data={softwareApplicationJsonLd(tool)} />}
      {tool?.faqs?.length ? <JsonLd data={faqPageJsonLd(tool.faqs, path)} /> : null}
      <ToolDetail slug={slug} />
    </>
  );
}
