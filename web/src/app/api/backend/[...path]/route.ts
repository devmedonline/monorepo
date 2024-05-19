import { getServerSession } from "@/modules/auth/lib/get-server-session";

export const dynamic = "force-dynamic";
export async function handler(request: Request): Promise<Response> {
  const REAL_API_URL = process.env.REAL_API_URL as string;
  const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL as string;

  const replacedUrl = request.url
    .toString()
    .replace(NEXT_PUBLIC_API_URL, REAL_API_URL);

  const session = await getServerSession();

  const headers = new Headers(request.headers);

  if (session) {
    headers.set("Authorization", `Bearer ${session.backendTokens.accessToken}`);
    headers.set("Refresh", `Bearer ${session.backendTokens.refreshToken}`);
  }

  const newRequest = new Request(replacedUrl, {
    method: request.method,
    headers,
    body: request.body,
    cache: request.cache,
    credentials: request.credentials,
    integrity: request.integrity,
    keepalive: request.keepalive,
    mode: request.mode,
    redirect: request.redirect,
    referrer: request.referrer,
    referrerPolicy: request.referrerPolicy,
    signal: request.signal,
    // @ts-ignore - RequestInit no node tem esse atributo e sem ele tudo quebra (https://github.com/nodejs/node/issues/46221)
    duplex: "half",
  });

  return fetch(newRequest);
}

export {
  handler as DELETE,
  handler as GET,
  handler as HEAD,
  handler as OPTIONS,
  handler as PATCH,
  handler as POST,
  handler as PUT,
};
