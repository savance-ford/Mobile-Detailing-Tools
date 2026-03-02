'use client';

/**
 * StickyMobileCTA - Fixed bottom CTA on mobile for affiliate conversions
 * Only shows on mobile viewports. Includes disclosure link.
 */
import React from "react";
import { ExternalLink } from "lucide-react";

export default function StickyMobileCTA({ tool }) {
  if (!tool) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#0f1117]/95 backdrop-blur-lg border-t border-[#2a2e3b] p-3">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm font-semibold text-white truncate">{tool.name}</div>
          <div className="text-xs text-gray-400">{tool.pricing_starts_at}</div>
        </div>
        <a
          href={tool.affiliate_url}
          target="_blank"
          rel="nofollow sponsored noopener"
          className="affiliate-btn-shimmer text-white px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 whitespace-nowrap"
        >
          Visit Site <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}