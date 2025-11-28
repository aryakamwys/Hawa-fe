// Dummy Authentication Service
const AUTH_KEY = 'hawa_auth_token';
const USER_KEY = 'hawa_user';

// Dummy users database
const dummyUsers = [
  { email: 'user@hawa.com', password: 'password123', name: 'User HAWA' },
  { email: 'admin@hawa.com', password: 'admin123', name: 'Admin HAWA' },
  { email: 'test@test.com', password: 'test123', name: 'Test User' }
];

export const authService = {
  // Login function
  login: (email, password) => {
    // Find user in dummy database
    const user = dummyUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Generate dummy token
      const token = `dummy_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const userData = { email: user.email, name: user.name };
      
      // Save to localStorage
      localStorage.setItem(AUTH_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(userData));
      
      return { success: true, user: userData, token };
    }
    
    return { success: false, error: 'Email atau password salah' };
  },

  // Register function
  register: (name, email, password) => {
    // Check if user already exists
    const existingUser = dummyUsers.find(u => u.email === email);
    if (existingUser) {
      return { success: false, error: 'Email sudah terdaftar' };
    }

    // Add new user to dummy database (in real app, this would be saved to backend)
    const newUser = { email, password, name };
    dummyUsers.push(newUser);

    // Auto login after registration
    const token = `dummy_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const userData = { email: newUser.email, name: newUser.name };
    
    localStorage.setItem(AUTH_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    
    return { success: true, user: userData, token };
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem(AUTH_KEY);
    return !!token;
  },

  // Get current user
  getCurrentUser: () => {
    const userStr = localStorage.getItem(USER_KEY);
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        return null;
      }
    }
    return null;
  },

  // Logout function
  logout: () => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(USER_KEY);
  }
};

