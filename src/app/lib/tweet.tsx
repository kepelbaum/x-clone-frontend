"use client";

import { useAppState } from "./context";
import { Post } from "./definitions";

export function Tweet({ post }: { post: Post }) {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("username");
  const { updateCounter, setUpdateCounter } = useAppState();

  async function deleteTweet(post_id: number) {
    try {
      console.log(token, post_id);
      const response = await fetch(
        "https://x-clone-backend-production-15d8.up.railway.app/api/post/" +
          post_id,
        {
          mode: "cors",
          method: "DELETE",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            authorization: "Bearer " + (token ? token.toString() : ""),
          },
        }
      );
      console.log(response);
      const data = await response.text();
      if (data === "Post deleted") {
        setUpdateCounter(updateCounter + 1);
      } else {
        console.log("Error - unable to delete tweet");
      }
    } catch (error) {
      console.error("Error:", error);
      console.log(["An error occurred during tweet deletion"]);
    }
  }

  return (
    <div className="flex flex-col">
      {post.isretweet && (
        <div className="flex items-center gap-2 px-4 pt-3 text-gray-500 text-sm">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M17 1l4 4-4 4" />
            <path d="M3 11V9a4 4 0 0 1 4-4h14" />
            <path d="M7 23l-4-4 4-4" />
            <path d="M21 13v2a4 4 0 0 1-4 4H3" />
          </svg>
          <span>Placeholder Retweeted</span>
        </div>
      )}

      <div className="border-gray-600 border-b p-4 flex gap-2 hover:bg-gray-600/50">
        <div className="w-10 h-10 bg-white rounded-full flex-shrink-0" />
        <div className="flex flex-col min-w-0 w-full">
          <div className="flex justify-between items-start w-full">
            <div className="flex gap-3 items-center flex-wrap">
              <p className="font-bold truncate">{"Placeholder"}</p>
              <p className="text-gray-400 truncate">{"@" + post.username}</p>
              <p className="text-gray-400 text-sm">{post.date}</p>
            </div>
            <button
              onClick={() => deleteTweet(post.post_id)}
              className={`${
                post.username === user ? "" : "hidden"
              } p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-full`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </button>
          </div>

          <p className="break-words">{post.content}</p>

          <div className="flex justify-between mt-3 max-w-[425px] text-gray-500">
            <div className="flex items-center group">
              <button className="p-2 hover:bg-blue-500/10 rounded-full group-hover:text-blue-500">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </button>
              <span className="text-sm group-hover:text-blue-500">24</span>
            </div>

            <div
              className={`flex items-center group ${
                post.isretweet ? "text-green-500" : ""
              }`}
            >
              <button className="p-2 hover:bg-green-500/10 rounded-full group-hover:text-green-500">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill={post.isretweet ? "currentColor" : "none"}
                  stroke="currentColor"
                >
                  <path d="M17 1l4 4-4 4" />
                  <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                  <path d="M7 23l-4-4 4-4" />
                  <path d="M21 13v2a4 4 0 0 1-4 4H3" />
                </svg>
              </button>
              <span className="text-sm group-hover:text-green-500">5</span>
            </div>

            <div className="flex items-center group">
              <button className="p-2 hover:bg-pink-500/10 rounded-full group-hover:text-pink-500">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
              <span className="text-sm group-hover:text-pink-500">182</span>
            </div>

            <div className="flex items-center group">
              <button className="p-2 hover:bg-blue-500/10 rounded-full group-hover:text-blue-500">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <polyline points="16 6 12 2 8 6" />
                  <line x1="12" y1="2" x2="12" y2="15" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
