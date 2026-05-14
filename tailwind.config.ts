import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}", "./context/**/*.md"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        "background-soft": "var(--background-soft)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        "muted-light": "var(--muted-light)",
        border: "var(--border)",
        primary: "var(--primary)",
        "primary-light": "var(--primary-light)",
        "primary-hover": "var(--primary-hover)",
        "primary-dark": "var(--primary-dark)",
        surface: "var(--surface)",
        "surface-muted": "var(--surface-muted)",
        success: "var(--success)",
        warning: "var(--warning)",
        danger: "var(--danger)",
      },
      fontFamily: {
        sans: ["var(--font-hanken-grotesk)"],
        serif: ["var(--font-trirong)"],
        ui: ["var(--font-ui)"],
        mono: ["var(--font-geist-mono)"],
      },
      spacing: {
        page: "var(--spacing-page)",
        section: "var(--spacing-section)",
        "section-sm": "var(--spacing-section-sm)",
      },
      borderRadius: {
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        pill: "var(--radius-pill)",
        card: "var(--radius-card)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        logo: "var(--shadow-logo)",
        modal: "var(--shadow-modal)",
      },
      backgroundImage: {
        "button-gradient": "var(--gradient-button)",
        "button-gradient-hover": "var(--gradient-button-hover)",
        "primary-gradient": "var(--gradient-primary)",
      },
    },
  },
};

export default config;
