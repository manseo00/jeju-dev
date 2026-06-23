import type { Metadata, Viewport } from 'next';
import './globals.css';
import SiteHeader from '@/components/SiteHeader';
import shell from '@/components/site-layout.module.css';

export const metadata: Metadata = {
  title: '디바이스 등록',
  description: 'QR 기반 디바이스 등록 페이지',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <div className={shell.appShell}>
          <SiteHeader />
          <main className={shell.main}>{children}</main>
        </div>
      </body>
    </html>
  );
}
