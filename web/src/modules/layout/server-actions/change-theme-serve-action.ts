"use server";
import { themeCookieJar } from "../lib/theme-cookie";

export async function changeThemeServerAction(formData: FormData) {
  const theme = formData.get("theme") as string;

  const { setTheme } = themeCookieJar();

  setTheme(theme);
}
