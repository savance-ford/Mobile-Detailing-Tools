'use client';

/**
 * AffiliateDisclosure - FTC-required affiliate disclosure page
 * SEO: Legal page, important for compliance and trust.
 */
import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function AffiliateDisclosure() {
  return (
    <div className="max-w-3xl">
      <Breadcrumbs items={[{ label: "Affiliate Disclosure" }]} />
      <h1 className="text-3xl font-bold text-white mb-6">Affiliate Disclosure</h1>
      <div className="text-gray-400 leading-relaxed space-y-4">
        <p>
          DetailerStack is a participant in various affiliate programs designed to provide a means
          for us to earn commissions by linking to affiliated sites. This means that when you click
          on certain links on our site and make a purchase, we may receive a commission at no additional
          cost to you.
        </p>
        <h2 className="text-xl font-semibold text-white mt-8">How We Make Money</h2>
        <p>
          Our primary revenue comes from affiliate partnerships with the software companies, tool
          manufacturers, and supply companies we review. When you click an affiliate link and make a
          purchase, we earn a small commission.
        </p>
        <h2 className="text-xl font-semibold text-white mt-8">Our Commitment to Honesty</h2>
        <p>
          Affiliate partnerships never influence our reviews, ratings, or recommendations. We evaluate
          every tool based on its merits for mobile car detailing businesses. We include both pros and
          cons in every review, and we'll never recommend a product solely because it pays a higher commission.
        </p>
        <h2 className="text-xl font-semibold text-white mt-8">Identifying Affiliate Links</h2>
        <p>
          Affiliate links on our site are clearly marked with external link icons and disclosure tooltips.
          Any button or link that takes you to a product's website is likely an affiliate link.
        </p>
        <p>
          If you have questions about our affiliate relationships, please contact us.
        </p>
      </div>
    </div>
  );
}