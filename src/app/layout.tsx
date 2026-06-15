import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type React from "react";
import { Providers } from "@/shared/lib/provider";

const SITE_URL = "https://sspzoa.io";
const SITE_TITLE = "Seungpyo Suh";
const SITE_DESCRIPTION =
  "서승표(Seungpyo Suh) 풀스택 엔지니어 포트폴리오입니다. 경력, 프로젝트, 수상 이력, 기술 스택 등을 확인할 수 있습니다.";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: SITE_TITLE,
    locale: "ko_KR",
    type: "website",
    images: ["/opengraph-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "Seungpyo Suh", url: SITE_URL }],
  creator: "Seungpyo Suh",
  publisher: "Seungpyo Suh",
  keywords: ["Seungpyo Suh", "서승표", "풀스택 엔지니어", "Full-Stack Engineer", "포트폴리오", "Portfolio"],
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#6d87a8" },
    { media: "(prefers-color-scheme: dark)", color: "#8faff5" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Seungpyo Suh",
    alternateName: "서승표",
    jobTitle: "Full-Stack Engineer",
    url: SITE_URL,
    image: `${SITE_URL}/photo.jpg`,
    sameAs: ["https://github.com/sspzoa", "https://linkedin.com/in/seungpyosuh", "https://www.instagram.com/seuungpyo"],
  };

  return (
    <html lang="ko">
      <body className="antialiased">
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD schema is fully controlled, hardcoded data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
