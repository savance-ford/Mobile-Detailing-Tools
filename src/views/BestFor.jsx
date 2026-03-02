'use client';

/**
 * BestFor - Hub page for "Best For" feature categories
 * SEO: Links to all programmatic "best for X" pages.
 */
import React from "react";
import Link from "next/link";
import { createPageUrl } from "@/utils";
import { ArrowRight, Calendar, Users, Receipt, CreditCard, Megaphone, Zap, Wrench, Search, Cpu } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BEST_FEATURE_PAGES } from "@/lib/bestFeatures";

const iconByFeature = {
  scheduling: Calendar,
  crm: Users,
  invoicing: Receipt,
  payment: CreditCard,
  marketing: Megaphone,
  automation: Zap,
  equipment: Wrench,
  email: Search,
  "detailing-specific": Cpu,
};

const featurePages = BEST_FEATURE_PAGES.map((fp) => ({
  ...fp,
  desc:
    fp.feature === "scheduling"
      ? "Tools to manage appointments and optimize your daily route."
      : fp.feature === "crm"
      ? "Client management systems built for service businesses."
      : fp.feature === "invoicing"
      ? "Professional invoicing and billing solutions."
      : fp.feature === "payment"
      ? "Accept payments on-site and online seamlessly."
      : fp.feature === "marketing"
      ? "Grow your client base with digital marketing."
      : fp.feature === "automation"
      ? "Automate repetitive tasks and workflows."
      : fp.feature === "equipment"
      ? "Professional-grade detailing products and tools."
      : fp.feature === "email"
      ? "Build client relationships with email campaigns."
      : "Tools built exclusively for the detailing industry.",
  icon: iconByFeature[fp.feature] || Wrench,
}));


export default function BestFor() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Best For" }]} />
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Best Tools by Feature</h1>
      <p className="text-gray-400 text-lg mb-8 max-w-3xl">
        Find the best tool for your specific need. We've curated the top options in each category
        specifically for mobile car detailing businesses.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featurePages.map(fp => (
          <Link
            key={fp.feature}
            href={createPageUrl(`BestForDetail?feature=${fp.feature}`)}
            className="group bg-[#181b23] border border-[#2a2e3b] rounded-2xl p-6 hover:border-indigo-500/30 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4">
              <fp.icon className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="font-semibold text-white group-hover:text-indigo-400 transition-colors mb-2">
              {fp.label}
            </h3>
            <p className="text-sm text-gray-400 mb-3">{fp.desc}</p>
            <span className="text-xs text-indigo-400 flex items-center gap-1">
              View top picks <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
