// HoaxShield Design Tokens
export const COLORS = {
  // Primary palette
  darkBlue: "#0B1628",
  deepBlue: "#0F2145",
  primaryBlue: "#1E6FFF",
  lightBlue: "#4DA3FF",
  accentBlue: "#60B8FF",
  skyBlue: "#A8D8FF",

  // Neutrals
  white: "#FFFFFF",
  offWhite: "#F8FAFC",
  slate50: "#F1F5F9",
  slate100: "#E2E8F0",
  slate200: "#CBD5E1",
  slate300: "#94A3B8",
  slate400: "#64748B",
  slate500: "#475569",
  slate700: "#334155",
  slate800: "#1E293B",
  slate900: "#0F172A",

  // Status colors
  hoaxRed: "#EF4444",
  hoaxRedBg: "rgba(239, 68, 68, 0.12)",
  hoaxRedBorder: "rgba(239, 68, 68, 0.3)",
  trueGreen: "#22C55E",
  trueGreenBg: "rgba(34, 197, 94, 0.12)",
  trueGreenBorder: "rgba(34, 197, 94, 0.3)",
  verifyYellow: "#F59E0B",
  verifyYellowBg: "rgba(245, 158, 11, 0.12)",
  verifyYellowBorder: "rgba(245, 158, 11, 0.3)",

  // Glass & overlay
  glassBg: "rgba(255, 255, 255, 0.08)",
  glassBorder: "rgba(255, 255, 255, 0.12)",
  glassBgLight: "rgba(255, 255, 255, 0.85)",
  glassBorderLight: "rgba(255, 255, 255, 0.5)",
  overlayDark: "rgba(11, 22, 40, 0.6)",

  // Glow
  blueGlow: "rgba(30, 111, 255, 0.4)",
  blueGlowStrong: "rgba(30, 111, 255, 0.6)",
} as const;

export const SHADOWS = {
  card: "0 4px 24px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04)",
  cardHover: "0 8px 40px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06)",
  glow: `0 0 30px ${COLORS.blueGlow}, 0 0 60px rgba(30, 111, 255, 0.2)`,
  glowStrong: `0 0 40px ${COLORS.blueGlowStrong}, 0 0 80px rgba(30, 111, 255, 0.3)`,
  button: `0 4px 16px rgba(30, 111, 255, 0.3)`,
} as const;
