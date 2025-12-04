import React, { useState } from 'react';
import { Menu, X, LogOut, Users } from 'lucide-react';
import { authService } from '../services/auth';

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const currentUser = authService.getCurrentUser();
  
  const handleLogout = () => {
    authService.logout();
    window.location.hash = '#login';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex">
      {/* Sidebar - Kosong kecuali logo */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-white border-r border-gray-200 shadow-lg
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header - Hanya Logo */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center space-x-2">
              <img 
                src="/logo_hawa_fix.png" 
                alt="HAWA Logo" 
                className="h-8 w-auto object-contain"
              />
              <span className="text-xl font-black text-gray-900">HAWA</span>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden text-gray-600 hover:text-gray-900 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Sidebar Content - Kosong */}
          <div className="flex-1 px-4 py-6">
            {/* Sidebar kosong, siap untuk diisi menu admin nanti */}
          </div>

          {/* User Info & Logout */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            {currentUser && (
              <div className="mb-3 px-4 py-3 bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center space-x-2 mb-1">
                  <Users className="text-blue-600" size={16} />
                  <p className="text-xs text-gray-500">Selamat Datang</p>
                </div>
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {currentUser.name || currentUser.email || 'Admin'}
                </p>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 transition-all duration-300 text-sm font-medium shadow-sm"
            >
              <LogOut size={16} />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation Bar - Kosong kecuali logo */}
        <nav className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="lg:hidden text-gray-700 hover:text-blue-600 transition-colors duration-300 p-2 rounded-lg hover:bg-gray-100"
                >
                  <Menu size={24} />
                </button>
                <div className="flex items-center space-x-2">
                  <img 
                    src="/logo_hawa_fix.png" 
                    alt="HAWA Logo" 
                    className="h-6 w-auto object-contain"
                  />
                </div>
              </div>

              {/* Navbar kosong di kanan, siap untuk diisi menu admin nanti */}
              <div></div>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-y-auto bg-gray-50">
          {children}
        </div>
      </div>
    </div>
  );
}

