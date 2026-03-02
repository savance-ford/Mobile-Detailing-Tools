'use client';

/**
 * TrustSection - Builds trust by explaining the review process
 * Important for affiliate site credibility and conversions.
 */
import React from "react";
import { Shield, Search, ThumbsUp, Users } from "lucide-react";

const trustPoints = [
  { icon: Search, title: "Hands-On Testing", desc: "We test every tool with real mobile detailing workflows before recommending it." },
  { icon: Users, title: "Community Input", desc: "We gather feedback from active detailing professionals across the industry." },
  { icon: ThumbsUp, title: "Honest Reviews", desc: "We highlight both strengths and weaknesses. No tool is perfect for everyone." },
  { icon: Shield, title: "Editorial Independence", desc: "Affiliate partnerships never influence our ratings or recommendations." }
];

export default function TrustSection() {
  return (
    <section className="mt-16 bg-[#181b23] border border-[#2a2e3b] rounded-2xl p-8">
      <h2 className="text-xl font-bold text-white mb-2">How We Research & Review</h2>
      <p className="text-gray-400 text-sm mb-6">
        Our review methodology ensures every recommendation serves mobile detailing professionals.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {trustPoints.map((tp, i) => (
          <div key={i} className="flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <tp.icon className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="font-semibold text-white text-sm">{tp.title}</h3>
            <p className="text-xs text-gray-400 leading-relaxed">{tp.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}