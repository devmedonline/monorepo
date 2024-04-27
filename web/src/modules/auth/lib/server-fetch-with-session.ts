import { getServerSession } from "./get-server-session";

export async function fetchWithServerSession(
  request: RequestInfo,
  init?: RequestInit
): Promise<Response> {
  const session = await getServerSession();
  const headers = new Headers(init?.headers);
  headers.set("Authorization", `Bearer ${session?.backendTokens.accessToken}`);
  headers.set("Refresh", `Bearer ${session?.backendTokens.refreshToken}`);

  const reformedReq =
    typeof request === "string" ? process.env.API_URL + request : request;

  return fetch(reformedReq, { ...init, headers });
}
