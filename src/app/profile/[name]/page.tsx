"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppState } from "../../lib/context";
import { useHomeFetch } from "../../lib/fetch";
import { Navbar } from "../../navbar";
import { Profile } from "./../profile";
import { Rightsection } from "../../lib/rightsection";

export default function Home() {
  const { logout, posts, users, updateCounter, active, setActive } =
    useAppState();
  const [localUpdateCounter, setLocalUpdateCounter] = useState(0);
  const params = useParams();
  const token = localStorage.getItem("token");
  const { fetchPosts, fetchUsers, fetchMessages, fetchFollows, fetchLikes } =
    useHomeFetch();

  useEffect(() => {
    fetchPosts();
    fetchUsers();
    fetchMessages();
    fetchFollows();
    fetchLikes();
    setActive("posts");
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
    }
  }, [localUpdateCounter]);

  return (
    posts &&
    users && (
      <div className="fixed inset-0 overflow-y-auto overflow-x-hidden bg-black text-white">
        <div className="w-full flex relative">
          <div className="hidden md:block md:h-screen md:w-[calc((100vw-600px)/2)]"></div>
          <Navbar mb={0} />
          {users
            .filter((user) => user.username === params.name)
            .map((user) => {
              return <Profile key={user.username} profileUser={user} />;
            })}

          <Rightsection profUsername={params.name} />
          <div className="hidden md:block md:h-screen md:w-[calc((100vw-600px)/2)]"></div>
        </div>
      </div>
    )
  );
}
