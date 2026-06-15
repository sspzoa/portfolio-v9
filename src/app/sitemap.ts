import type { MetadataRoute } from "next";

// Update this date when the résumé content changes meaningfully.
const LAST_MODIFIED = "2026-06-15";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://sspzoa.io",
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
