"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useAppState } from "../../lib/context";
import { useHomeFetch } from "../../lib/fetch";
import { Navbar } from "../../navbar";
import { Profile } from "./../profile";
import { Rightsection } from "../../lib/rightsection";

export default function Home() {
  const { logout, posts, users } = useAppState();
  const params = useParams();
  const token = localStorage.getItem("token");
  //   const user = localStorage.getItem("username");
  const { fetchPosts, fetchUsers, fetchMessages, fetchFollows, fetchLikes } =
    useHomeFetch();

  useEffect(() => {
    fetchPosts();
    fetchUsers();
    fetchMessages();
    fetchFollows();
    fetchLikes();
  }, []);

  return (
    posts &&
    users && (
      <div className="bg-black text-white min-h-screen w-screen box-border md:overflow-y-scroll">
        <div className="w-full flex relative">
          <div className="hidden md:block md:h-screen md:w-[calc((100vw-600px)/2)]"></div>
          <Navbar mb={0} />
          {users
            .filter((user) => user.username === params.name)
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
