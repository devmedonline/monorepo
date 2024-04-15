export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="bg-red-500 h-screen w-screen">{children}</div>;
}
