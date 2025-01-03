"use client";

import { useAppState } from "../lib/context";
import { Profiletopmenu } from "./profiletopmenu";
import { Tweet } from "../lib/tweet";
import { User, Post } from "../lib/definitions";
import { formatTimeMonthYear } from "../lib/utils";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocalStorage } from "../lib/useLocalStorage";
import Image from "next/image";

interface ProfileProps {
  profileUser: User;
}

export function Profile({ profileUser }: ProfileProps) {
  const { posts, follows, updateCounter, setUpdateCounter, active, likes } =
    useAppState();
  const token = useLocalStorage("token");
  const user = useLocalStorage("username");
  const [editActive, setEditActive] = useState(false);
  const [location, setLocation] = useState(profileUser.location || "Unknown");
  const [aboutme, setAboutme] = useState(profileUser.aboutme || "");
  const [displayname, setDisplayname] = useState(profileUser.displayname);
  const [avatar, setAvatar] = useState(profileUser.avatar);
  const [background, setBackground] = useState(profileUser.background);

  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 20;
  const [loading, setLoading] = useState(false);

  const getFilteredPosts = (): Post[] => {
    if (!posts) return [];

    let filtered: Post[] = [];
    switch (active) {
      case "posts":
        filtered = posts.filter(
          (post) => post.username === profileUser.username && !post.ifreply
        );
        return filtered.sort((a, b) => (a.date > b.date ? -1 : 1));

      case "replies":
        filtered = posts.filter(
          (post) => post.username === profileUser.username && post.ifreply
        );
        return filtered.sort((a, b) => (a.date > b.date ? -1 : 1));

      case "likes":
        filtered = posts.filter((post) =>
          likes.notifications.find(
            (like) =>
              like.username === profileUser.username &&
              like.post_id === post.post_id
          )
        );
        return filtered.sort((a, b) => {
          const likeA = likes.notifications.find(
            (like) =>
              like.post_id === a.post_id &&
              like.username === profileUser.username
          );
          const likeB = likes.notifications.find(
            (like) =>
              like.post_id === b.post_id &&
              like.username === profileUser.username
          );
          return (
            new Date(likeB!.date).getTime() - new Date(likeA!.date).getTime()
          );
        });

      default:
        return [];
    }
  };

  useEffect(() => {
    const filteredPosts = getFilteredPosts();
    const initialPosts = filteredPosts.slice(0, postsPerPage);
    setDisplayedPosts(initialPosts);
    setCurrentPage(1);
  }, [active, posts, likes.notifications]);

  const loadMorePosts = () => {
    setLoading(true);
    const filteredPosts = getFilteredPosts();
    const nextPosts = filteredPosts.slice(0, (currentPage + 1) * postsPerPage);
    setDisplayedPosts(nextPosts);
    setCurrentPage((prev) => prev + 1);
    setLoading(false);
  };

  const handleImageUpload = async (
    file: File,
    type: "avatar" | "background"
  ) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `https://x-clone-backend-production-15d8.up.railway.app/api/user/${type}`,
        {
          mode: "cors",
          method: "PUT",
          body: formData,
          headers: {
            authorization: "Bearer " + (token ? token.toString() : ""),
          },
        }
      );

      if (response.ok) {
        const updatedUser = await response.json();
        if (updatedUser) {
          if (type === "avatar") {
            setAvatar(updatedUser.avatar);
          } else {
            setBackground(updatedUser.background);
          }
        } else {
          throw new Error("Failed to get updated user data");
        }
      } else {
        throw new Error(`Failed to upload ${type}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  function toggleFollow(e: React.MouseEvent<HTMLElement>) {
    const name = e.currentTarget.getAttribute("data-username");
    if (!name) return null;
    try {
      fetch(
        "https://x-clone-backend-production-15d8.up.railway.app/api/follow/" +
          name,
        {
          mode: "cors",
          method: "POST",
          headers: {
            authorization: "Bearer " + (token ? token.toString() : ""),
          },
        }
      )
        .then((response) => response.text())
        .then((response) => {
          if (response === "User followed" || "User unfollowed") {
            setUpdateCounter(updateCounter + 1);
          } else {
            throw new Error(response);
          }
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.error("Fetch error:", error);
      console.log(["An error occurred during follow/unfollow fetch"]);
    }
  }

  function editProfile() {
    if (editActive) {
      try {
        fetch(
          "https://x-clone-backend-production-15d8.up.railway.app/api/user",
          {
            mode: "cors",
            method: "PUT",
            body: JSON.stringify({
              location: location,
              aboutme: aboutme,
              displayname: displayname,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              authorization: "Bearer " + (token ? token.toString() : ""),
            },
          }
        )
          .then((response) => response.json())
          .then((response) => {
            if (response.username) {
              setEditActive(false);
            } else {
              throw new Error(response);
            }
          })
          .catch((error) => console.error(error));
      } catch (error) {
        console.error("Fetch error:", error);
        console.log(["An error occurred during profile update fetch"]);
      }
    } else {
      setEditActive(true);
    }
  }

  const allFilteredPosts = getFilteredPosts();
  const hasMorePosts = allFilteredPosts.length > displayedPosts.length;

  return (
    <main className="w-full md:w-[600px] pb-16 md:pb-0 border-x-2 border-gray-600">
      <div className="relative">
        <div className="h-48 bg-gray-700 relative">
          {background && (
            <Image
              src={background}
              className="object-cover"
              alt="Profile background"
              fill
            />
          )}
          {user === profileUser.username && (
            <label className="absolute bottom-2 right-2 w-8 h-8 bg-black bg-opacity-60 rounded-full cursor-pointer flex items-center justify-center hover:bg-opacity-80">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file, "background");
                }}
              />
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </label>
          )}
        </div>

        <div className="absolute left-4 -bottom-16">
          <div className="relative">
            <div className="relative w-32 h-32">
              <Image
                src={avatar}
                className="rounded-full border-4 border-black bg-white object-cover"
                alt="Profile avatar"
                fill
              />
            </div>
            {user === profileUser.username && (
              <label className="absolute bottom-0 right-0 w-8 h-8 bg-black bg-opacity-60 rounded-full cursor-pointer flex items-center justify-center hover:bg-opacity-80 border-2 border-black">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file, "avatar");
                  }}
                />
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </label>
            )}
          </div>
        </div>
      </div>

      <div className="pt-20 px-4">
        <div className="flex justify-end gap-5">
          <button
            onClick={editProfile}
            className={`${
              user === profileUser.username ? "" : "hidden"
            } border border-gray-600 px-4 py-1.5 mb-2 rounded-full font-bold hover:bg-gray-900`}
          >
            {editActive ? "Save Profile" : "Edit profile"}
          </button>
          {user !== profileUser.username && (
            <Link
              href={`/messages?id=${profileUser.username}`}
              className="border border-gray-600 px-4 py-1.5 mb-2 rounded-full font-bold hover:bg-gray-900"
            >
              Message
            </Link>
          )}
          <div className="group">
            <button
              onClick={toggleFollow}
              data-username={profileUser.username}
              className={`${user === profileUser.username ? "hidden" : ""} 
      border px-4 py-1.5 mb-2 rounded-full font-bold min-w-[100px] transition-colors
      ${
        follows.notifications.filter(
          (ele) =>
            ele.follower === user && ele.following === profileUser.username
        ).length === 0
          ? "bg-white text-black hover:bg-gray-200"
          : "bg-transparent text-white border-gray-600 group-hover:border-red-500 group-hover:bg-red-500/10"
      }`}
            >
              {follows.notifications.filter(
                (ele) =>
                  ele.follower === user &&
                  ele.following === profileUser.username
              ).length === 0 ? (
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

        <div className="mb-4">
          {editActive ? (
            <textarea
              name="displayname"
              defaultValue={displayname}
              onChange={(e) => {
                setDisplayname(e.target.value);
              }}
              className="w-full bg-gray-800 text-l font-bold p-2 rounded border border-gray-700"
              rows={1}
            />
          ) : (
            <h2 className="text-xl font-bold">{displayname}</h2>
          )}

          <p className="text-gray-500">{"@" + profileUser.username}</p>

          {editActive ? (
            <textarea
              name="aboutme"
              defaultValue={aboutme}
              onChange={(e) => {
                setAboutme(e.target.value);
              }}
              className="w-full bg-gray-800 mt-3 p-2 rounded border border-gray-700"
              rows={2}
            />
          ) : (
            <p className="mt-3">{aboutme}</p>
          )}

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
              {editActive ? (
                <textarea
                  name="location"
                  defaultValue={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                  className="bg-gray-800 p-2 rounded border border-gray-700 text-white"
                  rows={1}
                />
              ) : (
                <span>{location}</span>
              )}
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
        <Profiletopmenu hide={profileUser.username !== user} />
      </div>
      <div className="divide-y divide-gray-600">
        {displayedPosts.map((post) => (
          <Tweet key={post.post_id} post={post} />
        ))}

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
  );
}
/* 
old button just in case
<button
            onClick={toggleFollow}
            username={profileUser.username}
            className={`${user === profileUser.username ? "hidden" : ""} ${
              follows.notifications.filter(
                (ele) =>
                  ele.follower === user &&
                  ele.following === profileUser.username
              ).length === 0
                ? "hover:bg-gray-900"
                : "hover:bg-red-500"
            } border border-gray-600 px-4 py-1.5 mb-2 rounded-full font-bold`}
          >
            {follows.notifications.filter(
              (ele) =>
                ele.follower === user && ele.following === profileUser.username
            ).length === 0
              ? "Follow"
              : "Unfollow"}
          </button>
*/
