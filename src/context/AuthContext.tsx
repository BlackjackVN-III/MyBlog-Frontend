import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

export interface AuthUser {
  userName: string;
  email: string;
  bio?: string;
  avatarUrl?: string;
  role?: 'admin' | 'user';
}

export const parseJwt = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userName: string, password: string) => Promise<void>;
  register: (userName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updatedUser: Partial<AuthUser>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
  };

  const fetchProfile = async () => {
    try {
      // Gọi api lấy thông tin profile cá nhân
      const res = await api.get('/api/profile');
      
      // Đọc và trích xuất role từ JWT
      const token = localStorage.getItem('accessToken');
      let role: 'admin' | 'user' = 'user';
      if (token) {
        const decoded = parseJwt(token);
        const roleClaim = decoded?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || decoded?.['role'];
        if (roleClaim === 'Admin' || (Array.isArray(roleClaim) && roleClaim.includes('Admin'))) {
          role = 'admin';
        }
      }

      setUser({ ...res.data, role });
    } catch (err) {
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      fetchProfile();
    } else {
      setIsLoading(false);
    }

    const handleLogoutEvent = () => logout();
    window.addEventListener('auth-logout', handleLogoutEvent);
    return () => window.removeEventListener('auth-logout', handleLogoutEvent);
  }, []);

  const login = async (userName: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await api.post('/api/auth/login', { userName, password });
      const { token, refreshToken, userName: name, email } = res.data;
      
      localStorage.setItem('accessToken', token);
      localStorage.setItem('refreshToken', refreshToken);
      
      // Cập nhật thông tin cơ bản trước, sau đó lấy thông tin profile đầy đủ (bio, avatar)
      setUser({ userName: name, email });
      await fetchProfile();
    } catch (err) {
      setIsLoading(false);
      throw err;
    }
  };

  const register = async (userName: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      await api.post('/api/auth/register', { userName, email, password });
      // Tự động đăng nhập sau khi đăng ký thành công
      await login(userName, password);
    } catch (err) {
      setIsLoading(false);
      throw err;
    }
  };

  const updateUser = (updatedUser: Partial<AuthUser>) => {
    setUser((prev) => (prev ? { ...prev, ...updatedUser } as AuthUser : null));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
