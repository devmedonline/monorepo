import { SignInButton } from '@/modules/auth/components/sign-in-button';

export function NavHeader() {
  return (
    <header className="sticky top-0 h-20 w-full flex items-center justify-center p-2 bg-white text-black">
      <SignInButton />
    </header>
  );
}
