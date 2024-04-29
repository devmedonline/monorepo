import { SignInButtonList } from "@/modules/auth/components/sign-in-button";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="sticky top-0 flex items-center justify-between h-[--header-height] bg-card border-b px-4">
        <h1 className="text-xl font-semibold">Med App</h1>

        <SignInButtonList />
      </header>

      <div className="min-h-[--view-height] h-fit py-4 container">
        {children}
      </div>
    </>
  );
}
