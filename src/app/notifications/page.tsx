"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useAppState } from "../lib/context";
import { convertTime } from "../lib/utils";
import { Navbar } from "../navbar";
import { Rightsection } from "../lib/rightsection";
import { useHomeFetch } from "../lib/fetch";
import { User } from "../lib/definitions";
import dynamic from "next/dynamic";
import { useLocalStorage } from "../lib/useLocalStorage";

export default function Notifications() {
  return <DynamicNotificationsContent />;
}

const DynamicNotificationsContent = dynamic(
  () => Promise.resolve(NotificationsContent),
  {
    ssr: false,
    loading: () => <div className="bg-black w-screen h-screen" />,
  }
);

type NotificationType = "like" | "follow" | "reply" | "retweet" | "message";

interface NotificationData {
  id?: number;
  post_id?: number;
  username?: string;
  poster?: string;
  follower?: string;
  following?: string;
  sender?: string;
  recipient?: string;
  ifreply?: number;
  ifretweet?: number;
  date: string;
  type: NotificationType;
}

function NotificationItem({
  type,
  data,
  users,
}: {
  type: NotificationType;
  data: NotificationData;
  users: User[];
}) {
  const getUsernameForType = () => {
    switch (type) {
      case "like":
        return data.username;
      case "follow":
        return data.follower;
      case "message":
        return data.sender;
      case "reply":
      case "retweet":
        return data.username;
      default:
        return data.username;
    }
  };

  const actor = users.find((u) => u.username === getUsernameForType());

  return (
    <div className="flex gap-3 p-4 border-gray-600 hover:bg-gray-600/10">
      <div className="flex-shrink-0">
        {type === "like" && (
          <div className="w-10 h-10 flex items-center justify-center text-pink-500">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="none"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
        )}
        {type === "follow" && (
          <div className="w-10 h-10 flex items-center justify-center text-blue-500">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="none"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M19 8l-2 2 2 2" />
              <path d="M12 10h7" />
            </svg>
          </div>
        )}
        {type === "reply" && (
          <div className="w-10 h-10 flex items-center justify-center text-blue-500">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="none"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </div>
        )}
        {type === "retweet" && (
          <div className="w-10 h-10 flex items-center justify-center text-green-500">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="none"
            >
              <path d="M17 1l4 4-4 4" />
              <path d="M3 11V9a4 4 0 0 1 4-4h14" />
              <path d="M7 23l-4-4 4-4" />
              <path d="M21 13v2a4 4 0 0 1-4 4H3" />
            </svg>
          </div>
        )}
        {type === "message" && (
          <div className="w-10 h-10 flex items-center justify-center text-yellow-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-mail"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>
        )}
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-1 mb-1">
          <Link
            href={`/profile/${actor?.username}`}
            className="font-bold hover:underline"
          >
            {actor?.displayname}
          </Link>
          {/* {actor?.ifcheckmark && (
            <svg
              className="w-5 h-5 text-blue-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
          )} */}
        </div>

        <div className="text-gray-400 text-sm">
          {type === "like" && (
            <>
              has liked your{" "}
              <Link
                href={`/posts/${data.post_id}`}
                className="text-blue-400 hover:underline"
              >
                post.
              </Link>
            </>
          )}
          {type === "follow" && "has followed you"}
          {type === "reply" && (
            <>
              has replied to your{" "}
              <Link
                href={`/posts/${data.ifreply}`}
                className="text-blue-400 hover:underline"
              >
                post.
              </Link>
            </>
          )}
          {type === "retweet" && (
            <>
              has retweeted your{" "}
              <Link
                href={`/posts/${data.ifretweet}`}
                className="text-blue-400 hover:underline"
              >
                post.
              </Link>
            </>
          )}
          {type === "message" && (
            <>
              has sent you a{" "}
              <Link
                href={`/messages?id=${data.sender}`}
                className="text-blue-400 hover:underline"
              >
                message.
              </Link>
            </>
          )}
        </div>
        <p className="text-gray-500 text-sm mt-1">{convertTime(data.date)}</p>
      </div>
    </div>
  );
}

function NotificationsContent() {
  const { likes, follows, messages, posts, users, updateCounter } =
    useAppState();
  const { fetchPosts, fetchUsers, fetchFollows, fetchLikes, fetchMessages } =
    useHomeFetch();
  const user = useLocalStorage("username");

  useEffect(() => {
    fetchPosts();
    fetchUsers();
    fetchFollows();
    fetchLikes();
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateCounter]);

  const allNotifications: NotificationData[] = [
    ...(
      likes?.notifications?.filter(
        (n) => n.poster === user && posts.some((p) => p.post_id === n.post_id)
      ) || []
    ).map((n): NotificationData => ({ ...n, type: "like" })),

    ...(follows?.notifications?.filter((n) => n.following === user) || []).map(
      (n): NotificationData => ({ ...n, type: "follow" })
    ),

    ...(
      posts?.filter((p) => {
        const originalPost = posts.find((op) => op.post_id === p.ifreply);
        return p.ifreply && originalPost?.username === user;
      }) || []
    ).map((n): NotificationData => ({ ...n, type: "reply" })),

    ...(
      posts?.filter((p) => {
        const originalPost = posts.find((op) => op.post_id === p.ifretweet);
        return p.ifretweet && originalPost?.username === user;
      }) || []
    ).map((n): NotificationData => ({ ...n, type: "retweet" })),

    ...(messages?.filter((m) => m.recipient === user) || []).map(
      (m): NotificationData => ({
        ...m,
        type: "message",
      })
    ),
  ].sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

  return (
    posts &&
    users &&
    user && (
      <div className="bg-black text-white min-h-screen w-screen box-border md:overflow-y-scroll">
        <div className="w-full flex relative">
          <div className="hidden md:block md:h-screen md:w-[calc((100vw-600px)/2)]"></div>
          <Navbar />
          <main className="w-full md:w-[600px] pb-16 md:pb-0 border-gray-600 border-l-2 border-r-2">
            <div className="sticky top-0 z-10 bg-black/80 backdrop-blur">
              <div className="flex px-4 py-3 border-b border-gray-600">
                <h1 className="text-xl font-bold">Notifications</h1>
              </div>
            </div>

            <div className="divide-y divide-gray-600 border-b-2 border-gray-600">
              {allNotifications.map((notification, index) => (
                <NotificationItem
                  key={`${notification.type}-${
                    notification.id || notification.post_id
                  }-${index}`}
                  type={notification.type}
                  data={notification}
                  users={users}
                />
              ))}

              {allNotifications.length === 0 && (
                <div className="p-4 text-center text-gray-500">
                  No notifications yet
                </div>
              )}
            </div>
          </main>
          <Rightsection />
          <div className="hidden md:block md:h-screen md:w-[calc((100vw-600px)/2)]"></div>
        </div>
      </div>
    )
  );
}
