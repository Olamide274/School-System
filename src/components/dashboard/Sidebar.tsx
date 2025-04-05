
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

import {
  Book,
  Calendar,
  GraduationCap,
  HomeIcon,
  LayoutGrid,
  Library,
  Users,
  Layers,
  Clock,
  CreditCard,
  User,
  Settings,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  isMobile: boolean;
}

type NavItem = {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles?: string[];
};

export function Sidebar({ isMobile }: SidebarProps) {
  const { authState, logout } = useAuth();
  const userRole = authState.user?.role || 'student';

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: HomeIcon,
      roles: ['admin', 'teacher', 'student', 'parent'],
    },
    {
      title: "Students",
      href: "/students",
      icon: GraduationCap,
      roles: ['admin', 'teacher'],
    },
    {
      title: "Teachers",
      href: "/teachers",
      icon: Users,
      roles: ['admin'],
    },
    {
      title: "Classes",
      href: "/classes",
      icon: Layers,
      roles: ['admin', 'teacher'],
    },
    {
      title: "Subjects",
      href: "/subjects",
      icon: Book,
      roles: ['admin', 'teacher', 'student'],
    },
    {
      title: "Attendance",
      href: "/attendance",
      icon: Clock,
      roles: ['admin', 'teacher', 'student', 'parent'],
    },
    {
      title: "Timetable",
      href: "/timetable",
      icon: Calendar,
      roles: ['admin', 'teacher', 'student', 'parent'],
    },
    {
      title: "Library",
      href: "/library",
      icon: Library,
      roles: ['admin', 'teacher', 'student'],
    },
    {
      title: "Fees",
      href: "/fees",
      icon: CreditCard,
      roles: ['admin', 'parent'],
    },
    {
      title: "Profile",
      href: "/profile",
      icon: User,
      roles: ['admin', 'teacher', 'student', 'parent'],
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
      roles: ['admin'],
    },
  ];

  // Filter nav items by user role
  const filteredNavItems = navItems.filter(
    (item) => !item.roles || item.roles.includes(userRole)
  );

  const NavItems = () => (
    <>
      <div className="px-4 py-2">
        <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
          Scholar Sync
        </h2>
        <div className="space-y-1">
          {filteredNavItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                  isActive
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                    : "transparent"
                )
              }
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </NavLink>
          ))}
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 px-3 py-2"
            onClick={() => logout()}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </>
  );

  // Mobile sidebar (using Sheet component)
  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-4 z-40 lg:hidden"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] p-0">
          <ScrollArea className="h-full">
            <NavItems />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop sidebar
  return (
    <div className="hidden border-r bg-background lg:block">
      <div className="h-screen w-[240px]">
        <ScrollArea className="h-full">
          <NavItems />
        </ScrollArea>
      </div>
    </div>
  );
}
