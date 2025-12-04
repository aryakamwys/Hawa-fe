// src/services/auth.js
// Authentication service: konsumsi API backend FastAPI via VITE_API_BASE_URL

const AUTH_KEY = 'hawa_auth_token';
const USER_KEY = 'hawa_user';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function handleResponse(response) {
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    const message = data.detail || data.message || 'Request failed';
    throw new Error(message);
  }

  return response.json().catch(() => ({}));
}

export const authService = {
  /**
   * Login ke backend.
   * POST {API_BASE_URL}/auth/login
   * body: { email, password }
   * response: { access_token, token_type }
   */
  login: async (email, password) => {
    if (!API_BASE_URL) {
      throw new Error('VITE_API_BASE_URL belum dikonfigurasi');
    }

    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await handleResponse(res);

    const token = data.access_token;
    if (!token) {
      throw new Error('Token tidak ditemukan di response login');
    }

    // Simpan user data dari response (jika ada) atau minimal email
    // Backend mungkin mengembalikan user data dengan role
    let userData = data.user || { email };
    
    // Jika response tidak include user data lengkap, simpan minimal email
    if (!userData.email) {
      userData.email = email;
    }

    localStorage.setItem(AUTH_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(userData));

    // Coba fetch user data dari /me endpoint jika tersedia (untuk mendapatkan role dll)
    try {
      const meData = await authService.getCurrentUserData();
      if (meData) {
        userData = meData;
        localStorage.setItem(USER_KEY, JSON.stringify(userData));
      }
    } catch (err) {
      // Jika /me endpoint tidak tersedia atau error, gunakan data dari login response
      console.log('Tidak bisa fetch user data dari /me endpoint:', err);
    }

    return { success: true, user: userData, token };
  },

  /**
   * Register ke backend.
   * POST {API_BASE_URL}/auth/register
   * body: { full_name, email, phone_e164, password, locale }
   */
  register: async (name, email, password, phone = '', locale = 'id') => {
    if (!API_BASE_URL) {
      throw new Error('VITE_API_BASE_URL belum dikonfigurasi');
    }

    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        full_name: name,
        email,
        phone_e164: phone || undefined,
        password,
        locale
      })
    });

    const data = await handleResponse(res);

    // Tidak auto-login; FE akan redirect ke halaman login.
    return { success: true, user: data };
  },

  // cek apakah user sudah punya token
  isAuthenticated: () => {
    const token = localStorage.getItem(AUTH_KEY);
    return !!token;
  },

  // ambil user dari localStorage
  getCurrentUser: () => {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  // ambil token saat mau call API lain
  getToken: () => localStorage.getItem(AUTH_KEY),

  // fetch user data dari endpoint /me (jika tersedia)
  getCurrentUserData: async () => {
    if (!API_BASE_URL) {
      return null;
    }

    const token = authService.getToken();
    if (!token) {
      return null;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (res.ok) {
        const userData = await handleResponse(res);
        localStorage.setItem(USER_KEY, JSON.stringify(userData));
        return userData;
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
    }

    return null;
  },

  // logout
  logout: () => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(USER_KEY);
  },

  // cek apakah user adalah admin
  // TODO: Update ini untuk mengambil role dari backend API atau dari user data
  isAdmin: () => {
    const user = authService.getCurrentUser();
    // Sementara cek dari user data, bisa di-upgrade untuk ambil dari backend
    return user && (user.role === 'admin' || user.is_admin === true);
  }
};


