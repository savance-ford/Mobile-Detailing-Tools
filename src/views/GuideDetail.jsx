'use client';

/**
 * GuideDetail - Individual guide page
 * SEO: Article content with structured data and internal links.
 * Route: ?slug=how-to-start-mobile-detailing-business
 */
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import ReactMarkdown from "react-markdown";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import InternalLinkBlock from "@/components/InternalLinkBlock";

export default function GuideDetail({slug}) {
  const { data: guides = [] } = useQuery({
    queryKey: ["guide", slug],
    queryFn: () => base44.entities.Guide.filter({ slug }),
    enabled: !!slug,
  });
  const guide = guides[0];

  const { data: allTools = [] } = useQuery({
    queryKey: ["all-tools-guide"],
    queryFn: () => base44.entities.Tool.list("sort_order", 50)
  });

  const relatedTools = allTools.filter(t => (guide?.related_tool_slugs || []).includes(t.slug));

  if (!guide) {
    return <div className="text-center py-20 text-gray-400">Loading guide...</div>;
  }

  return (
    <div>
      <Breadcrumbs items={[
        { label: "Guides", href: createPageUrl("Guides") },
        { label: guide.title }
      ]} />

      <article className="max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{guide.title}</h1>
        <p className="text-lg text-gray-400 mb-8">{guide.excerpt}</p>

        <div className="prose-dark leading-relaxed text-gray-300">
          <ReactMarkdown
            components={{
              h2: ({children}) => <h2 className="text-xl font-bold text-white mt-8 mb-4">{children}</h2>,
              h3: ({children}) => <h3 className="text-lg font-semibold text-white mt-6 mb-3">{children}</h3>,
              p: ({children}) => <p className="mb-4 leading-relaxed">{children}</p>,
              strong: ({children}) => <strong className="text-white font-semibold">{children}</strong>,
              ul: ({children}) => <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>,
              li: ({children}) => <li className="text-gray-400">{children}</li>,
            }}
          >
            {guide.content || ""}
          </ReactMarkdown>
        </div>
      </article>

      {/* Related Tools */}
      <RelatedTools tools={relatedTools} title="Tools Mentioned in This Guide" />

      {/* Internal Links */}
      <InternalLinkBlock links={[
        { label: "All Guides", page: "Guides" },
        { label: "Compare All Tools", page: "Compare" },
        { label: "Best Scheduling Software", page: "BestForDetail", params: "feature=scheduling" },
        { label: "Jobber vs Housecall Pro", page: "VSDetail", params: "slugs=jobber-vs-housecall-pro" }
      ]} />
    </div>
  );
}