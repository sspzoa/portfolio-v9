import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Seungpyo Suh",
    short_name: "Seungpyo Suh",
    description: "Product Engineer",
    start_url: "/",
    display: "standalone",
    background_color: "#fdfcfc",
    theme_color: "#201d1d",
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
