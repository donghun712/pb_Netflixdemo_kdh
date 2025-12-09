import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;       // email
  password: string; // TMDB API 키
}

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, keepLogin: boolean) => boolean;
  register: (
    email: string,
    password: string,
    confirm: string,
    agree: boolean
  ) => { success: boolean; message: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const USERS_KEY = "pb:users";
const CURRENT_USER_KEY = "pb:currentUser";
const KEEP_LOGIN_KEY = "pb:keepLogin";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const keep = localStorage.getItem(KEEP_LOGIN_KEY) === "true";
    const savedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (keep && savedUser) {
      const parsed: User = JSON.parse(savedUser);
      setUser(parsed);
      localStorage.setItem("TMDb-Key", parsed.password);
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string, keepLogin: boolean) => {
    const raw = localStorage.getItem(USERS_KEY);
    const users: User[] = raw ? JSON.parse(raw) : [];
    const found = users.find(
      (u) => u.id === email && u.password === password
    );
    if (!found) return false;

    setUser(found);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(found));
    localStorage.setItem("TMDb-Key", found.password);
    localStorage.setItem(KEEP_LOGIN_KEY, keepLogin ? "true" : "false");
    return true;
  };

  const register = (
    email: string,
    password: string,
    confirm: string,
    agree: boolean
  ) => {
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return { success: false, message: "올바른 이메일 형식이 아닙니다." };
    }
    if (password !== confirm) {
      return { success: false, message: "비밀번호가 일치하지 않습니다." };
    }
    if (!agree) {
      return { success: false, message: "약관에 동의해야 합니다." };
    }

    const raw = localStorage.getItem(USERS_KEY);
    const users: User[] = raw ? JSON.parse(raw) : [];
    if (users.some((u) => u.id === email)) {
      return { success: false, message: "이미 존재하는 이메일입니다." };
    }

    const newUser: User = { id: email, password };
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));

    return {
      success: true,
      message: "회원가입이 완료되었습니다. 로그인해주세요.",
    };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
    localStorage.removeItem("TMDb-Key");
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
};
