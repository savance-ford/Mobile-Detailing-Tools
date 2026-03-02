/**
 * createPageUrl
 *
 * Base44/Vite generators often used string routes like:
 *   createPageUrl("ToolDetail?slug=jobber")
 *
 * In this Next.js version we map those legacy routes to
 * clean App Router paths:
 *   /tools/jobber
 */

export function createPageUrl(pageName: string) {
  if (!pageName) return '/';

  // Split "Page?query" into pieces.
  const [rawPage, rawQuery] = pageName.split('?');
  const page = (rawPage || '').trim();
  const params = new URLSearchParams(rawQuery || '');

  // Home
  if (page.toLowerCase() === 'home') return '/';

  // Tools
  if (page === 'Compare') return '/tools';
  if (page === 'ToolDetail') {
    const slug = params.get('slug');
    return slug ? `/tools/${slug}` : '/tools';
  }

  // Categories
  if (page === 'Categories') return '/categories';
  if (page === 'CategoryDetail') {
    const slug = params.get('slug');
    return slug ? `/categories/${slug}` : '/categories';
  }

  // Guides
  if (page === 'Guides') return '/guides';
  if (page === 'GuideDetail') {
    const slug = params.get('slug');
    return slug ? `/guides/${slug}` : '/guides';
  }

  // VS
  if (page === 'VSIndex') return '/vs';
  if (page === 'VSDetail') {
    const slugs = params.get('slugs');
    return slugs ? `/vs/${slugs}` : '/vs';
  }

  // Best For
  if (page === 'BestFor') return '/best';
  if (page === 'BestForDetail') {
    const feature = params.get('feature');
    return feature ? `/best/${feature}` : '/best';
  }

  // Legal
  if (page === 'AffiliateDisclosure') return '/affiliate-disclosure';
  if (page === 'Privacy') return '/privacy';
  if (page === 'Terms') return '/terms';

  // Fallback: keep behavior close to old generator.
  return '/' + page.replace(/\s+/g, '-');
}
