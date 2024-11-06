"use client";

import { useAppState } from "../lib/context";
import { Profiletopmenu } from "./profiletopmenu";
import { Tweet } from "../lib/tweet";
import { User } from "../lib/definitions";
import { formatTimeMonthYear } from "../lib/utils";

interface ProfileProps {
  profileUser: User;
}

export function Profile({ profileUser }: ProfileProps) {
  const { posts, users, follows } = useAppState();
  const user = localStorage.getItem("username");
  return (
    <main className="w-full md:w-[600px] pb-16 md:pb-0">
      <div className="relative">
        <div className="h-48 bg-gray-700" />
        <div className="absolute left-4 -bottom-16">
          <div className="w-32 h-32 rounded-full border-4 border-black bg-white" />
        </div>
      </div>

      <div className="pt-20 px-4">
        <div className="flex justify-end">
          <button
            className={`border border-gray-600 px-4 py-1.5 rounded-full font-bold hover:bg-gray-900 ${
              user === profileUser.username ? "" : "hidden"
            }`}
          >
            Edit profile
          </button>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-bold">{profileUser.displayname}</h2>
          <p className="text-gray-500">{"@" + profileUser.username}</p>
          <p className="mt-3">{profileUser.aboutme}</p>
          <div className="mt-3 text-gray-400">
            <div className="flex gap-2 items-center mb-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>
                {profileUser.location ? profileUser.location : "Unknown"}
              </span>
            </div>

            <div className="flex gap-2 items-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
              <span>Joined {formatTimeMonthYear(profileUser.date)}</span>
            </div>
          </div>

          <div className="flex gap-4 mt-3 text-gray-400">
            <div className="flex gap-1">
              <span className="text-white font-bold">
                {follows.followingCounts?.[profileUser.username] || 0}
              </span>
              Following
            </div>
            <div className="flex gap-1">
              <span className="text-white font-bold">
                {follows.followerCounts?.[profileUser.username] || 0}
              </span>
              Followers
            </div>
          </div>
        </div>
        <Profiletopmenu />
      </div>
      {posts.map((post) => (
        <Tweet key={post.post_id} post={post} />
      ))}
    </main>
  );
}
