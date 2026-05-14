export const designSystem = {
  colors: {
    background: "#FFF9F3",
    backgroundSoft: "#FAF3EB",
    foreground: "#141110",
    muted: "#666464",
    mutedLight: "#959493",
    border: "#E8E3E1",
    primary: "#F84906",
    primaryLight: "#FEEDE6",
    primaryHover: "#FEE4DA",
    primaryDark: "#571A04",
    surface: "#FFFFFF",
  },
  fonts: {
    body: "Hanken Grotesk",
    heading: "Trirong",
    ui: "Inter",
  },
  layout: {
    container: 1200,
    desktopPagePadding: 120,
    navbarHeight: 72,
  },
  radius: {
    input: 12,
    card: 16,
    pill: 999,
  },
} as const;
