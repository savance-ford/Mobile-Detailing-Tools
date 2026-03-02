'use client';

/**
 * VSDetail - Head-to-head tool comparison page
 * SEO: Programmatic VS page (e.g., jobber-vs-housecall-pro)
 * Structured comparison with narrative, table, and FAQs.
 * Route: ?slugs=jobber-vs-housecall-pro
 */
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import { Star, Check, X } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import ComparisonTable from "@/components/ComparisonTable";
import AffiliateButton from "@/components/AffiliateButton";
import FAQ from "@/components/FAQ";
import InternalLinkBlock from "@/components/InternalLinkBlock";

export default function VSDetail({ slugs }) {
  const slugsParam = slugs || "";
  const [slugA, slugB] = slugsParam.split("-vs-");
  const { data: toolsA = [] } = useQuery({
    queryKey: ["tool-vs-a", slugA],
    queryFn: () => base44.entities.Tool.filter({ slug: slugA }),
    enabled: !!slugA
  });
  const { data: toolsB = [] } = useQuery({
    queryKey: ["tool-vs-b", slugB],
    queryFn: () => base44.entities.Tool.filter({ slug: slugB }),
    enabled: !!slugB
  });

  const toolA = toolsA[0];
  const toolB = toolsB[0];

  if (!toolA || !toolB) {
    return <div className="text-center py-20 text-gray-400">Loading comparison...</div>;
  }

  const vsFAQs = [
    {
      question: `Is ${toolA.name} better than ${toolB.name} for mobile detailing?`,
      answer: `Both are excellent choices. ${toolA.name} excels at ${(toolA.features || [])[0]?.toLowerCase() || "core features"}, while ${toolB.name} stands out for ${(toolB.features || [])[0]?.toLowerCase() || "its unique capabilities"}. The best choice depends on your specific needs and budget.`
    },
    {
      question: `Which is more affordable, ${toolA.name} or ${toolB.name}?`,
      answer: `${toolA.name} starts at ${toolA.pricing_starts_at || "varying prices"}, while ${toolB.name} starts at ${toolB.pricing_starts_at || "varying prices"}. Compare the features you actually need before deciding based on price alone.`
    },
    {
      question: `Can I use both ${toolA.name} and ${toolB.name} together?`,
      answer: `In many cases, yes. Some detailing businesses use complementary tools together. Check if they offer integrations or if they serve different aspects of your business.`
    }
  ];

  return (
    <div>
      <Breadcrumbs items={[
        { label: "VS Comparisons", href: createPageUrl("VSIndex") },
        { label: `${toolA.name} vs ${toolB.name}` }
      ]} />

      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {toolA.name} vs {toolB.name}
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          A detailed comparison of {toolA.name} and {toolB.name} for mobile car detailing businesses.
          See how they stack up on features, pricing, and value.
        </p>
      </div>

      {/* Quick Compare Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {[toolA, toolB].map((tool, idx) => (
          <div key={tool.slug} className={`bg-[#181b23] border rounded-2xl p-6 ${idx === 0 ? "border-indigo-500/30" : "border-purple-500/30"}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${idx === 0 ? "bg-indigo-500/15 text-indigo-400" : "bg-purple-500/15 text-purple-400"}`}>
                {tool.name[0]}
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{tool.name}</h2>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-sm text-gray-400">{tool.rating}/5</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">{tool.short_description}</p>
            <div className="text-lg font-semibold text-white mb-4">
              Starting at {tool.pricing_starts_at}
            </div>
            <AffiliateButton href={tool.affiliate_url} name={tool.name} variant={idx === 0 ? "primary" : "outline"} size="md" />
          </div>
        ))}
      </div>

      {/* Comparison Narrative */}
      <div className="bg-[#181b23] border border-[#2a2e3b] rounded-2xl p-8 mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">How They Compare</h2>
        <div className="text-gray-400 leading-relaxed space-y-4">
          <p>
            When choosing between {toolA.name} and {toolB.name} for your mobile detailing business,
            it's important to consider what matters most to your operation. Both tools serve detailing
            professionals, but they approach the challenge differently.
          </p>
          <p>
            <strong className="text-white">{toolA.name}</strong> is best for {toolA.best_for?.toLowerCase() || "a variety of use cases"}.
            Its standout features include {(toolA.features || []).slice(0, 3).join(", ").toLowerCase()}.
          </p>
          <p>
            <strong className="text-white">{toolB.name}</strong> is best for {toolB.best_for?.toLowerCase() || "a variety of use cases"}.
            It shines with {(toolB.features || []).slice(0, 3).join(", ").toLowerCase()}.
          </p>
        </div>
      </div>

      {/* Full Comparison Table */}
      <div className="bg-[#181b23] border border-[#2a2e3b] rounded-2xl p-6 mb-10 overflow-hidden">
        <h2 className="text-xl font-bold text-white mb-4">Feature Comparison</h2>
        <ComparisonTable tools={[toolA, toolB]} />
      </div>

      {/* Pros & Cons Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {[toolA, toolB].map(tool => (
          <div key={tool.slug} className="space-y-3">
            <h3 className="font-semibold text-white">{tool.name}</h3>
            <div className="space-y-2">
              {(tool.pros || []).slice(0, 3).map((pro, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{pro}</span>
                </div>
              ))}
              {(tool.cons || []).slice(0, 2).map((con, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">{con}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <FAQ items={vsFAQs} title="Frequently Asked Questions" />

      {/* Internal Links */}
      <InternalLinkBlock links={[
        { label: `Full ${toolA.name} Review`, page: "ToolDetail", params: `slug=${toolA.slug}` },
        { label: `Full ${toolB.name} Review`, page: "ToolDetail", params: `slug=${toolB.slug}` },
        { label: "Compare All Tools", page: "Compare" },
        { label: "All VS Comparisons", page: "VSIndex" },
        { label: "Start a Detailing Business", page: "GuideDetail", params: "slug=how-to-start-mobile-detailing-business" }
      ]} />
    </div>
  );
}