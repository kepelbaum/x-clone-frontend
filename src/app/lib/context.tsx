"use client";

import { useState, useContext, createContext, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { User, Post, Message, FollowData, LikeData } from "./definitions";

type AppContextType = {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  users: User[];
  setUsers: (users: User[]) => void;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  follows: FollowData;
  setFollows: (follows: FollowData) => void;
  likes: LikeData;
  setLikes: (likes: LikeData) => void;
  user: string;
  setUser: (user: string) => void;
  token: string;
  setToken: (token: string) => void;
  errors: string[];
  setErrors: (errors: string[]) => void;
  logout: () => void;
  updateCounter: number;
  setUpdateCounter: (value: number) => void;
  active: string;
  setActive: (value: string) => void;
};

export const AppContext = createContext<AppContextType>({
  posts: [],
  setPosts: () => {},
  users: [],
  setUsers: () => {},
  messages: [],
  setMessages: () => {},
  follows: [],
  setFollows: () => {},
  likes: [],
  setLikes: () => {},
  user: "",
  setUser: () => {},
  token: "",
  setToken: () => {},
  errors: [],
  setErrors: () => {},
  logout: () => {},
  updateCounter: 0,
  setUpdateCounter: () => {},
  active: "",
  setActive: () => {},
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [likes, setLikes] = useState<LikeData>({
    likeCounts: {},
    notifications: [],
  });

  const [follows, setFollows] = useState<FollowData>({
    followerCounts: {},
    followingCounts: {},
    notifications: [],
  });
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [updateCounter, setUpdateCounter] = useState(0);
  const [active, setActive] = useState("");

  const router = useRouter();

  const logout = () => {
    setErrors([]);
    setPosts([]);
    setUsers([]);
    setMessages([]);
    setFollows([]);
    setLikes([]);
    localStorage.setItem("username", "");
    localStorage.setItem("token", "");
    router.push("/");
  };

  const value = {
    posts,
    setPosts,
    users,
    setUsers,
    messages,
    setMessages,
    follows,
    setFollows,
    likes,
    setLikes,
    user,
    setUser,
    token,
    setToken,
    errors,
    setErrors,
    logout,
    updateCounter,
    setUpdateCounter,
    active,
    setActive,
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
