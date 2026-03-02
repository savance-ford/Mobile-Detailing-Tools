'use client';

/**
 * FeatureFilter - Client-side filtering component
 * Allows users to filter tools by feature tags.
 * Client component for interactivity, minimal JS footprint.
 */
import React from "react";

const FEATURE_OPTIONS = [
  { value: "all", label: "All Tools" },
  { value: "scheduling", label: "Scheduling" },
  { value: "crm", label: "CRM" },
  { value: "invoicing", label: "Invoicing" },
  { value: "payment", label: "Payments" },
  { value: "marketing", label: "Marketing" },
  { value: "automation", label: "Automation" },
  { value: "equipment", label: "Equipment" },
  { value: "email", label: "Email Marketing" },
  { value: "detailing-specific", label: "Detailing-Specific" }
];

export default function FeatureFilter({ active = "all", onChange }) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {FEATURE_OPTIONS.map(opt => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-4 py-2 text-sm rounded-full border transition-all ${
            active === opt.value
              ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-400"
              : "bg-[#181b23] border-[#2a2e3b] text-gray-400 hover:border-indigo-500/20 hover:text-gray-300"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}