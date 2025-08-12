'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2 } from 'lucide-react';
import { MobileNav } from '@/components/mobile-nav';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function AppHeader() {
  const pathname = usePathname();
  const isLandingPage = pathname === '/';

  if (isLandingPage) {
    return (
      <header className="border-b sticky top-0 z-[200] brightness-125 backdrop-blur-xl drop-shadow-2xl shadow-2xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Building2 className="size-4" />
              </div>
              <span className="font-bold text-xl">FieldPulse CRM</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="#features"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="#about"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                About
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <div className="hidden sm:flex items-center gap-4">
                <Button variant="ghost" asChild>
                  <Link href="/dashboard">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/dashboard">Get Started</Link>
                </Button>
              </div>

              {/* Mobile menu for landing page */}
              <div className="md:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Building2 className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link href="#features">Features</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="#pricing">Pricing</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="#about">About</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">Sign In</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">Get Started</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="border-b supports-[backdrop-filter]:bg-background/60 sticky top-0 z-[200] brightness-150 backdrop-blur-2xl drop-shadow-2xl md:hidden">
      <div className="container flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <MobileNav />
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex aspect-square size-6 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Building2 className="size-3" />
            </div>
            <span className="font-semibold text-sm">FieldPulse CRM</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Avatar className="h-7 w-7">
                  <AvatarImage
                    src="/placeholder.svg?height=28&width=28"
                    alt="User"
                  />
                  <AvatarFallback className="text-xs">JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Help & Support</DropdownMenuItem>
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
