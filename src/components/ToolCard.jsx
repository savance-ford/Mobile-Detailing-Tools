'use client';

/**
 * ToolCard - Compact card for displaying a tool in grid layouts
 * Links to the tool's detail page for strong internal linking.
 * Shows key info at a glance: name, rating, price, description.
 */
import React from "react";
import Link from "next/link";
import { createPageUrl } from "@/utils";
import { Star, ArrowRight } from "lucide-react";
import AffiliateButton from "./AffiliateButton";

export default function ToolCard({ tool, showAffiliate = false }) {
  return (
    <div className="group bg-[#181b23] border border-[#2a2e3b] rounded-2xl p-6 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold text-lg">
          {tool.name?.[0]}
        </div>
        {tool.rating && (
          <div className="flex items-center gap-1 text-sm">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-gray-300 font-medium">{tool.rating}</span>
          </div>
        )}
      </div>

      <Link href={createPageUrl(`ToolDetail?slug=${tool.slug}`)}>
        <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors mb-2">
          {tool.name}
        </h3>
      </Link>

      <p className="text-sm text-gray-400 mb-4 line-clamp-2">
        {tool.short_description}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-indigo-400">
          {tool.pricing_starts_at ? `From ${tool.pricing_starts_at}` : "See pricing"}
        </span>
        {showAffiliate ? (
          <AffiliateButton href={tool.affiliate_url} name={tool.name} variant="ghost" size="sm" />
        ) : (
          <Link
            href={createPageUrl(`ToolDetail?slug=${tool.slug}`)}
            className="text-sm text-gray-400 hover:text-indigo-400 flex items-center gap-1 transition-colors"
          >
            Learn more <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}