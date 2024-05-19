import { SignInData } from "@/shared/types/next-auth";
import { JWT } from "next-auth/jwt";

type RefreshTokenResponse = Pick<SignInData, "backendTokens">;

export async function fetchRefreshToken(token: JWT): Promise<JWT> {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Refresh: "Bearer " + token.refreshToken,
      },
    }
  );

  if (response.ok) {
    const ok: RefreshTokenResponse = await response.json();
    console.log("ok", ok);

    return {
      ...token,
      backendTokens: ok.backendTokens,
    };
  }

  const failed = await response.json();

  const intl = new Intl.ListFormat("pt-BR", {
    style: "long",
    type: "conjunction",
  });

  throw new Error(intl.format(failed.message));
}
