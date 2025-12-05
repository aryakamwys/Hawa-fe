import React from 'react';
import { LogOut, Users } from 'lucide-react';
import { authService } from '../services/auth';

export default function UserSidebar({ isOpen, onClose }) {
  const currentUser = authService.getCurrentUser();
  
  const handleLogout = () => {
    authService.logout();
    window.location.hash = '#login';
  };

  return (
    <>
      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky lg:top-0 inset-y-0 left-0 z-40
        w-64 bg-white border-r border-gray-200 shadow-lg
        transform transition-transform duration-300 ease-in-out
        h-screen
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white flex-shrink-0">
            <div className="flex items-center space-x-2">
              <img 
                src="/logo_hawa_fix.png" 
                alt="HAWA Logo" 
                className="h-8 w-auto object-contain"
              />
              <span className="text-xl font-black text-gray-900">HAWA</span>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Menu - Card Kosongan */}
          <nav className="flex-1 px-4 py-6 space-y-4 overflow-y-auto min-h-0">
            {/* Card Kosongan 1 */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              {/* Card kosong, siap untuk diisi konten */}
            </div>
            
            {/* Card Kosongan 2 */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              {/* Card kosong, siap untuk diisi konten */}
            </div>
            
            {/* Card Kosongan 3 */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              {/* Card kosong, siap untuk diisi konten */}
            </div>
          </nav>

          {/* User Info & Logout - Sticky di bagian bawah */}
          <div className="p-4 border-t border-gray-200 bg-gray-50 flex-shrink-0">
            {currentUser && (
              <div className="mb-3 px-4 py-3 bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center space-x-2 mb-1">
                  <Users className="text-blue-600" size={16} />
                  <p className="text-xs text-gray-500">Selamat Datang</p>
                </div>
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {currentUser.name || currentUser.email || 'User'}
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
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        ></div>
      )}
    </>
  );
}

