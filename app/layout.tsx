import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { AppHeader } from "@/components/app-header"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CRM Dashboard - Lead & Call Management',
  description: 'Modern CRM application for tracking leads and managing customer calls',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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
