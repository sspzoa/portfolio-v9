import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const logo = readFileSync(join(process.cwd(), "public/sspzoa_logo.svg"));
const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#6d87a8",
      }}>
      <img src={logoSrc} width={140} height={140} alt="" />
    </div>,
    { ...size },
  );
}
