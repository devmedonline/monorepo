import { cookies } from "next/headers";
import { THEME_STORAGE_KEY } from "../constants/theme";

export const themeCookieJar = () => {
  const cookieJar = cookies();

  return {
    getTheme() {
      const currentTheme = cookieJar.get(THEME_STORAGE_KEY);

      let theme = "light";

      if (currentTheme?.value === "dark" || currentTheme?.value === "light") {
        theme = currentTheme.value;
      }

      return theme;
    },
    setTheme(theme: string) {
      const finalTheme = theme === "dark" ? "dark" : "light";

      const ONE_YEAR = 60 * 60 * 24 * 365;

      cookieJar.set(THEME_STORAGE_KEY, finalTheme, {
        path: "/",
        maxAge: ONE_YEAR,
      });
    },
  };
};
