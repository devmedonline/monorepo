import { apiClient } from "@/modules/http-client/lib/client";

export type RequestEmailConfirmationReturn = { message: string };

export async function requestEmailConfirmation(): Promise<RequestEmailConfirmationReturn> {
  const response = await apiClient.post({
    path: "/email/activation",
    guard: (data): data is RequestEmailConfirmationReturn => {
      return "message" in data;
    },
  });

  return response.data;
}
