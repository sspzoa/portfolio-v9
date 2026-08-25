import { ImageResponse } from "next/og";

export const alt = "Seungpyo Suh — Product Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const COLORS = {
  canvas: "#ffffff",
  primary: "#1c1d21",
  secondary: "rgba(28, 29, 33, 0.78)",
  tertiary: "rgba(28, 29, 33, 0.62)",
  quaternary: "rgba(28, 29, 33, 0.34)",
  divider: "rgba(121, 123, 138, 0.16)",
};

const AFFILIATIONS = [
  { label: "work", value: "HORANG EDU Corp." },
  { label: "school", value: "DGU Business School '26" },
  { label: "alumni", value: "KDMHS Hacking Defence 22nd" },
] as const;

async function loadFont(weight: 400 | 700): Promise<ArrayBuffer> {
  const file = weight === 700 ? "JetBrainsMono-Bold.ttf" : "JetBrainsMono-Regular.ttf";
  const response = await fetch(`https://cdn.jsdelivr.net/gh/JetBrains/JetBrainsMono@2.304/fonts/ttf/${file}`);
  if (!response.ok) {
    throw new Error(`Failed to load ${file}: ${response.status}`);
  }
  return response.arrayBuffer();
}

export default async function OpengraphImage() {
  const [regular, bold] = await Promise.all([loadFont(400), loadFont(700)]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: COLORS.canvas,
        color: COLORS.primary,
        fontFamily: "JetBrains Mono",
        padding: "72px 80px",
      }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", color: COLORS.tertiary, fontSize: 24, lineHeight: 1.4 }}>$ whoami</div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>
          Seungpyo Suh
          <span style={{ color: COLORS.quaternary }}>_</span>
        </div>
        <div style={{ display: "flex", marginTop: 16, color: COLORS.secondary, fontSize: 28, lineHeight: 1.4 }}>
          Product Engineer
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {AFFILIATIONS.map((item) => (
          <div
            key={item.label}
            style={{
              display: "flex",
              alignItems: "center",
              borderTop: `1px solid ${COLORS.divider}`,
              padding: "18px 0",
            }}>
            <div
              style={{ display: "flex", width: 180, color: COLORS.tertiary, fontSize: 22 }}>{`## ${item.label}`}</div>
            <div style={{ display: "flex", alignItems: "center", fontSize: 22 }}>
              <span style={{ color: COLORS.quaternary, marginRight: 12 }}>[+]</span>
              <span>{item.value}</span>
            </div>
          </div>
        ))}
        <div
          style={{
            display: "flex",
            borderTop: `1px solid ${COLORS.divider}`,
            paddingTop: 22,
            color: COLORS.tertiary,
            fontSize: 20,
          }}>
          sspzoa.io
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "JetBrains Mono", data: regular, weight: 400, style: "normal" },
        { name: "JetBrains Mono", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
