"use client";

import { useAppState } from "./context";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "./useLocalStorage";

export function useHomeFetch() {
  const { setPosts, setUsers, setMessages, setFollows, setLikes } =
    useAppState();

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
      }
    } catch (error) {
      console.error("Fetch error:", error);
      console.log(["An error occurred during user fetch"]);
      router.push("/");
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        "https://x-clone-backend-production-15d8.up.railway.app/api/message",
        {
          mode: "cors",
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            authorization: "Bearer " + (token ? token.toString() : ""),
          },
        }
      );

      const data = await response.json();
      console.log("Messages:", data);

      if (data.errors) {
        console.log(data.errors);
      } else {
        setMessages(data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      console.log(["An error occurred during message fetch"]);
      router.push("/");
    }
  };

  const fetchFollows = async () => {
    try {
      const response = await fetch(
        "https://x-clone-backend-production-15d8.up.railway.app/api/follow",
        {
          mode: "cors",
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            authorization: "Bearer " + (token ? token.toString() : ""),
          },
        }
      );

      const data = await response.json();
      console.log("Follows:", data);

      if (data.errors) {
        console.log(data.errors);
      } else {
        setFollows(data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      console.log(["An error occurred during follow fetch"]);
      router.push("/");
    }
  };

  const fetchLikes = async () => {
    try {
      const response = await fetch(
        "https://x-clone-backend-production-15d8.up.railway.app/api/like",
        {
          mode: "cors",
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            authorization: "Bearer " + (token ? token.toString() : ""),
          },
        }
      );

      const data = await response.json();
      console.log("Likes:", data);

      if (data.errors) {
        console.log(data.errors);
      } else {
        setLikes(data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      console.log(["An error occurred during like fetch"]);
      router.push("/");
    }
  };

  return { fetchPosts, fetchUsers, fetchMessages, fetchFollows, fetchLikes };
}
