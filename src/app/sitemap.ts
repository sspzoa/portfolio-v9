import type { MetadataRoute } from "next";

// Update this date when the résumé content changes meaningfully.
const LAST_MODIFIED = "2026-08-16";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://sspzoa.io",
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://sspzoa.io/portfolio",
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
