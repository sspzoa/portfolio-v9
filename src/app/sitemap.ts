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
    {
      url: "https://sspzoa.io/machine-readable",
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: "https://sspzoa.io/llms.txt",
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: "https://sspzoa.io/llms-full.txt",
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];
}
