'use client';

/**
 * ComparisonTable - Side-by-side tool comparison
 * Displays features, pricing, and ratings in a structured table.
 * SEO: Structured for easy content extraction by search engines.
 */
import React from "react";
import { Star, Check, X } from "lucide-react";
import AffiliateButton from "./AffiliateButton";

export default function ComparisonTable({ tools = [] }) {
  if (tools.length === 0) return null;

  // Collect all unique features
  const allFeatures = [...new Set(tools.flatMap(t => t.features || []))];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-[#2a2e3b]">
            <th className="text-left py-4 px-4 text-sm font-medium text-gray-400 w-48">Feature</th>
            {tools.map(tool => (
              <th key={tool.slug} className="text-center py-4 px-4 min-w-[180px]">
                <div className="text-white font-semibold text-base">{tool.name}</div>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-sm text-gray-400">{tool.rating}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Pricing Row */}
          <tr className="border-b border-[#2a2e3b] bg-[#1f2330]/50">
            <td className="py-3 px-4 text-sm text-gray-300 font-medium">Starting Price</td>
            {tools.map(tool => (
              <td key={tool.slug} className="py-3 px-4 text-center">
                <span className="text-indigo-400 font-semibold">{tool.pricing_starts_at || "N/A"}</span>
              </td>
            ))}
          </tr>
          {/* Best For Row */}
          <tr className="border-b border-[#2a2e3b]">
            <td className="py-3 px-4 text-sm text-gray-300 font-medium">Best For</td>
            {tools.map(tool => (
              <td key={tool.slug} className="py-3 px-4 text-center text-sm text-gray-400">
                {tool.best_for?.substring(0, 80) || "—"}...
              </td>
            ))}
          </tr>
          {/* Feature Rows */}
          {allFeatures.slice(0, 12).map((feature, i) => (
            <tr key={feature} className={`border-b border-[#2a2e3b] ${i % 2 === 0 ? "bg-[#1f2330]/30" : ""}`}>
              <td className="py-3 px-4 text-sm text-gray-300">{feature}</td>
              {tools.map(tool => (
                <td key={tool.slug} className="py-3 px-4 text-center">
                  {(tool.features || []).includes(feature) ? (
                    <Check className="w-5 h-5 text-emerald-400 mx-auto" />
                  ) : (
                    <X className="w-5 h-5 text-gray-600 mx-auto" />
                  )}
                </td>
              ))}
            </tr>
          ))}
          {/* CTA Row */}
          <tr>
            <td className="py-4 px-4"></td>
            {tools.map(tool => (
              <td key={tool.slug} className="py-4 px-4 text-center">
                <AffiliateButton href={tool.affiliate_url} name={tool.name} variant="primary" size="sm" />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}