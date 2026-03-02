'use client';

/**
 * GuideCard - Preview card for guide articles
 * Links to full guide page for internal linking.
 */
import React from "react";
import Link from "next/link";
import { createPageUrl } from "@/utils";
import { ArrowRight, BookOpen } from "lucide-react";

export default function GuideCard({ guide }) {
  return (
    <Link
      href={createPageUrl(`GuideDetail?slug=${guide.slug}`)}
      className="group block bg-[#181b23] border border-[#2a2e3b] rounded-2xl p-6 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5 transition-all"
    >
      <div className="flex items-center gap-2 text-indigo-400 text-sm font-medium mb-3">
        <BookOpen className="w-4 h-4" />
        Guide
      </div>
      <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors mb-2">
        {guide.title}
      </h3>
      <p className="text-sm text-gray-400 mb-4 line-clamp-2">
        {guide.excerpt}
      </p>
      <span className="text-sm text-indigo-400 flex items-center gap-1">
        Read guide <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </span>
    </Link>
  );
}