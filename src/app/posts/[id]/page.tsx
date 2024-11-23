"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useAppState } from "@/app/lib/context";
import { useHomeFetch } from "@/app/lib/fetch";
import { Navbar } from "@/app/navbar";
import { Messagebox } from "@/app/home/messagebox";
import { Tweet } from "@/app/lib/tweet";
import { Rightsection } from "@/app/lib/rightsection";
import { useParams } from "next/navigation";
import { Post } from "@/app/lib/definitions";

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { posts, users, updateCounter, setActive } = useAppState();
  const [localUpdateCounter, setLocalUpdateCounter] = useState(0);
  const params = useParams();
  const user = localStorage.getItem("username");
  const { fetchPosts, fetchUsers, fetchFollows, fetchLikes, fetchMessages } =
    useHomeFetch();

  const [displayedPreviousReplies, setDisplayedPreviousReplies] = useState<
    Post[]
  >([]);
  const [displayedNextReplies, setDisplayedNextReplies] = useState<Post[]>([]);
  const [loadingPrevious, setLoadingPrevious] = useState(false);
  const [loadingNext, setLoadingNext] = useState(false);
  const repliesPerPage = 20;

  const userAvatar = users.filter((u) => u.username === user)[0]?.avatar;

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

  const getAllReplies = (): Post[] => {
    if (!posts) return [];
    const targetPost = posts.find((p) => p.post_id.toString() === params.id);
    if (!targetPost) return [];

    return posts
      .filter((post) => post.ifreply && post.ifreply === targetPost.ifreply)
      .sort((a, b) => (a.date > b.date ? 1 : -1));
  };

  useEffect(() => {
    if (posts && params.id) {
      const allReplies = getAllReplies();
      const targetPostIndex = allReplies.findIndex(
        (p) => p.post_id.toString() === params.id
      );

      if (targetPostIndex !== -1) {
        const nextReplies = allReplies.slice(
          targetPostIndex + 1,
          targetPostIndex + 1 + repliesPerPage
        );
        setDisplayedNextReplies(nextReplies);

        const previousReplies = allReplies.slice(
          Math.max(0, targetPostIndex - 3),
          targetPostIndex
        );
        setDisplayedPreviousReplies(previousReplies);
      } else {
        const replies = posts
          .filter(
            (post) => post.ifreply && post.ifreply.toString() === params.id
          )
          .sort((a, b) => (a.date > b.date ? 1 : -1))
          .slice(0, repliesPerPage);
        setDisplayedNextReplies(replies);
      }

      setTimeout(() => {
        targetRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }
  }, [posts, params.id]);

  const loadPreviousReplies = () => {
    setLoadingPrevious(true);
    const allReplies = getAllReplies();
    const currentFirstIndex = allReplies.findIndex(
      (p) => p.post_id === displayedPreviousReplies[0]?.post_id
    );

    const newReplies = allReplies.slice(
      Math.max(0, currentFirstIndex - repliesPerPage),
      currentFirstIndex
    );

    setDisplayedPreviousReplies((prev) => [...newReplies, ...prev]);
    setLoadingPrevious(false);
  };

  const loadMoreReplies = () => {
    setLoadingNext(true);
    const allReplies = getAllReplies();
    const currentLastIndex = allReplies.findIndex(
      (p) =>
        p.post_id ===
        displayedNextReplies[displayedNextReplies.length - 1]?.post_id
    );

    const newReplies = allReplies.slice(
      currentLastIndex + 1,
      currentLastIndex + 1 + repliesPerPage
    );

    setDisplayedNextReplies((prev) => [...prev, ...newReplies]);
    setLoadingNext(false);
  };

  if (!posts || !users || !userAvatar) return null;

  const allReplies = getAllReplies();
  const targetPostIndex = allReplies.findIndex(
    (p) => p.post_id.toString() === params.id
  );
  const hasMorePreviousReplies =
    targetPostIndex > displayedPreviousReplies.length;
  const hasMoreNextReplies =
    targetPostIndex !== -1
      ? allReplies.length - (targetPostIndex + 1) > displayedNextReplies.length
      : allReplies.length > displayedNextReplies.length;

  return (
    <div className="fixed inset-0 overflow-y-auto overflow-x-hidden bg-black text-white">
      <div className="w-full flex relative">
        <div className="hidden md:block md:h-screen md:w-[calc((100vw-600px)/2)]"></div>
        <Navbar />
        <main className="w-full md:w-[600px] pb-16 md:pb-0 border-gray-600 border-2">
          <div className="sticky top-0 bg-black z-10">
            <div className="flex items-center gap-6 px-4 py-3">
              <Link href="/home" className="p-2 hover:bg-gray-800 rounded-full">
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

          {hasMorePreviousReplies && (
            <button
              onClick={loadPreviousReplies}
              disabled={loadingPrevious}
              className="w-full py-4 text-blue-400 hover:bg-gray-900 transition-colors disabled:opacity-50"
            >
              {loadingPrevious ? "Loading..." : "Show previous replies"}
            </button>
          )}

          {displayedPreviousReplies.map((post) => (
            <Tweet key={post.post_id} post={post} />
          ))}

          {posts
            .filter((post) => post.post_id.toString() === params.id)
            .map((post) => (
              <div ref={targetRef} key={post.post_id}>
                <Tweet post={post} />
              </div>
            ))}

          <Messagebox id={Number(params.id)} avatar={userAvatar} />

          {displayedNextReplies.map((post) => (
            <Tweet key={post.post_id} post={post} />
          ))}

          {hasMoreNextReplies && (
            <button
              onClick={loadMoreReplies}
              disabled={loadingNext}
              className="w-full py-4 text-blue-400 hover:bg-gray-900 transition-colors disabled:opacity-50"
            >
              {loadingNext ? "Loading..." : "Show more replies"}
            </button>
          )}
        </main>
        <Rightsection />
        <div className="hidden md:block md:h-screen md:w-[calc((100vw-600px)/2)]"></div>
      </div>
    </div>
  );
}
