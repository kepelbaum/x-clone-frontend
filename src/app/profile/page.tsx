"use client";

import { useEffect, useState } from "react";
import { useAppState } from "../lib/context";
import { useHomeFetch } from "../lib/fetch";
import { Navbar } from "../navbar";
import { Profile } from "./profile";
import { Rightsection } from "../lib/rightsection";

export default function Home() {
  const { posts, users, updateCounter, setActive } = useAppState();
  // const token = localStorage.getItem("token");
  const currentUser = localStorage.getItem("username");
  const [localUpdateCounter, setLocalUpdateCounter] = useState(0);
  const { fetchPosts, fetchUsers, fetchMessages, fetchFollows, fetchLikes } =
    useHomeFetch();

  useEffect(() => {
    fetchPosts();
    fetchUsers();
    fetchMessages();
    fetchFollows();
    fetchLikes();
    setActive("posts");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (updateCounter > 0) {
      setLocalUpdateCounter((prev) => prev + 1);
    }
  }, [updateCounter]);

  useEffect(() => {
    if (localUpdateCounter > 0) {
      fetchPosts();
      fetchUsers();
      fetchMessages();
      fetchFollows();
      fetchLikes();
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localUpdateCounter]);

  return (
    posts &&
    users && (
      <div className="fixed inset-0 overflow-y-auto overflow-x-hidden bg-black text-white">
        <div className="w-full flex relative">
          <div className="hidden md:block md:h-screen md:w-[calc((100vw-600px)/2)]"></div>
          <Navbar />
          {users
            .filter((user) => user.username === currentUser)
            .map((user) => {
              return <Profile key={user.username} profileUser={user} />;
            })}
          <Rightsection />
          <div className="hidden md:block md:h-screen md:w-[calc((100vw-600px)/2)]"></div>
        </div>
      </div>
    )
  );
}
