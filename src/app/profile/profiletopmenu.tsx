"use client";

import { useAppState } from "../lib/context";

export function Profiletopmenu({ hide }: { hide: boolean }) {
  const { active, setActive } = useAppState();
  return (
    <div className="border-b border-gray-600 mt-4">
      <div className="flex">
        <button
          onClick={() => setActive("posts")}
          className={`flex-1 py-4 hover:bg-gray-900 relative text-center font-bold ${
            active === "posts" ? "" : "text-gray-500"
          }`}
        >
          Posts
          <div
            className={`absolute bottom-0 left-0 right-0 h-1 ${
              active === "posts" ? "bg-blue-500" : "text-gray-500"
            }`}
          />
        </button>
        <button
          onClick={() => setActive("replies")}
          className={`flex-1 py-4 hover:bg-gray-900 relative text-center font-bold ${
            active === "replies" ? "" : "text-gray-500"
          }`}
        >
          Replies
          <div
            className={`absolute bottom-0 left-0 right-0 h-1 ${
              active === "replies" ? "bg-blue-500" : ""
            }`}
          />
        </button>
        <button
          onClick={() => setActive("likes")}
          className={`flex-1 py-4 hover:bg-gray-900 relative text-center font-bold ${
            active === "likes" ? "" : "text-gray-500"
          } ${hide ? "hidden" : ""}`}
        >
          Likes
          <div
            className={`absolute bottom-0 left-0 right-0 h-1 ${
              active === "likes" ? "bg-blue-500" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
}
