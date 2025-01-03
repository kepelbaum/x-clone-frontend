"use client";

import { useAppState } from "./context";
import { useRouter } from "next/navigation";

export function useAuth() {
  const { setUser, setToken, errors, setErrors } = useAppState();

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

      if (data.errors) {
        setErrors(data.errors);
        console.log(errors);
      } else {
        setErrors([]);
        setToken(data.accessToken);
        setUser(name);
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("username", name);
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
        "https://x-clone-backend-production-15d8.up.railway.app/api/auth/guest",
        {
          mode: "cors",
          method: "POST",
          // body: JSON.stringify({
          //   username: "newestuser",
          //   password: "newestuser", //need to have backend always authorize it through login
          // }),
          // headers: {
          //   "Content-type": "application/json; charset=UTF-8",
          // },
        }
      );

      const data = await response.json();
      console.log("Response:", data);

      if (data.errors) {
        setErrors(data.errors);
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
      setErrors(["An error occurred during registration: " + error]);
    }
  };

  return { loginSubmit, logAsGuest, register };
}
