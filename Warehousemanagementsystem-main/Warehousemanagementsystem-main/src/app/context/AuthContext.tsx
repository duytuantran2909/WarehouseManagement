import { createContext, useContext, useState, ReactNode } from "react";
import { api } from "../api";

// 1. Định nghĩa cấu trúc User khớp với Backend C#
interface User {
  id: number;      // Đổi sang number nếu DB của bạn dùng int
  username: string; // Đổi email thành username
  role: string;
}

interface AuthContextType {
  user: User | null;
  // Đổi email thành username
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    try {
      // Phòng trường hợp localStorage bị hỏng/không đúng format JSON
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await api.post("/Auth/login", { username, password });
      const data = response.data;

      const userProfile: User = data.user;
      const token: string = data.token;

      setUser(userProfile);
      localStorage.setItem("user", JSON.stringify(userProfile));
      localStorage.setItem("token", token);

      return true;
    } catch (error) {
      console.error("Lỗi kết nối đến server:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // Dùng redirect cứng để reset trạng thái toàn bộ và tránh lỗi session cũ
    window.location.href = "/login"; // Chuyển hướng cứng về trang login
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}