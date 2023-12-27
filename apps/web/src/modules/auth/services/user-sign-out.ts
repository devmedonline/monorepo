import { apiClient } from "@/modules/http-client/lib/client";

export type UserSignOutResult = {
  message: string;
};

export async function userSignOut(): Promise<UserSignOutResult> {
  await apiClient.post({
    path: "/auth/login",
    guard: (data): data is UserSignOutResult => {
      return "message" in data;
    },
  });
  
  return { message: `Até a próxima!` };
}
