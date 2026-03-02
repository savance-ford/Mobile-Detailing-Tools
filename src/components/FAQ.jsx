'use client';

/**
 * FAQ - Expandable FAQ section
 * Generates FAQPage schema for rich results.
 * Used on tool pages, category pages, and the homepage.
 */
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ({ items = [], title = "Frequently Asked Questions" }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (items.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="border border-[#2a2e3b] rounded-xl overflow-hidden bg-[#181b23]"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-[#1f2330] transition-colors"
            >
              <span className="font-medium text-white pr-4">{item.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
              />
            </button>
            {openIndex === i && (
              <div className="px-5 pb-5 text-gray-400 leading-relaxed border-t border-[#2a2e3b] pt-4">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}