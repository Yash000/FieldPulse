"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LayoutDashboard, Users, Phone, Settings, Menu, Building2 } from 'lucide-react'

const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Leads",
    url: "/leads",
    icon: Users,
  },
  {
    title: "Calls",
    url: "/calls",
    icon: Phone,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2 px-2 py-4 border-b">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Building2 className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">CRM Pro</span>
              <span className="truncate text-xs text-muted-foreground">Lead Management</span>
            </div>
          </div>
          
          <nav className="flex-1 px-2 py-4">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.url}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                    pathname === item.url
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              ))}
            </div>
          </nav>

          <div className="border-t px-2 py-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Leads</span>
                <span className="font-medium">1,247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Active Calls</span>
                <span className="font-medium">23</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Conversion</span>
                <span className="font-medium">18.5%</span>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
