export const THEME = {
  LIGHT: "light",
  DARK: "dark",
} as const;

export type Theme = (typeof THEME)[keyof typeof THEME];

export const THEME_STORAGE_KEY = "med-app-theme";
