'use client';

/**
 * Compare - All tools listing page with filtering
 * SEO: Central hub for all tool reviews with feature-based filtering.
 * Internal linking: Links to every tool and category.
 */
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import Breadcrumbs from "@/components/Breadcrumbs";
import ToolCard from "@/components/ToolCard";
import FeatureFilter from "@/components/FeatureFilter";
import InternalLinkBlock from "@/components/InternalLinkBlock";

export default function Compare() {
  const [activeFilter, setActiveFilter] = useState("all");

  const { data: tools = [], isLoading } = useQuery({
    queryKey: ["all-tools"],
    queryFn: () => base44.entities.Tool.list("sort_order", 50)
  });

  const filtered = activeFilter === "all"
    ? tools
    : tools.filter(t => (t.feature_tags || []).includes(activeFilter));

  return (
    <div>
      <Breadcrumbs items={[{ label: "All Tools" }]} />

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          All Tools & Software for Mobile Detailing
        </h1>
        <p className="text-gray-400 text-lg max-w-3xl">
          Browse our complete directory of software, tools, and equipment for mobile car detailing businesses.
          Filter by feature to find exactly what you need.
        </p>
      </div>

      <FeatureFilter active={activeFilter} onChange={setActiveFilter} />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="bg-[#181b23] border border-[#2a2e3b] rounded-2xl p-6 animate-pulse">
              <div className="w-12 h-12 rounded-xl bg-[#2a2e3b] mb-4" />
              <div className="h-5 bg-[#2a2e3b] rounded w-1/2 mb-2" />
              <div className="h-4 bg-[#2a2e3b] rounded w-full mb-4" />
              <div className="h-4 bg-[#2a2e3b] rounded w-1/3" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(tool => (
            <ToolCard key={tool.slug} tool={tool} showAffiliate={false} />
          ))}
        </div>
      )}

      {filtered.length === 0 && !isLoading && (
        <div className="text-center py-16">
          <p className="text-gray-400">No tools found for this filter. Try a different category.</p>
        </div>
      )}

      <InternalLinkBlock links={[
        { label: "Best Scheduling Software", page: "BestForDetail", params: "feature=scheduling" },
        { label: "Best CRM Tools", page: "BestForDetail", params: "feature=crm" },
        { label: "How to Start a Detailing Business", page: "GuideDetail", params: "slug=how-to-start-mobile-detailing-business" },
        { label: "Jobber vs Housecall Pro", page: "VSDetail", params: "slugs=jobber-vs-housecall-pro" }
      ]} />
    </div>
  );
}