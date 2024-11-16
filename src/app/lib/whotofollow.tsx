"use client";

import { useState, useEffect } from "react";
import { useAppState } from "./context";
import Link from "next/link";
import Image from "next/image";
import { useLocalStorage } from "./useLocalStorage";

interface User {
  username: string;
  displayname: string;
  avatar: string;
}

export function Whotofollow({ profUsername }: { profUsername?: string }) {
  const { users, follows } = useAppState();
  const token = useLocalStorage("token");
  const user = localStorage.getItem("username");

  const [followStatus, setFollowStatus] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [recommendedUsers, setRecommendedUsers] = useState<Array<User>>([]);

  useEffect(() => {
    if (users?.length && follows?.notifications?.length) {
      const notFollowed = users
        .filter(
          (ele) =>
            ele.username !== user &&
            ele.username !== profUsername &&
            !follows.notifications.some(
              (notification) =>
                notification.follower === user &&
                notification.following === ele.username
            )
        )
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      setRecommendedUsers(notFollowed);

      const initialStatus = notFollowed.reduce(
        (acc, ele) => ({
          ...acc,
          [ele.username]: false,
        }),
        {}
      );
      setFollowStatus(initialStatus);
    }
  }, [users, follows?.notifications, user, profUsername]);

  if (!follows?.notifications?.length) return null;

  if (recommendedUsers.length === 0) return null;

  const toggleFollow = async (username: string) => {
    try {
      const response = await fetch(
        "https://x-clone-backend-production-15d8.up.railway.app/api/follow/" +
          username,
        {
          mode: "cors",
          method: "POST",
          headers: {
            authorization: "Bearer " + (token ? token.toString() : ""),
          },
        }
      );

      const result = await response.text();
      if (result === "User followed" || result === "User unfollowed") {
        setFollowStatus((prev) => ({
          ...prev,
          [username]: !prev[username],
        }));
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="bg-gray-900 rounded-2xl">
      <h2 className="text-xl font-bold p-4">Who to follow</h2>

      {recommendedUsers.map((ele) => (
        <div
          key={ele.username}
          className="px-2 py-3 hover:bg-gray-800 flex items-center justify-between"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex-shrink-0">
              <Link href={`/profile/${ele.username}`}>
                <div className="relative w-10 h-10">
                  <Image
                    src={ele.avatar}
                    alt={`${ele.username}'s avatar`}
                    fill
                    className="rounded-full object-cover"
                    sizes="40px"
                  />
                </div>
              </Link>
            </div>
            <div className="min-w-0 flex-shrink">
              <p className="font-bold truncate max-w-[120px]">
                {ele.displayname}
              </p>
              <p className="text-gray-500 truncate max-w-[120px]">
                @{ele.username}
              </p>
            </div>
          </div>
          <div className="group flex-shrink-0">
            <button
              onClick={() => toggleFollow(ele.username)}
              className={`border px-2 py-1.5 rounded-full font-bold min-w-[100px] transition-colors
            ${
              !followStatus[ele.username]
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-transparent text-white border-gray-600 group-hover:border-red-500 group-hover:bg-red-500/10"
            }`}
            >
              {!followStatus[ele.username] ? (
                "Follow"
              ) : (
                <>
                  <span className="group-hover:hidden">Following</span>
                  <span className="hidden group-hover:inline text-red-500">
                    Unfollow
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      ))}

      {/* {recommendedUsers.length === 3 && (
        <button className="w-full p-4 text-blue-500 hover:bg-gray-800 text-left rounded-b-2xl">
          Show more
        </button>
      )} */}
    </div>
  );
}
