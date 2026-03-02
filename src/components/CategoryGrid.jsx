'use client';

/**
 * CategoryGrid - Displays categories in a responsive grid
 * Each category links to its page for strong topical clustering.
 */
import React from "react";
import Link from "next/link";
import { createPageUrl } from "@/utils";
import { Wrench, Car, BarChart3, Package, Megaphone, CreditCard, ArrowRight } from "lucide-react";

const iconMap = {
  Wrench, Car, BarChart3, Package, Megaphone, CreditCard
};

export default function CategoryGrid({ categories = [] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map(cat => {
        const Icon = iconMap[cat.icon] || Wrench;
        return (
          <Link
            key={cat.slug}
            href={createPageUrl(`CategoryDetail?slug=${cat.slug}`)}
            className="group bg-[#181b23] border border-[#2a2e3b] rounded-2xl p-6 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4">
              <Icon className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="text-base font-semibold text-white group-hover:text-indigo-400 transition-colors mb-2">
              {cat.name}
            </h3>
            <p className="text-sm text-gray-400 line-clamp-2 mb-3">
              {cat.description}
            </p>
            <span className="text-xs text-indigo-400 flex items-center gap-1">
              Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        );
      })}
    </div>
  );
}