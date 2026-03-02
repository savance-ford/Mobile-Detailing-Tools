'use client';

/**
 * ToolHero - Hero section for individual tool detail pages
 * Displays key info: name, rating, pricing, and primary CTA.
 */
import React from "react";
import { Star, Check } from "lucide-react";
import AffiliateButton from "./AffiliateButton";

export default function ToolHero({ tool }) {
  return (
    <div className="bg-gradient-to-br from-[#181b23] to-[#1f2330] border border-[#2a2e3b] rounded-2xl p-8 md:p-10">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold text-xl">
              {tool.name?.[0]}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">{tool.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} className={`w-4 h-4 ${s <= Math.round(tool.rating || 0) ? "text-amber-400 fill-amber-400" : "text-gray-600"}`} />
                  ))}
                </div>
                <span className="text-sm text-gray-400">{tool.rating}/5</span>
              </div>
            </div>
          </div>

          <p className="text-gray-400 text-lg mb-6 max-w-2xl">
            {tool.short_description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {(tool.feature_tags || []).map(tag => (
              <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                {tag.replace(/-/g, " ")}
              </span>
            ))}
          </div>

          <AffiliateButton href={tool.affiliate_url} name={tool.name} variant="primary" size="lg" />
        </div>

        <div className="bg-[#0f1117] border border-[#2a2e3b] rounded-xl p-6 min-w-[240px]">
          <div className="text-sm text-gray-400 mb-1">Starting at</div>
          <div className="text-2xl font-bold text-white mb-4">{tool.pricing_starts_at || "Contact"}</div>
          <div className="space-y-2">
            {(tool.features || []).slice(0, 5).map(f => (
              <div key={f} className="flex items-center gap-2 text-sm text-gray-300">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}