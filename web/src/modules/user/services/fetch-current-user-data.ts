import { fetchApi } from "@/shared/lib/fetch-api";
import { CurrentUserData } from "../types/user";

export async function fetchCurrentUserData(): Promise<CurrentUserData> {
  const response = await fetchApi<CurrentUserData>("/user/me");

  if (!response.data) {
    console.error("Failed to fetch user data", response);
    throw new Error("Failed to fetch user data");
  }

  return response.data;
}
