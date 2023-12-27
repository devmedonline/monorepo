import { apiClient } from "@/modules/http-client/lib/client";

export type EmailActivationReturn = { message: string };

export async function emailActivation(token: string): Promise<EmailActivationReturn> {
  if (!token) {
    return { message: "Token ausente!" };
  }

  const response = await apiClient.post<EmailActivationReturn>({
    path: "/account/activation",
    init: { searchParams: { t: token } },
    guard: (data): data is EmailActivationReturn => {
      return "message" in data;
    },
  });

  return response.data;
}
