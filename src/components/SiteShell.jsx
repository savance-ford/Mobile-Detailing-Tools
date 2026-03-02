'use client';

/**
 * SiteShell
 *
 * Replaces the original Vite/React-Router Layout.
 * - Uses Next.js <Link/>
 * - Uses the current pathname to highlight active nav
 */

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sparkles } from 'lucide-react';
import { createPageUrl } from '@/utils';

const navLinks = [
  { label: 'Tools', page: 'Compare', match: (p) => p === '/tools' || p.startsWith('/tools/') },
  { label: 'Categories', page: 'Categories', match: (p) => p === '/categories' || p.startsWith('/categories/') },
  { label: 'Guides', page: 'Guides', match: (p) => p === '/guides' || p.startsWith('/guides/') },
  { label: 'Best For', page: 'BestFor', match: (p) => p === '/best' || p.startsWith('/best/') },
  { label: 'VS Comparisons', page: 'VSIndex', match: (p) => p === '/vs' || p.startsWith('/vs/') },
];

export default function SiteShell({ children }) {
  const pathname = usePathname() || '/';
  const [mobileOpen, setMobileOpen] = useState(false);

  const activePage = useMemo(() => {
    const found = navLinks.find((l) => l.match?.(pathname));
    return found?.page ?? (pathname === '/' ? 'Home' : '');
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[#0f1117] text-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0f1117]/80 backdrop-blur-xl border-b border-[#2a2e3b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href={createPageUrl('Home')} className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-indigo-400" />
              </div>
              <span className="font-bold text-lg text-white">DetailerStack</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.page}
                  href={createPageUrl(link.page)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activePage === link.page
                      ? 'text-indigo-400 bg-indigo-500/10'
                      : 'text-gray-400 hover:text-white hover:bg-[#1f2330]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-gray-400"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="md:hidden border-t border-[#2a2e3b] bg-[#0f1117] px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.page}
                href={createPageUrl(link.page)}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-[#1f2330]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>

      {/* Footer */}
      <footer className="border-t border-[#2a2e3b] mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Categories</h4>
              <div className="space-y-2">
                <Link href={createPageUrl('CategoryDetail?slug=software-business-tools')} className="block text-sm text-gray-400 hover:text-indigo-400">
                  Software & Business
                </Link>
                <Link href={createPageUrl('CategoryDetail?slug=detailing-auto-software')} className="block text-sm text-gray-400 hover:text-indigo-400">
                  Detailing Software
                </Link>
                <Link href={createPageUrl('CategoryDetail?slug=equipment-supplies')} className="block text-sm text-gray-400 hover:text-indigo-400">
                  Equipment & Supplies
                </Link>
                <Link href={createPageUrl('CategoryDetail?slug=marketing-customer-acquisition')} className="block text-sm text-gray-400 hover:text-indigo-400">
                  Marketing Tools
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Popular Tools</h4>
              <div className="space-y-2">
                <Link href={createPageUrl('ToolDetail?slug=jobber')} className="block text-sm text-gray-400 hover:text-indigo-400">
                  Jobber
                </Link>
                <Link href={createPageUrl('ToolDetail?slug=housecall-pro')} className="block text-sm text-gray-400 hover:text-indigo-400">
                  Housecall Pro
                </Link>
                <Link href={createPageUrl('ToolDetail?slug=mobiletech-rx')} className="block text-sm text-gray-400 hover:text-indigo-400">
                  MobileTech RX
                </Link>
                <Link href={createPageUrl('ToolDetail?slug=square')} className="block text-sm text-gray-400 hover:text-indigo-400">
                  Square
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Guides</h4>
              <div className="space-y-2">
                <Link href={createPageUrl('GuideDetail?slug=how-to-start-mobile-detailing-business')} className="block text-sm text-gray-400 hover:text-indigo-400">
                  Start a Detailing Business
                </Link>
                <Link href={createPageUrl('GuideDetail?slug=best-crm-mobile-detailing')} className="block text-sm text-gray-400 hover:text-indigo-400">
                  Best CRM Guide
                </Link>
                <Link href={createPageUrl('Guides')} className="block text-sm text-gray-400 hover:text-indigo-400">
                  All Guides
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Legal</h4>
              <div className="space-y-2">
                <Link href={createPageUrl('AffiliateDisclosure')} className="block text-sm text-gray-400 hover:text-indigo-400">
                  Affiliate Disclosure
                </Link>
                <Link href={createPageUrl('Privacy')} className="block text-sm text-gray-400 hover:text-indigo-400">
                  Privacy Policy
                </Link>
                <Link href={createPageUrl('Terms')} className="block text-sm text-gray-400 hover:text-indigo-400">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-8 border-t border-[#2a2e3b] text-sm text-gray-500 text-center">
            <p>© {new Date().getFullYear()} DetailerStack. All rights reserved.</p>
            <p className="mt-1">
              DetailerStack is an affiliate site. We may earn commissions from qualifying purchases.{' '}
              <Link href={createPageUrl('AffiliateDisclosure')} className="text-indigo-400 hover:underline">
                Learn more
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
