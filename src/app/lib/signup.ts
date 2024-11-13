"use client";

import { useAppState } from "./context";
import { useRouter } from "next/navigation";
import { useAuth as useLogin } from "./login";

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
  const { loginSubmit } = useLogin();

  const register = async (name: string, pass: string, conf: string) => {
    if (pass == null || pass != conf) {
      setErrors(["Passwords do not match"]);
      return;
    }

    console.log(name, pass);

    try {
      const response = await fetch(
        "https://x-clone-backend-production-15d8.up.railway.app/api/auth/register",
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

      if (data.errors) {
        setErrors(data.errors);
      } else {
        loginSubmit(name, pass);
      }
    } catch (error) {
      setErrors(["An error occurred during registration"]);
    }
  };

  return { register };
}
