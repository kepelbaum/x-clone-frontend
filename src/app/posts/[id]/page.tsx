"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useAppState } from "@/app/lib/context";
import { useHomeFetch } from "@/app/lib/fetch";
import { Navbar } from "@/app/navbar";
import { TopHomeMenu } from "@/app/home/tophomemenu";
import { Messagebox } from "@/app/home/messagebox";
import { Tweet } from "@/app/lib/tweet";
import { Rightsection } from "@/app/lib/rightsection";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const { logout, posts, users, updateCounter, active, setActive } =
    useAppState();
  const params = useParams();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("username");
  const { fetchPosts, fetchUsers } = useHomeFetch();

  useEffect(() => {
    fetchPosts();
    fetchUsers();
    setActive("foryou");
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
            <div className="sticky top-0 bg-black z-10">
              <div className="flex items-center gap-6 px-4 py-3">
                <Link href="/" className="p-2 hover:bg-gray-800 rounded-full">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </Link>
                <span className="text-xl font-bold">Post</span>
              </div>
            </div>
            {posts
              .filter((post) => !post.ifreply)
              .filter((post) => post.post_id.toString() === params.id)
              .map((post) => (
                <Tweet key={post.post_id} post={post} />
              ))}
            <Messagebox id={Number(params.id)} />
            {posts
              .filter(
                (post) => post.ifreply && post.ifreply.toString() === params.id
              )
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
