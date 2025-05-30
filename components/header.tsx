"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  CalendarIcon, 
  LogOut, 
  Menu, 
  Moon, 
  Settings, 
  Sun, 
  User,
  HelpCircle,
  Bell,
  BarChart2,
  Users,
  BookOpen,
  MessageSquare,
} from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { useTheme } from "next-themes";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function Header() {
  const { user, logout } = useAuth();
  const { setTheme } = useTheme();

  return (
    <header className="border-b sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <MobileNav />
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2">
            <CalendarIcon className="h-6 w-6" />
            <span className="font-bold text-xl">EventEase</span>
          </Link>
        </div>
        
        {/* Center-aligned navigation */}
        <nav className="hidden md:flex items-center gap-6 absolute left-1/2 transform -translate-x-1/2">
          <Link
            href="/dashboard"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="text-sm font-medium transition-colors hover:text-primary">
              Events
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href="/events">All Events</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/events/new">Create Event</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/events?status=draft">Drafts</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/events?status=published">Published</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger className="text-sm font-medium transition-colors hover:text-primary">
              Analytics
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href="/analytics/overview">Overview</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/analytics/attendance">Attendance</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/analytics/revenue">Revenue</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {user?.role === "admin" && (
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-medium transition-colors hover:text-primary">
                Admin
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/admin/users">Users</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin/logs">Logs</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-600"></span>
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/help">
              <HelpCircle className="h-5 w-5" />
              <span className="sr-only">Help</span>
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/billing">
                    <BarChart2 className="mr-2 h-4 w-4" />
                    Billing
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="default">
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

function MobileNav() {
  const { user, logout } = useAuth();
  
  return (
    <div className="flex flex-col gap-4 py-4">
      <Link
        href="/dashboard"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Dashboard
      </Link>
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">Events</p>
        <div className="flex flex-col gap-2 pl-2">
          <Link href="/events" className="text-sm hover:text-primary">All Events</Link>
          <Link href="/events/new" className="text-sm hover:text-primary">Create Event</Link>
          <Link href="/events?status=draft" className="text-sm hover:text-primary">Drafts</Link>
          <Link href="/events?status=published" className="text-sm hover:text-primary">Published</Link>
        </div>
      </div>
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">Analytics</p>
        <div className="flex flex-col gap-2 pl-2">
          <Link href="/analytics/overview" className="text-sm hover:text-primary">Overview</Link>
          <Link href="/analytics/attendance" className="text-sm hover:text-primary">Attendance</Link>
          <Link href="/analytics/revenue" className="text-sm hover:text-primary">Revenue</Link>
        </div>
      </div>
      {user?.role === "admin" && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">Admin</p>
          <div className="flex flex-col gap-2 pl-2">
            <Link href="/admin/users" className="text-sm hover:text-primary">Users</Link>
            <Link href="/admin/settings" className="text-sm hover:text-primary">Settings</Link>
            <Link href="/admin/logs" className="text-sm hover:text-primary">Logs</Link>
          </div>
        </div>
      )}
      <div className="pt-4 mt-auto">
        {user ? (
          <Button 
            variant="ghost" 
            className="w-full justify-start" 
            onClick={() => logout()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </Button>
        ) : (
          <Button asChild variant="default" className="w-full">
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </div>
  );
}