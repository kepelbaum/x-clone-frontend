"use client";

import { useAppState } from "./context";
import { Post } from "./definitions";
import { convertTime } from "./utils";
import Link from "next/link";
export function Tweet({ post }: { post: Post }) {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("username");
  const { updateCounter, setUpdateCounter, likes, follows, users, posts } =
    useAppState();

  async function handleLike(post_id: number) {
    try {
      const response = await fetch(
        "https://x-clone-backend-production-15d8.up.railway.app/api/like/" +
          post_id,
        {
          mode: "cors",
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            authorization: "Bearer " + (token ? token.toString() : ""),
          },
        }
      );
      console.log(response);
      const data = await response.text();
      if (data === "Post liked" || "Post unliked") {
        setUpdateCounter(updateCounter + 1);
      } else {
        console.log("Error - unable to like/unlike tweet");
      }
    } catch (error) {
      console.error("Error:", error);
      console.log(["An error occurred during a like/unlike"]);
    }
  }

  async function submitRetweet(post_id: number) {
    if (
      posts.filter((ele) => ele.ifretweet === post_id && ele.username === user)
        .length === 0
    ) {
      try {
        const response = await fetch(
          `https://x-clone-backend-production-15d8.up.railway.app/api/post/retweet/` +
            post_id,
          {
            mode: "cors",
            method: "POST",
            headers: {
              authorization: "Bearer " + (token ? token.toString() : ""),
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || "Retweet failed");
        }

        const data = await response.json();
        if (data.post_id) {
          setUpdateCounter(updateCounter + 1);
        } else {
          throw new Error("Failed to create retweet");
        }
      } catch (error) {
        console.error("Error:", error);
        console.log(["An error occurred during retweet"]);
      }
    }
  }

  async function deleteTweet(post_id: number) {
    try {
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
    posts &&
    users &&
    follows &&
    likes && (
      <div className="flex flex-col">
        {post.ifretweet && (
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
            <span>
              {users.filter((ele) => ele.username === post.username)[0]
                ?.displayname + " "}{" "}
              Retweeted {" (" + convertTime(post.date) + ")"}
            </span>
          </div>
        )}

        <div className="border-gray-600 border-b p-4 flex gap-2 hover:bg-gray-600/50">
          <Link
            href={
              post.ifretweet
                ? `/profile/${
                    posts.find((ele) => ele.post_id === post.ifretweet)
                      ?.username
                  }`
                : `/profile/${post.username}`
            }
            className="w-10 h-10 bg-white rounded-full flex-shrink-0"
          />

          <div className="flex flex-col min-w-0 w-full">
            <div className="flex justify-between items-start w-full">
              <Link
                href={
                  post.ifreply
                    ? `/posts/${post.ifreply}`
                    : `/posts/${post.post_id}`
                }
                className="flex flex-1"
              >
                <div className="flex gap-3 items-center flex-wrap">
                  <p className="font-bold truncate">
                    {
                      users.find(
                        (u) =>
                          u.username ===
                          (post.ifretweet
                            ? posts.find(
                                (ele) => ele.post_id === post.ifretweet
                              )?.username
                            : post.username)
                      )?.displayname
                    }
                  </p>
                  <p className="text-gray-400 truncate">
                    {post.ifretweet
                      ? "@" +
                        posts.find((ele) => ele.post_id === post.ifretweet)
                          ?.username
                      : "@" + post.username}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {post.ifretweet
                      ? convertTime(
                          posts.find((ele) => ele.post_id === post.ifretweet)
                            ?.date
                        )
                      : convertTime(post.date)}
                  </p>
                </div>
              </Link>

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

            <Link
              href={
                post.ifretweet
                  ? `/posts/${post.ifretweet}`
                  : post.ifreply
                  ? `/posts/${post.ifreply}`
                  : `/posts/${post.post_id}`
              }
              className="block"
            >
              <p className="break-words">{post.content}</p>
            </Link>

            <div className="flex justify-between mt-3 max-w-[425px] text-gray-500">
              <div
                className={`flex items-center group ${
                  post.ifreply ? "hidden" : ""
                }`}
              >
                <Link
                  href={
                    post.ifretweet
                      ? `/posts/${post.ifretweet}`
                      : `/posts/${post.post_id}`
                  }
                  className={`${
                    posts.some(
                      (ele) =>
                        ele.ifreply ===
                          (post.ifretweet ? post.ifretweet : post.post_id) &&
                        ele.username === user
                    )
                      ? "text-blue-500"
                      : ""
                  } p-2 hover:bg-blue-500/10 rounded-full group-hover:text-blue-500`}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill={`${
                      posts.some(
                        (ele) =>
                          ele.ifreply ===
                            (post.ifretweet ? post.ifretweet : post.post_id) &&
                          ele.username === user
                      )
                        ? "currentColor"
                        : ""
                    }`}
                    stroke="currentColor"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </Link>
                <span className="text-sm group-hover:text-blue-500">
                  {
                    posts.filter(
                      (ele) =>
                        ele.ifreply ===
                        (post.ifretweet ? post.ifretweet : post.post_id)
                    ).length
                  }
                </span>
              </div>
              <div className={`${post.ifreply ? "" : "hidden"}`}></div>

              <div
                className={`flex items-center group ${
                  post.ifreply ? "hidden" : ""
                } ${
                  post.ifretweet ||
                  posts.find(
                    (ele) =>
                      ele.username === user && ele.ifretweet === post.post_id
                  )
                    ? "text-green-500"
                    : ""
                }`}
              >
                <button
                  onClick={() =>
                    submitRetweet(
                      post.ifretweet ? post.ifretweet : post.post_id
                    )
                  }
                  className="p-2 hover:bg-green-500/10 rounded-full group-hover:text-green-500"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill={
                      post.ifretweet ||
                      posts.map(
                        (ele) =>
                          ele.username === user &&
                          ele.ifretweet === post.post_id
                      )
                        ? "currentColor"
                        : "none"
                    }
                    stroke="currentColor"
                  >
                    <path d="M17 1l4 4-4 4" />
                    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                    <path d="M7 23l-4-4 4-4" />
                    <path d="M21 13v2a4 4 0 0 1-4 4H3" />
                  </svg>
                </button>
                <span className="text-sm group-hover:text-green-500">
                  {post.ifretweet
                    ? posts.filter((ele) => ele.ifretweet === post.ifretweet)
                        .length
                    : posts.filter((ele) => ele.ifretweet === post.post_id)
                        .length}
                </span>
              </div>
              <div className={`${post.ifreply ? "" : "hidden"}`}></div>

              <div
                className={`flex items-center group ${
                  likes.notifications.find(
                    (ele) =>
                      ele.post_id ===
                        (post.ifretweet ? post.ifretweet : post.post_id) &&
                      ele.username === user
                  )
                    ? "text-pink-500"
                    : ""
                }`}
              >
                <button
                  onClick={() =>
                    handleLike(post.ifretweet ? post.ifretweet : post.post_id)
                  }
                  className="p-2 hover:bg-pink-500/10 rounded-full group-hover:text-pink-500"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill={
                      likes.notifications.find(
                        (ele) =>
                          ele.post_id ===
                            (post.ifretweet ? post.ifretweet : post.post_id) &&
                          ele.username === user
                      )
                        ? "currentColor"
                        : "none"
                    }
                    stroke="currentColor"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
                <span className="text-sm group-hover:text-pink-500">
                  {likes.likeCounts[
                    post.ifretweet ? post.ifretweet : post.post_id
                  ]
                    ? likes.likeCounts[
                        post.ifretweet ? post.ifretweet : post.post_id
                      ]
                    : 0}
                </span>
              </div>

              <div className="flex items-center group">
                <button
                  onClick={() => {
                    const postId = post.ifretweet
                      ? post.ifretweet
                      : post.post_id;
                    navigator.clipboard.writeText(
                      `${window.location.origin}/posts/${postId}`
                    );
                  }}
                  className="p-2 hover:bg-blue-500/10 rounded-full group-hover:text-blue-500"
                >
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
    )
  );
}
