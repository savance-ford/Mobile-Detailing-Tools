import Terms from '@/views/Terms';

import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/jsonld";

export function generateMetadata() {
  return buildMetadata({
    title: "Terms of Service",
    description: "Review the terms and conditions for using DetailerStack.",
    path: "/terms",
    type: "website",
  });
}

export default function Page() {
  const path = "/terms";
  const pageName = "Terms of Service";
  const description = "Terms and conditions for using DetailerStack.";

  return (
    <>
      <JsonLd data={webPageJsonLd({ path, name: pageName, description })} />
      <JsonLd
        data={breadcrumbJsonLd({
          path,
          items: [
            { name: "Home", path: "/" },
            { name: "Terms", path },
          ],
        })}
      />
      <Terms />
    </>
  );
}
