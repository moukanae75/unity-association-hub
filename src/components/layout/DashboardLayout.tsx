
import { useState, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  User,
  Search,
  LogOut,
  Menu,
  Bell
} from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Add Association', href: '/associations/add' },
    { name: 'Associations', href: '/associations' },
    { name: 'Search', href: '/search' },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm z-10">
        <div className="px-4 flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden mr-2"
              onClick={toggleMobileMenu}
            >
              <Menu size={20} />
            </Button>
            <Link to="/dashboard" className="flex items-center">
              <span className="font-bold text-xl text-primary">UnityHub</span>
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-4">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === item.href 
                    ? "bg-accent text-accent-foreground" 
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-700">
              <Bell size={20} />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-primary p-1.5">
                <User size={18} className="text-primary-foreground" />
              </div>
              <div className="hidden md:block text-sm">
                <div className="font-medium text-gray-700">{user?.username}</div>
                <div className="text-xs text-gray-500">{user?.role}</div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-gray-700 hover:bg-gray-100"
            >
              <LogOut className="mr-1" size={16} />
              <span className="hidden md:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div className={cn(
        "md:hidden fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity",
        mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}>
        <div className={cn(
          "fixed inset-y-0 left-0 w-64 bg-white transition-transform transform",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <span className="font-bold text-lg">Menu</span>
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              <span className="sr-only">Close</span>
              ✕
            </Button>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center rounded-md px-3 py-2 text-sm",
                      location.pathname === item.href 
                        ? "bg-primary text-primary-foreground" 
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                    onClick={toggleMobileMenu}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
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
