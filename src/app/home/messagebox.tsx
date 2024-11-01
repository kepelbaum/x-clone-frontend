"use client";

import { useAppState } from "../lib/context";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function Messagebox() {
  const token = localStorage.getItem("token");
  const { updateCounter, setUpdateCounter } = useAppState();
  const [content, setContent] = useState("");

  const hasContent = content.length > 0;
  const isOverLimit = content.length > 255;

  const router = useRouter();

  async function submitTweet() {
    if (hasContent && !isOverLimit) {
      try {
        const response = await fetch(
          "https://x-clone-backend-production-15d8.up.railway.app/api/post",
          {
            mode: "cors",
            method: "POST",
            body: JSON.stringify({
              content: content,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              authorization: "Bearer " + (token ? token.toString() : ""),
            },
          }
        );
        const data = await response.json();
        if (data.post_id) {
          setUpdateCounter(updateCounter + 1);
          setContent("");
          // router.push("/home");
        } else {
          console.log("Error - unable to create tweet");
        }
      } catch (error) {
        console.error("Error:", error);
        console.log(["An error occurred during tweet post"]);
      }
    }
  }

  return (
    <div className="border-b border-gray-600 p-4">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-white flex-shrink-0" />
        <div className="flex-grow">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening?"
            className="w-full bg-transparent text-xl text-white placeholder-gray-500 border-none resize-none outline-none min-h-[120px]"
          />
          <div className="flex items-center justify-between mt-3">
            <div className="flex gap-4 text-blue-500">
              <button className="hover:bg-blue-500/10 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-image"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
              </button>
              <button className="hover:bg-blue-500/10 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-sticker"
                >
                  <path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z" />
                  <path d="M15 3v6h6" />
                </svg>
              </button>
              <button className="hover:bg-blue-500/10 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-bar-chart"
                >
                  <line x1="12" x2="12" y1="20" y2="10" />
                  <line x1="18" x2="18" y1="20" y2="4" />
                  <line x1="6" x2="6" y1="20" y2="16" />
                </svg>
              </button>
              <button className="hover:bg-blue-500/10 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-smile"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" x2="9.01" y1="9" y2="9" />
                  <line x1="15" x2="15.01" y1="9" y2="9" />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-4">
              <span
                className={`text-sm ${
                  content.length === 0
                    ? "text-gray-500"
                    : isOverLimit
                    ? "text-red-500"
                    : "text-gray-400"
                }`}
              >
                {content.length}/255
              </span>
              <button
                onClick={submitTweet}
                className="bg-blue-500 text-white px-4 py-1.5 rounded-full font-bold hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-blue-500"
                disabled={!hasContent || isOverLimit}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
