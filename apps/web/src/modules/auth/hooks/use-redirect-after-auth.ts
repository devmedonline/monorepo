import { useRouter, useSearchParams } from "next/navigation";

export function useRedirectAfterAuth() {
  const router = useRouter();
  const query = useSearchParams();

  const redirectTo = query.get("redirectTo") || "/";

  const redirect = () => {
    router.replace(redirectTo);
  };

  return {
    redirectAfterAuth: redirect,
    redirectTo,
  };
}
