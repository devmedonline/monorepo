import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useRedirectAfterAuth() {
  const router = useRouter();
  const pathname = usePathname()
  const query = useSearchParams();

  const redirectTo = query.get('redirectTo') || '/profile';

  const redirect = () => {
    if (pathname === redirectTo) {
      router.refresh();
      return;
    } 

    if (pathname === '/register') {
      router.replace('/login');
      return;
    }

    router.replace(redirectTo);
  };

  return {
    redirectAfterAuth: redirect,
    redirectTo,
  };
}
