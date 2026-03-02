'use client';

/**
 * Guides - Guide listing page
 * SEO: Hub for all guides, linking to individual guide pages.
 */
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import Breadcrumbs from "@/components/Breadcrumbs";
import GuideCard from "@/components/GuideCard";
import InternalLinkBlock from "@/components/InternalLinkBlock";

export default function Guides() {
  const { data: guides = [] } = useQuery({
    queryKey: ["guides"],
    queryFn: () => base44.entities.Guide.list("sort_order", 50)
  });

  return (
    <div>
      <Breadcrumbs items={[{ label: "Guides" }]} />
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Detailing Business Guides</h1>
      <p className="text-gray-400 text-lg mb-8 max-w-3xl">
        In-depth guides to help you start, run, and grow your mobile car detailing business.
        From software setup to marketing strategies.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {guides.map(g => (
          <GuideCard key={g.slug} guide={g} />
        ))}
      </div>

      <InternalLinkBlock links={[
        { label: "Browse All Tools", page: "Compare" },
        { label: "Best Scheduling Software", page: "BestForDetail", params: "feature=scheduling" },
        { label: "All Categories", page: "Categories" }
      ]} />
    </div>
  );
}