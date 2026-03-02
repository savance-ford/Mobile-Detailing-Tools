'use client';

/**
 * InternalLinkBlock - Contextual internal links section
 * Strengthens topical authority by linking to related content.
 * Every page should include this to connect clusters.
 */
import React from "react";
import Link from "next/link";
import { createPageUrl } from "@/utils";
import { ArrowRight } from "lucide-react";

export default function InternalLinkBlock({ links = [] }) {
  // links: [{label, page, params?}]
  if (links.length === 0) return null;

  return (
    <div className="mt-8 bg-[#1f2330] border border-[#2a2e3b] rounded-2xl p-6">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
        Explore More
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {links.map((link, i) => (
          <Link
            key={i}
            href={createPageUrl(link.page + (link.params ? `?${link.params}` : ""))}
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-indigo-400 transition-colors py-1"
          >
            <ArrowRight className="w-3.5 h-3.5 text-indigo-500" />
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}