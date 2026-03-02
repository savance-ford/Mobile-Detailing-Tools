'use client';

/**
 * Home - Main landing page / homepage
 * SEO: Primary landing page with strong intro, category overview, featured tools, and FAQs.
 * Internal linking: Links to categories, tools, guides, and comparisons.
 */
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import Link from "next/link";
import { createPageUrl } from "@/utils";
import { ArrowRight, Sparkles, Zap, Shield, TrendingUp } from "lucide-react";
import CategoryGrid from "@/components/CategoryGrid";
import ToolCard from "@/components/ToolCard";
import GuideCard from "@/components/GuideCard";
import FAQ from "@/components/FAQ";
import TrustSection from "@/components/TrustSection";
import InternalLinkBlock from "@/components/InternalLinkBlock";

const homeFAQs = [
  { question: "What software does a mobile car detailing business need?", answer: "At minimum, you need scheduling software (like Jobber or Housecall Pro), a payment processor (Square or Stripe), accounting software (QuickBooks), and a way to manage clients. As you grow, add marketing automation, CRM, and specialized detailing software." },
  { question: "What's the best all-in-one software for mobile detailers?", answer: "Jobber and Housecall Pro are the top all-in-one solutions, offering scheduling, invoicing, CRM, and payment processing. For detailing-specific features, MobileTech RX is the industry standard." },
  { question: "How much should I budget for business software?", answer: "Most solo mobile detailers spend $50-$150/month on essential software. This typically covers scheduling ($40-65), accounting ($30), and payment processing (per-transaction fees). Costs increase as you add team members and marketing tools." },
  { question: "Do I need detailing-specific software?", answer: "Not necessarily. General field service tools like Jobber work great. However, detailing-specific tools like MobileTech RX offer features like vehicle condition reports and detailing package management that can set you apart professionally." },
  { question: "What equipment do I need to start mobile detailing?", answer: "Essential startup equipment includes a pressure washer, dual-action polisher, vacuum/extractor, wash supplies, microfiber towels, and a reliable vehicle. Budget $2,000-$5,000 for a basic professional setup." }
];

export default function Home() {
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () => base44.entities.Category.list("sort_order", 10)
  });

  const { data: featuredTools = [] } = useQuery({
    queryKey: ["featured-tools"],
    queryFn: () => base44.entities.Tool.filter({ is_featured: true }, "sort_order", 6)
  });

  const { data: guides = [] } = useQuery({
    queryKey: ["guides"],
    queryFn: () => base44.entities.Guide.list("sort_order", 3)
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="text-center py-16 md:py-24">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          The #1 Resource for Mobile Detailing Businesses
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight max-w-4xl mx-auto mb-6">
          Software, Tools & Equipment for{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            Mobile Car Detailing
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Expert reviews and comparisons of the best software, business tools, and equipment
          specifically for mobile car detailing businesses. Find the right tools to grow your operation.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={createPageUrl("Compare")}
            className="affiliate-btn-shimmer text-white px-8 py-3.5 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-indigo-500/20"
          >
            Browse All Tools <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href={createPageUrl("BestFor")}
            className="border border-[#363b4a] text-gray-300 px-8 py-3.5 rounded-xl font-medium hover:bg-[#1f2330] transition-colors"
          >
            Find Your Best Match
          </Link>
        </div>
      </section>

      {/* Value Props */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
        {[
          { icon: Zap, title: "Expert Reviews", desc: "In-depth analysis of every tool from a mobile detailing perspective." },
          { icon: Shield, title: "Honest Comparisons", desc: "Side-by-side comparisons with real pros, cons, and pricing details." },
          { icon: TrendingUp, title: "Growth Focused", desc: "Tools and strategies to scale from solo operation to thriving business." }
        ].map((item, i) => (
          <div key={i} className="bg-[#181b23] border border-[#2a2e3b] rounded-2xl p-6 text-center">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center mx-auto mb-3">
              <item.icon className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="font-semibold text-white mb-1">{item.title}</h3>
            <p className="text-sm text-gray-400">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Categories */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Browse by Category</h2>
          <Link href={createPageUrl("Categories")} className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
            All categories <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <CategoryGrid categories={categories} />
      </section>

      {/* Featured Tools */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Featured Tools</h2>
          <Link href={createPageUrl("Compare")} className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredTools.map(tool => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      {/* Popular Comparisons */}
      <section className="mb-16 bg-[#181b23] border border-[#2a2e3b] rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Popular Comparisons</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { a: "Jobber", b: "Housecall Pro", slug: "jobber-vs-housecall-pro" },
            { a: "Jobber", b: "MobileTech RX", slug: "jobber-vs-mobiletech-rx" },
            { a: "Square", b: "Stripe", slug: "square-vs-stripe" },
            { a: "Mailchimp", b: "ActiveCampaign", slug: "mailchimp-vs-activecampaign" },
            { a: "Chemical Guys", b: "Meguiar's", slug: "chemical-guys-vs-meguiars" },
            { a: "PocketSuite", b: "Jobber", slug: "pocketsuite-vs-jobber" }
          ].map(c => (
            <Link
              key={c.slug}
              href={createPageUrl(`VSDetail?slugs=${c.slug}`)}
              className="group flex items-center gap-3 p-4 border border-[#2a2e3b] rounded-xl hover:border-indigo-500/30 transition-all"
            >
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-xs font-bold text-indigo-400">
                  {c.a[0]}
                </div>
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-xs font-bold text-purple-400">
                  {c.b[0]}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-white group-hover:text-indigo-400 transition-colors">
                  {c.a} vs {c.b}
                </div>
                <div className="text-xs text-gray-500">Full comparison</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Guides */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Latest Guides</h2>
          <Link href={createPageUrl("Guides")} className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
            All guides <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {guides.map(g => (
            <GuideCard key={g.slug} guide={g} />
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <TrustSection />

      {/* FAQ */}
      <FAQ items={homeFAQs} />

      {/* Internal Links */}
      <InternalLinkBlock links={[
        { label: "Best Scheduling Software for Detailers", page: "BestForDetail", params: "feature=scheduling" },
        { label: "Best CRM for Mobile Detailing", page: "BestForDetail", params: "feature=crm" },
        { label: "Best Invoicing Tools", page: "BestForDetail", params: "feature=invoicing" },
        { label: "Best Payment Systems", page: "BestForDetail", params: "feature=payment" },
        { label: "Jobber vs Housecall Pro", page: "VSDetail", params: "slugs=jobber-vs-housecall-pro" },
        { label: "Compare All Tools", page: "Compare" }
      ]} />
    </div>
  );
}