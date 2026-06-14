import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Seungpyo Suh";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logo = readFileSync(join(process.cwd(), "public/sspzoa_logo.svg"));
const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
      }}>
      {/* biome-ignore lint/performance/noImgElement: satori requires <img> */}
      <img src={logoSrc} width={320} height={320} style={{ borderRadius: 72 }} alt="" />
    </div>,
    { ...size },
  );
}
