
import { useState, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  User,
  Search,
  LogOut,
  ChevronRight,
  ChevronLeft,
  Home,
  Plus,
  FileText,
  Settings
} from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Add Association', href: '/associations/add', icon: Plus },
    { name: 'Associations', href: '/associations', icon: FileText },
    { name: 'Search', href: '/search', icon: Search },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <div 
        className={cn(
          "bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out",
          sidebarCollapsed ? "w-20" : "w-64"
        )}
      >
        {/* Logo and Brand */}
        <div className="flex items-center justify-between h-16 px-4">
          {!sidebarCollapsed && (
            <Link to="/dashboard" className="text-xl font-bold">
              UnityHub
            </Link>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar} 
            className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
        </div>
        
        {/* Navigation */}
        <nav className="mt-6 px-2">
          <ul className="space-y-1">
            {navigationItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 group transition-colors",
                    location.pathname === item.href 
                      ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className={cn("flex-shrink-0", sidebarCollapsed ? "mx-auto" : "mr-3")} size={20} />
                  {!sidebarCollapsed && <span>{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* User and Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="flex items-center">
                <div className="rounded-full bg-sidebar-accent p-2">
                  <User size={20} />
                </div>
                <div className="ml-2 text-sm">
                  <div className="font-medium">{user?.username}</div>
                  <div className="text-xs opacity-70">{user?.role}</div>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size={sidebarCollapsed ? "icon" : "default"}
              onClick={logout}
              className={cn(
                "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                sidebarCollapsed && "w-full"
              )}
            >
              {sidebarCollapsed ? (
                <LogOut size={20} />
              ) : (
                <>
                  <LogOut className="mr-2" size={16} />
                  Logout
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
