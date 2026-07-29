export const ThemeColors = {
  primary: "#22C55E",
  deepGreen: "#0D3B2E",
  sage: "#6B8C7A",
  white: "#FFFFFF",
  mist: "#E5EDE8",
  mint: "#F0FDF4",
  snow: "#F6F3EC",
  black: "#000000",
  aquaMint: "#D1FAE5",
  forest: "#2D4A38",
} as const;

export type ThemeColorName = keyof typeof ThemeColors;
