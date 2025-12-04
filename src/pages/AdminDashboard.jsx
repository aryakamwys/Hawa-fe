import React from 'react';
import AdminLayout from '../components/AdminLayout';

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900">
            Admin Dashboard
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Template kosong untuk halaman admin
          </p>
        </div>

        {/* Content Area - Kosong, siap untuk diisi */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 sm:p-8">
          <p className="text-gray-500 text-center py-8">
            Konten admin akan ditambahkan di sini
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}

