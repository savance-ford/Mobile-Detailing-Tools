'use client';

/**
 * VSIndex - VS Comparisons hub page
 * SEO: Lists all available head-to-head comparisons for programmatic SEO.
 * Generates all tool combinations dynamically.
 */
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import Link from "next/link";
import { createPageUrl } from "@/utils";
import { ArrowLeftRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function VSIndex() {
  const { data: tools = [] } = useQuery({
    queryKey: ["all-tools-vs"],
    queryFn: () => base44.entities.Tool.list("sort_order", 50)
  });

  // Generate all unique pairs (only within overlapping categories/tags)
  const pairs = [];
  for (let i = 0; i < tools.length; i++) {
    for (let j = i + 1; j < tools.length; j++) {
      const a = tools[i];
      const b = tools[j];
      const sharedTags = (a.feature_tags || []).filter(t => (b.feature_tags || []).includes(t));
      if (sharedTags.length > 0 || a.category_slug === b.category_slug) {
        pairs.push({ a, b, slug: `${a.slug}-vs-${b.slug}` });
      }
    }
  }

  return (
    <div>
      <Breadcrumbs items={[{ label: "VS Comparisons" }]} />
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Head-to-Head Comparisons</h1>
      <p className="text-gray-400 text-lg mb-8 max-w-3xl">
        Detailed side-by-side comparisons of the top software and tools for mobile detailing businesses.
        Find out which tool is right for your specific needs.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {pairs.map(pair => (
          <Link
            key={pair.slug}
            href={createPageUrl(`VSDetail?slugs=${pair.slug}`)}
            className="group flex items-center gap-3 p-4 bg-[#181b23] border border-[#2a2e3b] rounded-xl hover:border-indigo-500/30 transition-all"
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/15 flex items-center justify-center text-xs font-bold text-indigo-400 flex-shrink-0">
                {pair.a.name[0]}
              </div>
              <span className="text-sm font-medium text-white truncate">{pair.a.name}</span>
            </div>
            <ArrowLeftRight className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
              <span className="text-sm font-medium text-white truncate">{pair.b.name}</span>
              <div className="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center text-xs font-bold text-purple-400 flex-shrink-0">
                {pair.b.name[0]}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {pairs.length === 0 && (
        <div className="text-center py-16 text-gray-400">Loading comparisons...</div>
      )}
    </div>
  );
}