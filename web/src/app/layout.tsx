import GlobalProviders from "@/shared/components/global-providers";
import { cn } from "@/shared/lib/utils";
import type { Metadata, Viewport } from "next";
import { Poppins as FontSans } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  height: "device-height",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Med App",
  description: "Aprenda mais sobre medicina",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body
        style={{
          ["--font-sans" as any]: fontSans.style.fontFamily,
        }}
        className={cn(
          "min-h-screen w-dvw overflow-x-hidden bg-background font-sans antialiased",
          fontSans.className
        )}
      >
        <GlobalProviders>{children}</GlobalProviders>
      </body>
    </html>
  );
}
