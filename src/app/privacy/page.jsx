import Privacy from '@/views/Privacy';

import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/jsonld";

export function generateMetadata() {
  return buildMetadata({
    title: "Privacy Policy",
    description: "Read how we collect, use, and protect information when you use DetailerStack.",
    path: "/privacy",
    type: "website",
  });
}

export default function Page() {
  const path = "/privacy";
  const pageName = "Privacy Policy";
  const description = "Read how we collect, use, and protect information when you use DetailerStack.";

  return (
    <>
      <JsonLd data={webPageJsonLd({ path, name: pageName, description })} />
      <JsonLd
        data={breadcrumbJsonLd({
          path,
          items: [
            { name: "Home", path: "/" },
            { name: "Privacy Policy", path },
          ],
        })}
      />
      <Privacy />
    </>
  );
}
