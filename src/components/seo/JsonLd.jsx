/**
 * JsonLd
 *
 * Renders a JSON-LD <script> tag for structured data.
 *
 * Usage:
 *   <JsonLd data={schemaObject} />
 *
 * Notes:
 * - Keep data factual and derived from your real content.
 * - This is a Server Component (no 'use client').
 */

export default function JsonLd({ data }) {
  if (!data) return null;

  return (
    <script
      type="application/ld+json"
      // Google expects raw JSON in the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
