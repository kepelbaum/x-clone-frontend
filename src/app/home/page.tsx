"use client";

import React, { useEffect, useState } from "react";
import { useAppState } from "../lib/context";
import { useHomeFetch } from "../lib/fetch";
import { Navbar } from "../navbar";
import { TopHomeMenu } from "./tophomemenu";
import { Messagebox } from "./messagebox";
import { Tweet } from "../lib/tweet";
import { Rightsection } from "../lib/rightsection";
import { useLocalStorage } from "../lib/useLocalStorage";
import dynamic from "next/dynamic";
import { Post } from "../lib/definitions";

export default function Home() {
  return <DynamicHomeContent />;
}

const DynamicHomeContent = dynamic(() => Promise.resolve(HomeContent), {
  ssr: false,
  loading: () => <div className="bg-black w-screen h-screen" />,
});

function HomeContent() {
  const { posts, users, updateCounter, active, setActive, follows } =
    useAppState();
  const user = useLocalStorage("username");
  const [localUpdateCounter, setLocalUpdateCounter] = useState(0);
  const { fetchPosts, fetchUsers, fetchFollows, fetchLikes, fetchMessages } =
    useHomeFetch();

  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 20;
  const [loading, setLoading] = useState(false);

  const userAvatar = users?.filter((u) => u.username === user)[0]?.avatar;

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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localUpdateCounter]);

  const getFilteredPosts = (): Post[] => {
    if (!posts) return [];

    if (active === "foryou") {
      return posts
        .filter((post) => !post.ifreply)
        .sort((a, b) => (a.post_id > b.post_id ? -1 : 1));
    } else {
      return posts
        .filter(
          (post) =>
            !post.ifreply &&
            follows.notifications.some(
              (notification) =>
                notification.follower === user &&
                notification.following === post.username
            )
        )
        .sort((a, b) => (a.post_id > b.post_id ? -1 : 1));
    }
  };

  useEffect(() => {
    if (posts) {
      const filteredPosts = getFilteredPosts();
      const initialPosts = filteredPosts.slice(0, postsPerPage);
      setDisplayedPosts(initialPosts);
      setCurrentPage(1);
    }
  }, [posts, active]);

  const loadMorePosts = () => {
    setLoading(true);
    const filteredPosts = getFilteredPosts();
    const nextPosts = filteredPosts.slice(0, (currentPage + 1) * postsPerPage);
    setDisplayedPosts(nextPosts);
    setCurrentPage((prev) => prev + 1);
    setLoading(false);
  };

  if (!posts || !users || !userAvatar || !user) return null;

  const hasMorePosts = getFilteredPosts().length > displayedPosts.length;

  return (
    <div className="bg-black text-white min-h-screen fixed inset-0 overflow-y-auto overflow-x-hidden">
      <div className="w-full max-w-[100vw] flex relative">
        <div className="hidden md:block md:h-screen md:w-[calc((100vw-600px)/2)]"></div>
        <Navbar />
        <main className="w-full md:w-[600px] pb-16 md:pb-0 border-gray-600 border-2">
          <TopHomeMenu />
          <Messagebox avatar={userAvatar} />
          {displayedPosts.map((post) => (
            <Tweet key={post.post_id} post={post} />
          ))}
          {hasMorePosts && (
            <button
              onClick={loadMorePosts}
              disabled={loading}
              className="w-full py-4 text-blue-400 hover:bg-gray-900 transition-colors disabled:opacity-50"
            >
              {loading ? "Loading..." : "Show more"}
            </button>
          )}
        </main>
        <Rightsection />
        <div className="hidden md:block md:h-screen md:w-[calc((100vw-600px)/2)]"></div>
      </div>
    </div>
  );
}
