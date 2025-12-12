import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type React from "react";
import { Providers } from "@/shared/lib/provider";

export const metadata: Metadata = {
  title: "Seungpyo Suh",
  description: "Mobile & Frontend Engineer",
  openGraph: {
    images: [{ url: "https://sspzoa.io/og-image.png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#6d87a8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <Analytics />
        <SpeedInsights />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
