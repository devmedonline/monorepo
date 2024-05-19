import { SignInButtonList } from "@/modules/auth/components/sign-in-button";
import { LucideBriefcaseMedical } from "lucide-react";
import Link from "next/link";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="sticky top-0 flex items-center justify-between h-[--header-height] bg-card border-b px-4">
        <Link href="/">
          <h1 className="text-xl font-semibold">
            <LucideBriefcaseMedical className="w-6 h-6 mr-2 inline-block" />
            <span>Med App</span>
          </h1>
        </Link>

        <SignInButtonList />
      </header>

      <div className="min-h-[--view-height] h-fit py-4 container">
        {children}
      </div>
    </>
  );
}
