'use client';

/**
 * CategoryDetail - Individual category page showing all tools in that category
 * SEO: Category cluster page with filtered tools and internal links.
 * Route: ?slug=software-business-tools
 */
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import Breadcrumbs from "@/components/Breadcrumbs";
import ToolCard from "@/components/ToolCard";
import FAQ from "@/components/FAQ";
import InternalLinkBlock from "@/components/InternalLinkBlock";

export default function CategoryDetail({slug}) {
  const { data: categories = [] } = useQuery({
    queryKey: ["category", slug],
    queryFn: () => base44.entities.Category.filter({ slug }),
    enabled: !!slug,
  });
  const category = categories[0];

  const { data: tools = [] } = useQuery({
    queryKey: ["category-tools", slug],
    queryFn: () => base44.entities.Tool.filter({ category_slug: slug }, "sort_order", 50),
    enabled: !!slug
  });

  if (!category) {
    return <div className="text-center py-20 text-gray-400">Loading category...</div>;
  }

  return (
    <div>
      <Breadcrumbs items={[
        { label: "Categories", href: createPageUrl("Categories") },
        { label: category.name }
      ]} />

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{category.name}</h1>
        <p className="text-gray-400 text-lg max-w-3xl">{category.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map(tool => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>

      {tools.length === 0 && (
        <div className="text-center py-16 text-gray-400">No tools found in this category yet.</div>
      )}

      <FAQ items={[
        { question: `What's the best ${category.name?.toLowerCase()} for mobile detailers?`, answer: `The best choice depends on your specific needs and budget. Browse our reviews above to find the best fit for your mobile detailing business.` },
        { question: `How much does ${category.name?.toLowerCase()} cost?`, answer: `Pricing varies widely. Some tools offer free plans, while others can cost $100+/month. Check individual tool reviews for detailed pricing breakdowns.` }
      ]} />

      <InternalLinkBlock links={[
        { label: "Compare All Tools", page: "Compare" },
        { label: "Read Our Guides", page: "Guides" },
        { label: "Best Scheduling Software", page: "BestForDetail", params: "feature=scheduling" },
        { label: "Jobber vs Housecall Pro", page: "VSDetail", params: "slugs=jobber-vs-housecall-pro" }
      ]} />
    </div>
  );
}