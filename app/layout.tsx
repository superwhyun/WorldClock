import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Footer from '@/components/footer'
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
  title: 'World Clock - 세계시계',
  description: '전 세계 주요 도시의 실시간 시간을 확인하세요. 드래그 앤 드롭으로 순서 변경, URL 공유 기능 제공.',
  generator: 'World Clock App',
  keywords: '세계시계, 시간대, 타임존, world clock, timezone',
  authors: [{ name: 'superwhyun', url: 'https://github.com/superwhyun' }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
