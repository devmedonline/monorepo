import { NavHeader } from '@/modules/layout/components/nav-header';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-red-500 h-screen w-screen">
      <NavHeader />
      {children}
    </div>
  );
}
