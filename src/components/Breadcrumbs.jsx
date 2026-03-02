'use client';

/**
 * Breadcrumbs - Navigation breadcrumbs with structured data support
 * Generates BreadcrumbList JSON-LD for SEO.
 * Used on every page for internal linking and navigation.
 */
import React from "react";
import Link from "next/link";
import { createPageUrl } from "@/utils";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumbs({ items = [] }) {
  // items: [{label, href?}]
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-1.5 text-sm text-gray-400 flex-wrap">
        <li>
          <Link href={createPageUrl("Home")} className="hover:text-indigo-400 flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
            {item.href ? (
              <Link href={item.href} className="hover:text-indigo-400">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-300">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}