'use client';

/**
 * BestForDetail - Programmatic "Best for X" page
 * SEO: Long-tail keyword capture for "best [feature] for mobile detailers"
 * Route: ?feature=scheduling
 * Dynamically filters tools by feature tag and generates comparison content.
 */
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import Breadcrumbs from "@/components/Breadcrumbs";
import ToolCard from "@/components/ToolCard";
import ComparisonTable from "@/components/ComparisonTable";
import FAQ from "@/components/FAQ";
import InternalLinkBlock from "@/components/InternalLinkBlock";
import TrustSection from "@/components/TrustSection";

const featureMeta = {
  scheduling: { title: "Best Scheduling Software for Mobile Detailers", intro: "Finding the right scheduling software can transform your mobile detailing business. The best scheduling tools help you manage appointments, optimize routes, reduce no-shows, and give clients a professional booking experience." },
  crm: { title: "Best CRM for Mobile Car Detailing Businesses", intro: "A powerful CRM is essential for managing client relationships in your detailing business. Track vehicle history, preferences, and communication to deliver personalized service that drives repeat business." },
  invoicing: { title: "Best Invoicing Software for Detailing Businesses", intro: "Professional invoicing builds trust and ensures you get paid on time. The best invoicing tools for detailers offer mobile invoicing, online payments, and automated follow-ups." },
  payment: { title: "Best Payment Systems for Mobile Detailers", intro: "Accepting payments on-site is critical for mobile detailing. These payment solutions let you process cards, send invoices, and manage your finances from anywhere." },
  marketing: { title: "Best Marketing Tools for Auto Detailing Businesses", intro: "Growing your detailing business requires the right marketing tools. From social media to email campaigns, these tools help you attract new clients and retain existing ones." },
  automation: { title: "Best Automation Tools for Detailing Businesses", intro: "Automation saves you hours every week by handling repetitive tasks. These tools automate scheduling, follow-ups, invoicing, and marketing for your detailing business." },
  equipment: { title: "Best Equipment & Supplies for Mobile Detailing", intro: "Professional results require professional equipment. These are the top-rated products and suppliers trusted by mobile detailing professionals." },
  email: { title: "Best Email Marketing for Mobile Detailers", intro: "Email marketing has one of the highest ROIs of any channel. These platforms help you stay in touch with clients, promote seasonal offers, and generate repeat business." },
  "detailing-specific": { title: "Best Detailing-Specific Software", intro: "Generic tools work, but detailing-specific software understands your industry. These platforms were built exclusively for auto detailing professionals." }
};

export default function BestForDetail({ featureParam }) {
  const feature = featureParam || "scheduling";
const meta = featureMeta[feature] || { title: `Best ${feature} Tools`, intro: "" };

  const { data: allTools = [] } = useQuery({
    queryKey: ["all-tools-best"],
    queryFn: () => base44.entities.Tool.list("sort_order", 50)
  });

  const filtered = allTools.filter(t => (t.feature_tags || []).includes(feature));

  const faqs = [
    { question: `What's the best ${feature.replace(/-/g, " ")} tool for mobile detailers?`, answer: `The best choice depends on your business size and specific needs. Browse our curated list above to compare features, pricing, and reviews from real detailing professionals.` },
    { question: `How much does ${feature.replace(/-/g, " ")} software cost?`, answer: `Pricing ranges from free to several hundred dollars per month. Many tools offer free trials so you can test before committing.` },
    { question: `Do I need dedicated ${feature.replace(/-/g, " ")} software?`, answer: `If ${feature.replace(/-/g, " ")} is a significant part of your business operations, dedicated software will save you time and improve professionalism. Many detailers start with basic tools and upgrade as they grow.` }
  ];

  return (
    <div>
      <Breadcrumbs items={[
        { label: "Best For", href: createPageUrl("BestFor") },
        { label: meta.title }
      ]} />

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{meta.title}</h1>
        <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">{meta.intro}</p>
      </div>

      {/* Comparison Table (if 2+ tools) */}
      {filtered.length >= 2 && (
        <div className="bg-[#181b23] border border-[#2a2e3b] rounded-2xl p-6 mb-8 overflow-hidden">
          <h2 className="text-xl font-bold text-white mb-4">Quick Comparison</h2>
          <ComparisonTable tools={filtered.slice(0, 4)} />
        </div>
      )}

      {/* Tool Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {filtered.map(tool => (
          <ToolCard key={tool.slug} tool={tool} showAffiliate />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">No tools found for this feature. Check back soon.</div>
      )}

      <TrustSection />
      <FAQ items={faqs} />

      <InternalLinkBlock links={[
        { label: "Compare All Tools", page: "Compare" },
        { label: "All Best-For Categories", page: "BestFor" },
        { label: "Start a Detailing Business", page: "GuideDetail", params: "slug=how-to-start-mobile-detailing-business" },
        { label: "All VS Comparisons", page: "VSIndex" }
      ]} />
    </div>
  );
}