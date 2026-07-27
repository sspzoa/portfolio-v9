import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Layer 2 semantic tokens only. Layer 1 primitives (--solid-*) stay in
      // globals.css and are referenced exclusively by these semantic tokens.
      colors: {
        background: {
          standard: {
            primary: "var(--background-standard-primary)",
            secondary: "var(--background-standard-secondary)",
          },
          inverted: {
            primary: "var(--background-inverted-primary)",
            secondary: "var(--background-inverted-secondary)",
          },
        },
        content: {
          standard: {
            primary: "var(--content-standard-primary)",
            secondary: "var(--content-standard-secondary)",
            tertiary: "var(--content-standard-tertiary)",
            quaternary: "var(--content-standard-quaternary)",
          },
          inverted: {
            primary: "var(--content-inverted-primary)",
            secondary: "var(--content-inverted-secondary)",
            tertiary: "var(--content-inverted-tertiary)",
            quaternary: "var(--content-inverted-quaternary)",
          },
        },
        line: {
          divider: "var(--line-divider)",
          outline: "var(--line-outline)",
        },
        components: {
          fill: {
            standard: {
              primary: "var(--components-fill-standard-primary)",
              secondary: "var(--components-fill-standard-secondary)",
              tertiary: "var(--components-fill-standard-tertiary)",
            },
            inverted: {
              primary: "var(--components-fill-inverted-primary)",
              secondary: "var(--components-fill-inverted-secondary)",
              tertiary: "var(--components-fill-inverted-tertiary)",
            },
          },
          interactive: {
            hover: "var(--components-interactive-hover)",
            focused: "var(--components-interactive-focused)",
            pressed: "var(--components-interactive-pressed)",
          },
          translucent: {
            primary: "var(--components-translucent-primary)",
            secondary: "var(--components-translucent-secondary)",
            tertiary: "var(--components-translucent-tertiary)",
          },
        },
        core: {
          accent: "var(--core-accent)",
          "accent-strong": "var(--core-accent-strong)",
          "accent-translucent": "var(--core-accent-translucent)",
        },
      },
      fontFamily: {
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        "label-wide": "0.22em",
      },
      fontSize: {
        // Fluid hero — single token replaces the old hero-{sm,md,lg} steps.
        hero: ["clamp(2.75rem, 2rem + 4vw, 4.5rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        title: ["24px", { lineHeight: "34px", letterSpacing: "-0.02em" }],
        heading: ["20px", { lineHeight: "28px", letterSpacing: "-0.02em" }],
        body: ["16px", { lineHeight: "27px", letterSpacing: "-0.01em" }],
        label: ["14px", { lineHeight: "22px", letterSpacing: "-0.01em" }],
        footnote: ["12px", { lineHeight: "18px", letterSpacing: "0" }],
      },
      spacing: {
        "spacing-50": "2px",
        "spacing-100": "4px",
        "spacing-150": "6px",
        "spacing-200": "8px",
        "spacing-300": "12px",
        "spacing-400": "16px",
        "spacing-500": "20px",
        "spacing-550": "24px",
        "spacing-600": "28px",
        "spacing-700": "32px",
        "spacing-750": "36px",
        "spacing-800": "40px",
        "spacing-850": "48px",
        "spacing-900": "64px",
        "spacing-950": "72px",
        "spacing-1000": "80px",
      },
      maxWidth: {
        content: "var(--content-max)",
      },
      borderRadius: {
        "radius-sm": "6px",
        "radius-md": "12px",
        "radius-lg": "20px",
        "radius-full": "9999px",
      },
      transitionDuration: {
        fast: "var(--duration-fast)",
        base: "var(--duration-base)",
        slow: "var(--duration-slow)",
      },
      transitionTimingFunction: {
        standard: "var(--ease-standard)",
      },
    },
  },
  plugins: [],
};

export default config;
