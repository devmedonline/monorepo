import GlobalProviders from '@/shared/components/global-providers';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Med App',
  description: 'Aprenda mais sobre medicina',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <GlobalProviders>{children}</GlobalProviders>
      </body>
    </html>
  );
}
