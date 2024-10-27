"use client";

import { useAppState } from "./context";
import { redirect, useRouter } from "next/navigation";

export function useAuth() {
  const {
    posts,
    setPosts,
    users,
    setUsers,
    user,
    setUser,
    token,
    setToken,
    logout,
    errors,
    setErrors,
  } = useAppState();

  const router = useRouter();

  const loginSubmit = async (name: string, pass: string) => {
    try {
      const response = await fetch(
        "https://x-clone-backend-production-15d8.up.railway.app/api/auth/login",
        {
          mode: "cors",
          method: "POST",
          body: JSON.stringify({
            username: name,
            password: pass,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      const data = await response.json();
      console.log("Response:", data);

      if (data.error) {
        setErrors([data.error]);
        console.log(errors);
      } else {
        setErrors([]);
        setToken(data.accessToken);
        setUser(name);
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("username", "newestuser");
        router.push("/home");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors(["An error occurred during login"]);
    }
  };

  const logAsGuest = async () => {
    try {
      const response = await fetch(
        "https://x-clone-backend-production-15d8.up.railway.app/api/auth/login",
        {
          mode: "cors",
          method: "POST",
          body: JSON.stringify({
            username: "newestuser",
            password: "newestuser", //need to have backend always authorize it through login
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      const data = await response.json();
      console.log("Response:", data);

      if (data.error) {
        setErrors([data.error]);
      } else {
        setErrors([]);
        setToken(data.accessToken);
        setUser("newestuser");
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("username", "newestuser");
        router.push("/home");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors(["An error occurred during login"]);
    }
  };
  return { loginSubmit, logAsGuest };
}
