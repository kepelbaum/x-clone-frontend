"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useAppState } from "../lib/context";
import { useHomeFetch } from "../lib/fetch";
import { Navbar } from "../navbar";
import { TopHomeMenu } from "./tophomemenu";
import { Messagebox } from "./messagebox";
import { Tweet } from "../lib/tweet";
import { Rightsection } from "../lib/rightsection";

export default function Home() {
  const { logout, posts, users, updateCounter } = useAppState();

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("username");
  const { fetchPosts, fetchUsers } = useHomeFetch();

  useEffect(() => {
    fetchPosts();
    fetchUsers();
  }, [updateCounter]);

  // useEffect(() => {
  //   console.log(posts);
  //   console.log(users);
  // }, [posts, users]);

  return (
    posts &&
    users && (
      <div className="bg-black text-white min-h-screen w-screen box-border md:overflow-y-scroll">
        <div className="w-full flex relative">
          <div className="hidden md:block md:h-screen md:w-[calc((100vw-600px)/2)]"></div>
          <Navbar mb={10} />
          <main className="w-full md:w-[600px] pb-16 md:pb-0 border-gray-600 border-2">
            <TopHomeMenu />
            <Messagebox />

            {posts
              .sort((a, b) => {
                return a.post_id > b.post_id ? -1 : 1;
              })
              .map((post) => (
                <Tweet key={post.post_id} post={post} />
              ))}
          </main>
          <Rightsection />
          <div className="hidden md:block md:h-screen md:w-[calc((100vw-600px)/2)]"></div>
        </div>
      </div>
    )
  );
}
