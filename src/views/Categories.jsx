'use client';

/**
 * Categories - All categories listing page
 * SEO: Hub page linking to all category clusters.
 */
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import Breadcrumbs from "@/components/Breadcrumbs";
import CategoryGrid from "@/components/CategoryGrid";
import InternalLinkBlock from "@/components/InternalLinkBlock";

export default function Categories() {
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () => base44.entities.Category.list("sort_order", 20)
  });

  return (
    <div>
      <Breadcrumbs items={[{ label: "Categories" }]} />
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Tool Categories</h1>
      <p className="text-gray-400 text-lg mb-8 max-w-3xl">
        Explore our curated categories of software, tools, and equipment for every aspect of running a mobile car detailing business.
      </p>
      <CategoryGrid categories={categories} />

      <InternalLinkBlock links={[
        { label: "Compare All Tools", page: "Compare" },
        { label: "Read Our Guides", page: "Guides" },
        { label: "Best Scheduling Software", page: "BestForDetail", params: "feature=scheduling" }
      ]} />
    </div>
  );
}