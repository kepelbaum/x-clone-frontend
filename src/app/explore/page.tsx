"use client";

import { useEffect, useState } from "react";
import { useAppState } from "../lib/context";
import { useHomeFetch } from "../lib/fetch";
import { Navbar } from "../navbar";
import { Tweet } from "../lib/tweet";
import { Rightsection } from "../lib/rightsection";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

export default function Explore() {
  const { posts, users, updateCounter } = useAppState();
  const [localUpdateCounter, setLocalUpdateCounter] = useState(0);
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("key") || "");

  const { fetchPosts, fetchUsers, fetchMessages, fetchFollows, fetchLikes } =
    useHomeFetch();

  useEffect(() => {
    const key = searchParams.get("key");
    if (key !== null) {
      setSearchQuery(key);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchPosts();
    fetchUsers();
    fetchMessages();
    fetchFollows();
    fetchLikes();
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchQuery(newValue);

    if (newValue.trim()) {
      router.push(`/explore?key=${newValue.trim()}`);
    } else {
      router.push("/explore");
    }
  };

  const filteredPosts = posts?.filter((post) =>
    post.content?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    posts &&
    users && (
      <div className="fixed inset-0 overflow-y-auto overflow-x-hidden bg-black text-white">
        <div className="w-full flex relative">
          <div className="hidden md:block md:h-screen md:w-[calc((100vw-600px)/2)]"></div>
          <Navbar />

          <main className="w-full md:w-[600px] pb-16 md:pb-0 border-x border-gray-600">
            <div className="sticky top-0 z-10 bg-black/80">
              <div className="px-4 py-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="text-gray-400"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search posts"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full bg-gray-900 rounded-full py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="h-px bg-gray-600" />
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              <div className="divide-y divide-gray-600">
                {searchQuery === ""
                  ? posts
                      .filter((post) => !post.ifreply)
                      .sort((a, b) => (a.date > b.date ? -1 : 1))
                      .map((post) => <Tweet key={post.post_id} post={post} />)
                  : filteredPosts
                      .filter((post) => !post.ifreply)
                      .sort((a, b) => (a.date > b.date ? -1 : 1))
                      .map((post) => <Tweet key={post.post_id} post={post} />)}
                {searchQuery !== "" && filteredPosts.length === 0 && (
                  <div className="p-4 text-center text-gray-500">
                    No posts found matching {`${searchQuery}`}
                  </div>
                )}
              </div>
            </Suspense>
          </main>
          <Rightsection ifSearchInvisible={true} />
          <div className="hidden md:block md:h-screen md:w-[calc((100vw-600px)/2)]"></div>
        </div>
      </div>
    )
  );
}
