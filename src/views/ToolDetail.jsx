'use client';

/**
 * ToolDetail - Individual tool review page
 * SEO: Deep content page with structured data, FAQs, pros/cons, and internal links.
 * Route: ?slug=jobber
 */
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import ReactMarkdown from "react-markdown";
import { ThumbsUp, ThumbsDown, DollarSign } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import ToolHero from "@/components/ToolHero";
import FAQ from "@/components/FAQ";
import RelatedTools from "@/components/RelatedTools";
import InternalLinkBlock from "@/components/InternalLinkBlock";
import StickyMobileCTA from "@/components/StickyMobileCTA";

export default function ToolDetail({slug}) {
  const { data: tools = [] } = useQuery({
    queryKey: ["tool", slug],
    queryFn: () => base44.entities.Tool.filter({ slug }),
    enabled: !!slug,
  });
  const tool = tools[0];

  const { data: allTools = [] } = useQuery({
    queryKey: ["all-tools-for-related"],
    queryFn: () => base44.entities.Tool.list("sort_order", 50)
  });

  // Find related tools (same category or overlapping feature tags)
  const related = allTools.filter(t =>
    t.slug !== slug && (
      t.category_slug === tool?.category_slug ||
      (t.feature_tags || []).some(tag => (tool?.feature_tags || []).includes(tag))
    )
  );

  if (!tool) {
    return <div className="text-center py-20 text-gray-400">Loading tool review...</div>;
  }

  return (
    <div>
      <Breadcrumbs items={[
        { label: "Tools", href: createPageUrl("Compare") },
        { label: tool.name }
      ]} />

      {/* Hero */}
      <ToolHero tool={tool} />

      {/* Main Content */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2">
          {/* Long Description */}
          {tool.long_description && (
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
                {tool.long_description}
              </ReactMarkdown>
            </div>
          )}

          {/* Pros & Cons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
            {/* Pros */}
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <ThumbsUp className="w-5 h-5 text-emerald-400" />
                <h3 className="font-semibold text-emerald-400">Pros</h3>
              </div>
              <ul className="space-y-2">
                {(tool.pros || []).map((pro, i) => (
                  <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">✓</span>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            {/* Cons */}
            <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <ThumbsDown className="w-5 h-5 text-red-400" />
                <h3 className="font-semibold text-red-400">Cons</h3>
              </div>
              <ul className="space-y-2">
                {(tool.cons || []).map((con, i) => (
                  <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">✗</span>
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pricing */}
          {tool.pricing_details && (
            <div className="mt-10 bg-[#181b23] border border-[#2a2e3b] rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="w-5 h-5 text-indigo-400" />
                <h3 className="font-semibold text-white">Pricing Details</h3>
              </div>
              <p className="text-gray-400">{tool.pricing_details}</p>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          {/* Quick Facts */}
          <div className="bg-[#181b23] border border-[#2a2e3b] rounded-xl p-6 sticky top-24">
            <h3 className="font-semibold text-white mb-4">Quick Facts</h3>
            <dl className="space-y-3">
              <div>
                <dt className="text-xs text-gray-500 uppercase">Best For</dt>
                <dd className="text-sm text-gray-300 mt-1">{tool.best_for}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500 uppercase">Starting Price</dt>
                <dd className="text-sm text-indigo-400 font-medium mt-1">{tool.pricing_starts_at}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500 uppercase">Category</dt>
                <dd className="text-sm text-gray-300 mt-1">
                  <a href={createPageUrl(`CategoryDetail?slug=${tool.category_slug}`)} className="text-indigo-400 hover:underline">
                    {tool.category_slug?.replace(/-/g, " ")}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500 uppercase">All Features</dt>
                <dd className="flex flex-wrap gap-1.5 mt-2">
                  {(tool.features || []).map(f => (
                    <span key={f} className="text-xs px-2 py-0.5 rounded bg-[#1f2330] text-gray-400 border border-[#2a2e3b]">
                      {f}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <FAQ items={tool.faqs || []} />

      {/* Related Tools */}
      <RelatedTools tools={related} exclude={slug} title={`Alternatives to ${tool.name}`} />

      {/* Internal Links */}
      <InternalLinkBlock links={[
        { label: "Compare All Tools", page: "Compare" },
        { label: "Best Scheduling Software", page: "BestForDetail", params: "feature=scheduling" },
        { label: "Start a Detailing Business Guide", page: "GuideDetail", params: "slug=how-to-start-mobile-detailing-business" },
        { label: "Jobber vs Housecall Pro", page: "VSDetail", params: "slugs=jobber-vs-housecall-pro" }
      ]} />

      {/* Sticky Mobile CTA */}
      <StickyMobileCTA tool={tool} />
    </div>
  );
}