"use client";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useAppState } from "../lib/context";
import { useHomeFetch } from "../lib/fetch";
import { Navbar } from "../navbar";
import { Tweet } from "../lib/tweet";
import { Rightsection } from "../lib/rightsection";
import { useSearchParams, useRouter } from "next/navigation";
import { Post } from "../lib/definitions";

function ExploreContent() {
  const { posts, users, updateCounter } = useAppState();
  const [localUpdateCounter, setLocalUpdateCounter] = useState(0);
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("key") || "");

  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 20;
  const [loading, setLoading] = useState(false);

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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localUpdateCounter]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchQuery(newValue);
    setCurrentPage(1);

    if (newValue.trim()) {
      router.push(`/explore?key=${newValue.trim()}`);
    } else {
      router.push("/explore");
    }
  };

  const getFilteredPosts = (): Post[] => {
    if (!posts) return [];

    const filtered =
      searchQuery === ""
        ? posts.filter((post) => !post.ifreply)
        : posts.filter(
            (post) =>
              !post.ifreply &&
              post.content?.toLowerCase().includes(searchQuery.toLowerCase())
          );

    return filtered.sort((a, b) => (a.date > b.date ? -1 : 1));
  };

  useEffect(() => {
    if (posts) {
      const filteredPosts = getFilteredPosts();
      const initialPosts = filteredPosts.slice(0, postsPerPage);
      setDisplayedPosts(initialPosts);
      setCurrentPage(1);
    }
  }, [posts, searchQuery]);

  const loadMorePosts = () => {
    setLoading(true);
    const filteredPosts = getFilteredPosts();
    const nextPosts = filteredPosts.slice(0, (currentPage + 1) * postsPerPage);
    setDisplayedPosts(nextPosts);
    setCurrentPage((prev) => prev + 1);
    setLoading(false);
  };

  if (!posts || !users) return null;

  const allFilteredPosts = getFilteredPosts();
  const hasMorePosts = allFilteredPosts.length > displayedPosts.length;

  return (
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
          <div className="divide-y divide-gray-600">
            {displayedPosts.map((post) => (
              <Tweet key={post.post_id} post={post} />
            ))}
            {searchQuery !== "" && allFilteredPosts.length === 0 && (
              <div className="p-4 text-center text-gray-500">
                No posts found matching {`${searchQuery}`}
              </div>
            )}
            {hasMorePosts && (
              <button
                onClick={loadMorePosts}
                disabled={loading}
                className="w-full py-4 text-blue-400 hover:bg-gray-900 transition-colors disabled:opacity-50"
              >
                {loading ? "Loading..." : "Show more"}
              </button>
            )}
          </div>
        </main>
        <Rightsection ifSearchInvisible={true} />
        <div className="hidden md:block md:h-screen md:w-[calc((100vw-600px)/2)]"></div>
      </div>
    </div>
  );
}

export default function Explore() {
  return (
    <Suspense fallback={<div className="bg-black w-screen h-screen" />}>
      <ExploreContent />
    </Suspense>
  );
}
