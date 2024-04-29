import { fetchWithServerSession } from "@/modules/auth/lib/server-fetch-with-session";
import { CurrentUserData } from "../types/user";

export async function fetchCurrentUserData(): Promise<CurrentUserData> {
  const response = await fetchWithServerSession("/user/me");

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  return response.json().then((json) => {
    return {
      id: json.data.id,
      email: json.data.email,
      name: json.data.name,
      avatar: json.data.avatar,
      permissions: json.data.permissions,
      verified: json.data.verified,
    };
  });
}
