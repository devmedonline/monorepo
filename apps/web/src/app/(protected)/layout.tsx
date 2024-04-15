export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="bg-blue-500 h-screen w-screen">{children}</div>;
}
