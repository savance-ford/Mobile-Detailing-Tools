'use client';

/**
 * RelatedTools - Displays related tool recommendations
 * Critical for internal linking strategy - every page should show related tools.
 */
import React from "react";
import ToolCard from "./ToolCard";

export default function RelatedTools({ tools = [], title = "Related Tools", exclude = "" }) {
  const filtered = tools.filter(t => t.slug !== exclude).slice(0, 3);
  if (filtered.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.map(tool => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </section>
  );
}