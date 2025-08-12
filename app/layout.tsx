import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { AppHeader } from "@/components/app-header"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import type { Viewport } from 'next'
import { PWAInstallPrompt } from '@/components/pwa-install-prompt'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CRM Dashboard - Lead & Call Management',
  description: 'Modern CRM application for tracking leads and managing customer calls',
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "CRM Pro",
  },
  formatDetection: {
    telephone: false,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'rgb(0,188,125)' },
    { media: '(prefers-color-scheme: dark)', color: '#555555' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="application-name" content="CRM Pro" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="CRM Pro" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        <link rel="apple-touch-icon" href="/placeholder.svg?height=180&width=180" />
        <link rel="icon" type="image/svg+xml" href="/placeholder.svg?height=32&width=32" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="shortcut icon" href="/placeholder.svg?height=32&width=32" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppHeader />
          <AppLayoutContent>{children}</AppLayoutContent>
        </ThemeProvider>
      </body>
    </html>
  )
}

function AppLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="hidden md:block">
        <AppSidebar />
      </div>
      <main className="flex-1 md:p-6 lg:p-8">
        {children}
      </main>
    </SidebarProvider>
  )
}
