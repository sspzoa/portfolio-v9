import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type React from "react";
import { Providers } from "@/shared/lib/provider";

export const metadata: Metadata = {
  title: "Seungpyo Suh",
  description: "Mobile & Frontend Engineer",
  metadataBase: new URL("https://sspzoa.io"),
  openGraph: {
    title: "Seungpyo Suh",
    description: "Mobile & Frontend Engineer",
    url: "https://sspzoa.io",
    siteName: "Seungpyo Suh",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seungpyo Suh",
    description: "Mobile & Frontend Engineer",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://sspzoa.io",
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-spacing-400 focus:left-spacing-400 focus:z-50 focus:rounded-radius-400 focus:bg-content-standard-primary focus:px-spacing-400 focus:py-spacing-300 focus:text-background-standard-primary focus:text-label">
          본문으로 바로가기
        </a>
        <Analytics />
        <SpeedInsights />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
