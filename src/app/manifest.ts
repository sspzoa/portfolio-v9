import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Seungpyo Suh",
    short_name: "Seungpyo Suh",
    description: "Full-Stack Engineer",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#6d87a8",
    icons: [
      {
        src: "/sspzoa_logo.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
