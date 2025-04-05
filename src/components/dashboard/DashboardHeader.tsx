
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell, ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

export function DashboardHeader() {
  const { authState, logout } = useAuth();
  const user = authState.user;
  const navigate = useNavigate();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-scholar-primary">Administrator</Badge>;
      case 'teacher':
        return <Badge className="bg-scholar-secondary">Teacher</Badge>;
      case 'student':
        return <Badge className="bg-scholar-accent">Student</Badge>;
      case 'parent':
        return <Badge className="bg-scholar-highlight">Parent</Badge>;
      default:
        return <Badge>User</Badge>;
    }
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
      <div className="flex flex-1 items-center gap-2">
        <div>
          <h2 className="text-lg font-semibold whitespace-nowrap">
            {getGreeting()}, {user?.firstName}
          </h2>
          <span className="text-sm text-muted-foreground">
            Welcome back to Scholar Sync
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-scholar-error" />
        </Button>
      
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="pl-2 pr-1 flex items-center">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src={user?.avatar} alt={`${user?.firstName} ${user?.lastName}`} />
                <AvatarFallback>{user?.firstName?.[0]}{user?.lastName?.[0]}</AvatarFallback>
              </Avatar>
              <span className="mr-1 hidden sm:inline-block">{user?.firstName} {user?.lastName}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span>{user?.firstName} {user?.lastName}</span>
                <span className="text-xs text-muted-foreground">{user?.email}</span>
                <span className="mt-1">{getRoleLabel(user?.role || '')}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleNavigate('/profile')}>
              <User className="mr-2 h-4 w-4" /> Profile
            </DropdownMenuItem>
            {user?.role === 'admin' && (
              <DropdownMenuItem onClick={() => handleNavigate('/settings')}>
                <Settings className="mr-2 h-4 w-4" /> Settings
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => logout()}>
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
