"use client";

import {
  useEffect,
  useState,
  useContext,
  createContext,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import local from "next/font/local";
import { User, Post } from "./definitions";

type AppContextType = {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  users: User[];
  setUsers: (users: User[]) => void;
  user: string;
  setUser: (user: string) => void;
  token: string;
  setToken: (token: string) => void;
  errors: string[];
  setErrors: (errors: string[]) => void;
  logout: () => void;
  updateCounter: number;
  setUpdateCounter: (value: number) => void;
};

export const AppContext = createContext<AppContextType>({
  posts: [],
  setPosts: () => {},
  users: [],
  setUsers: () => {},
  user: "",
  setUser: () => {},
  token: "",
  setToken: () => {},
  errors: [],
  setErrors: () => {},
  logout: () => {},
  updateCounter: 0,
  setUpdateCounter: () => {},
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [updateCounter, setUpdateCounter] = useState(0);

  const router = useRouter();

  const logout = () => {
    setErrors([]);
    setPosts([]);
    setUsers([]);
    localStorage.setItem("username", "");
    localStorage.setItem("token", "");
    router.push("/");
  };

  const value = {
    posts,
    setPosts,
    users,
    setUsers,
    user,
    setUser,
    token,
    setToken,
    errors,
    setErrors,
    logout,
    updateCounter,
    setUpdateCounter,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppState must be used within AppProvider");
  }
  return context;
}
