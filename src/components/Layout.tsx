import React from 'react';
import { 
  LayoutDashboard, 
  Database, 
  Settings, 
  FileText, 
  User, 
  Bell, 
  LogOut,
  Menu,
  X,
  Ticket,
  Users,
  ClipboardCheck
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onPageChange }) => {
  const { user, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'new-ticket', label: 'New Ticket', icon: Ticket },
    { id: 'tickets', label: 'My Ticket', icon: FileText, hasSubmenu: true },
    { id: 'ticket-approval', label: 'Ticket Approval', icon: ClipboardCheck },
    { id: 'performance', label: 'Performance', icon: FileText },
    { id: 'database', label: 'Database', icon: Database, hasSubmenu: true },
    { id: 'user', label: 'User', icon: Users },
    { id: 'settings', label: 'Setting', icon: Settings },
    { id: 'history', label: 'User Log History', icon: FileText },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-300 via-cyan-300 to-blue-300">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg relative z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-white p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-2xl font-bold text-white italic">Helpdesk</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 bg-gray-700 px-3 py-1 rounded-lg">
              <span className="text-white text-sm">BM</span>
              <span className="text-white text-sm">EN</span>
            </div>
            <Bell className="text-white hover:text-gray-300 cursor-pointer" size={20} />
            <button
              onClick={() => onPageChange('profile')}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <User size={20} />
            </button>
            <button
              onClick={handleSignOut}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="flex relative">
        {/* Sidebar */}
        <aside 
          className={`
            fixed lg:static inset-y-0 left-0 z-40 w-64 bg-gray-800 transform 
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
            lg:translate-x-0 transition-transform duration-300 ease-in-out
          `}
        >
          <div className="p-4 pt-6">
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.id}>
                    <button
                      onClick={() => {
                        onPageChange(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`
                        w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors
                        ${currentPage === item.id 
                          ? 'bg-teal-600 text-white' 
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        }
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon size={20} />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      {item.hasSubmenu && (
                        <span className="text-xs">▶</span>
                      )}
                    </button>
                  </div>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:ml-0">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;