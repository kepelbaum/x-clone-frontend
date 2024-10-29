"use client";

import { useAppState } from "./context";
import { useRouter } from "next/navigation";

export function useHomeFetch() {
  const { posts, setPosts, users, setUsers } = useAppState();

  const token = localStorage.getItem("token");
  //   const name = localStorage.getItem("username");

  const router = useRouter();

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        "https://x-clone-backend-production-15d8.up.railway.app/api/post",
        {
          mode: "cors",
          method: "GET",
          //   body: JSON.stringify({
          //     username: name,
          //     password: pass,
          //   }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            authorization: "Bearer " + (token ? token.toString() : ""),
          },
        }
      );

      const data = await response.json();
      console.log("Posts:", data);

      if (data.errors) {
        console.log(data.errors);
      } else {
        setPosts(data);
        console.log(posts);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      console.log(["An error occurred during post fetch"]);
      router.push("/");
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://x-clone-backend-production-15d8.up.railway.app/api/user",
        {
          mode: "cors",
          method: "GET",
          //   body: JSON.stringify({
          //     username: name,
          //     password: pass,
          //   }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            authorization: "Bearer " + (token ? token.toString() : ""),
          },
        }
      );

      const data = await response.json();
      console.log("Users:", data);

      if (data.errors) {
        console.log(data.errors);
      } else {
        setUsers(data);
        console.log(users);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      console.log(["An error occurred during user fetch"]);
      router.push("/");
    }
  };

  return { fetchPosts, fetchUsers };
}
