"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useAppState } from "@/app/lib/context";
import { useHomeFetch } from "@/app/lib/fetch";
import { Navbar } from "@/app/navbar";
// import { TopHomeMenu } from "@/app/home/tophomemenu";
import { Messagebox } from "@/app/home/messagebox";
import { Tweet } from "@/app/lib/tweet";
import { Rightsection } from "@/app/lib/rightsection";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { posts, users, updateCounter, setActive } = useAppState();
  const [localUpdateCounter, setLocalUpdateCounter] = useState(0);
  const params = useParams();
  // const token = localStorage.getItem("token");
  const user = localStorage.getItem("username");
  const { fetchPosts, fetchUsers, fetchFollows, fetchLikes, fetchMessages } =
    useHomeFetch();

  useEffect(() => {
    fetchPosts();
    fetchUsers();
    fetchMessages();
    fetchFollows();
    fetchLikes();
    setActive("foryou");
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

  useEffect(() => {
    if (posts && params.id) {
      setTimeout(() => {
        targetRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }
  }, [posts, params.id]);

  const getParentChain = () => {
    const parentChain = [];
    let currentPost = posts.find((p) => p.post_id.toString() === params.id);

    while (currentPost?.ifreply) {
      const parentPost = posts.find((p) => p.post_id === currentPost?.ifreply);
      if (parentPost) {
        parentChain.unshift(parentPost);
        currentPost = parentPost;
      } else {
        break;
      }
    }

    return parentChain;
  };

  return (
    posts &&
    users && (
      <div className="fixed inset-0 overflow-y-auto overflow-x-hidden bg-black text-white">
        <div className="w-full flex relative">
          <div className="hidden md:block md:h-screen md:w-[calc((100vw-600px)/2)]"></div>
          <Navbar />
          <main className="w-full md:w-[600px] pb-16 md:pb-0 border-gray-600 border-2">
            <div className="sticky top-0 bg-black z-10">
              <div className="flex items-center gap-6 px-4 py-3">
                <Link
                  href="/home"
                  className="p-2 hover:bg-gray-800 rounded-full"
                >
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

            {getParentChain().map((post) => (
              <Tweet key={post.post_id} post={post} />
            ))}
            {posts
              .filter((post) => post.post_id.toString() === params.id)
              .map((post) => (
                <div ref={targetRef} key={post.post_id}>
                  <Tweet post={post} />
                </div>
              ))}

            <Messagebox
              id={Number(params.id)}
              avatar={users.filter((u) => u.username === user)[0]?.avatar}
            />

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
