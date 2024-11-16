import { useEffect, Suspense } from "react";
import { useAppState } from "../lib/context";
import { useHomeFetch } from "../lib/fetch";
import { Navbar } from "../navbar";
import { TopHomeMenu } from "./tophomemenu";
import { Messagebox } from "./messagebox";
import { Tweet } from "../lib/tweet";
import { Rightsection } from "../lib/rightsection";
import { useState } from "react";
import { useLocalStorage } from "../lib/useLocalStorage";

export function HomeContent() {
  const { posts, users, updateCounter, active, setActive, follows } =
    useAppState();
  const user = useLocalStorage("username");
  const [localUpdateCounter, setLocalUpdateCounter] = useState(0);
  const { fetchPosts, fetchUsers, fetchFollows, fetchLikes, fetchMessages } =
    useHomeFetch();

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

  if (!posts || !users || !userAvatar || !user) return null;

  return (
    <div className="bg-black text-white min-h-screen fixed inset-0 overflow-y-auto overflow-x-hidden">
      <div className="w-full max-w-[100vw] flex relative">
        <div className="hidden md:block md:h-screen md:w-[calc((100vw-600px)/2)]"></div>
        <Navbar />
        <main className="w-full md:w-[600px] pb-16 md:pb-0 border-gray-600 border-2">
          <TopHomeMenu />
          <Messagebox avatar={userAvatar} />
          {active === "foryou" &&
            posts
              .filter((post) => !post.ifreply)
              .sort((a, b) => {
                return a.post_id > b.post_id ? -1 : 1;
              })
              .map((post) => <Tweet key={post.post_id} post={post} />)}
          {active === "following" &&
            posts
              .filter(
                (post) =>
                  !post.ifreply &&
                  follows.notifications.some(
                    (notification) =>
                      notification.follower === user &&
                      notification.following === post.username
                  )
              )
              .sort((a, b) => {
                return a.post_id > b.post_id ? -1 : 1;
              })
              .map((post) => <Tweet key={post.post_id} post={post} />)}
        </main>
        <Rightsection />
        <div className="hidden md:block md:h-screen md:w-[calc((100vw-600px)/2)]"></div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
