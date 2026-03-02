'use client';

/**
 * AffiliateButton - Primary CTA for affiliate links
 * Uses rel="nofollow sponsored" for SEO compliance.
 * Includes tooltip disclosure for FTC compliance.
 * TODO: Replace href with real affiliate tracking links.
 */
import React, { useState } from "react";
import { ExternalLink, Info } from "lucide-react";

export default function AffiliateButton({ href, name, variant = "primary", size = "md", className = "" }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg font-semibold"
  };

  const variantClasses = {
    primary: "affiliate-btn-shimmer text-white rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40",
    outline: "border border-indigo-500/40 text-indigo-400 hover:bg-indigo-500/10 rounded-xl",
    ghost: "text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 rounded-lg"
  };

  return (
    <span className="relative inline-flex items-center gap-2">
      <a
        href={href} // TODO: Replace with real affiliate tracking link
        target="_blank"
        rel="nofollow sponsored noopener"
        className={`inline-flex items-center gap-2 font-medium transition-all ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      >
        Visit {name}
        <ExternalLink className="w-4 h-4" />
      </a>
      <button
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowTooltip(!showTooltip)}
        className="text-gray-500 hover:text-gray-400"
        aria-label="Affiliate disclosure"
      >
        <Info className="w-3.5 h-3.5" />
      </button>
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 border border-gray-700 text-xs text-gray-300 rounded-lg whitespace-nowrap z-50 shadow-xl">
          We may earn a commission if you purchase through this link.
        </div>
      )}
    </span>
  );
}