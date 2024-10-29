"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useAppState } from "../lib/context";
import { useHomeFetch } from "../lib/fetch";

export default function Home() {
  const { logout, posts, users } = useAppState();

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("username");
  const { fetchPosts, fetchUsers } = useHomeFetch();

  useEffect(() => {
    fetchPosts();
    fetchUsers();
  }, []);

  // useEffect(() => {
  //   console.log(posts);
  //   console.log(users);
  // }, [posts, users]);

  return (
    posts &&
    users && (
      <div className="bg-black text-white min-h-screen w-screen box-border md:overflow-y-scroll">
        <div className="w-full flex relative">
          <div className="hidden md:block md:h-screen md:w-[calc((100vw-600px)/2)]"></div>
          <div
            className="fixed bottom-0 w-full md:w-[50px] xl:w-[220px] xl:left-[calc(50vw-525px)] md:left-[calc(50vw-375px)] h-16 border-t-2 border-gray-400 md:border-0 md:w-[50px] md:top-0 bg-black 
            flex md:flex-col justify-around md:gap-5 md:justify-start xl:items-start items-center md:items-center 
            md:h-screen z-20"
          >
            <div className="fixed md:static top-0 left-5 md:block">
              <Image
                src="/X_logo.jpg"
                alt="X logo"
                width={40}
                height={40}
                className="w-[40px] h-[40px] -ml-2 mt-2 -mb-2"
              ></Image>
            </div>
            <div className="flex gap-5 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-house"
              >
                <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              </svg>
              <p className="font-bold text-2xl hidden xl:block">Home</p>
            </div>
            <div className="flex gap-5 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="white"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-bell"
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
              <p className="font-bold text-2xl hidden xl:block">
                Notifications
              </p>
            </div>

            <div className="flex gap-5 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
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
              <p className="font-bold text-2xl hidden xl:block">Messages</p>
            </div>

            <div className="flex gap-5 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="white"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-user"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <p className="font-bold text-2xl hidden xl:block">Profile</p>
            </div>

            <div className="flex gap-5 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-settings"
              >
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <p className="font-bold text-2xl hidden xl:block">Settings</p>
            </div>

            <div className="flex gap-5 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-log-out"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" x2="9" y1="12" y2="12" />
              </svg>
              <p
                className="font-bold text-2xl hidden xl:block"
                onClick={logout}
              >
                Logout
              </p>
            </div>
          </div>

          <main className="w-full md:w-[600px] pb-16 md:pb-0 border-gray-600 border-2">
            <div className="sticky top-0 bg-black bg-opacity-80 backdrop-blur z-10">
              <div
                className="h-[50px] flex items-center justify-evenly md:justify-center md:gap-10 
                font-bold border-b border-gray-600"
              >
                <p className="whitespace-nowrap">For you</p>
                <p>Following</p>
              </div>
            </div>
            {posts.map((post) => (
              <div
                className="border-gray-600 border-b p-4 flex gap-2 hover:bg-gray-600"
                key={post.post_id}
              >
                <div className="w-10 h-10 bg-white rounded-full flex-shrink-0" />
                <div className="flex flex-col min-w-0">
                  <div className="flex gap-3 items-center flex-wrap">
                    <p className="font-bold truncate">{"Placeholder"}</p>
                    <p className="text-gray-400 truncate">
                      {"@" + post.username}
                    </p>
                    <p className="text-gray-400 text-sm">{post.date}</p>
                  </div>
                  <p className="break-words">{post.content}</p>
                </div>
              </div>
            ))}
            {posts.map((post) => (
              <div
                className="border-gray-600 border-b p-4 flex gap-2 hover:bg-gray-600"
                key={post.post_id}
              >
                <div className="w-10 h-10 bg-white rounded-full flex-shrink-0" />
                <div className="flex flex-col min-w-0">
                  <div className="flex gap-3 items-center flex-wrap">
                    <p className="font-bold truncate">{"Placeholder"}</p>
                    <p className="text-gray-400 truncate">
                      {"@" + post.username}
                    </p>
                    <p className="text-gray-400 text-sm">{post.date}</p>
                  </div>
                  <p className="break-words">{post.content}</p>
                </div>
              </div>
            ))}
            {posts.map((post) => (
              <div
                className="border-gray-600 border-b p-4 flex gap-2 hover:bg-gray-600"
                key={post.post_id}
              >
                <div className="w-10 h-10 bg-white rounded-full flex-shrink-0" />
                <div className="flex flex-col min-w-0">
                  <div className="flex gap-3 items-center flex-wrap">
                    <p className="font-bold truncate">{"Placeholder"}</p>
                    <p className="text-gray-400 truncate">{"@" + user}</p>
                    <p className="text-gray-400 text-sm">{post.date}</p>
                  </div>
                  <p className="break-words">{post.content}</p>
                </div>
              </div>
            ))}
            {posts.map((post) => (
              <div
                className="border-gray-600 border-b p-4 flex gap-2 hover:bg-gray-600"
                key={post.post_id}
              >
                <div className="w-10 h-10 bg-white rounded-full flex-shrink-0" />
                <div className="flex flex-col min-w-0">
                  <div className="flex gap-3 items-center flex-wrap">
                    <p className="font-bold truncate">{"Placeholder"}</p>
                    <p className="text-gray-400 truncate">{"@" + user}</p>
                    <p className="text-gray-400 text-sm">{post.date}</p>
                  </div>
                  <p className="break-words">{post.content}</p>
                </div>
              </div>
            ))}
            {posts.map((post) => (
              <div
                className="border-gray-600 border-b p-4 flex gap-2 hover:bg-gray-600"
                key={post.post_id}
              >
                <div className="w-10 h-10 bg-white rounded-full flex-shrink-0" />
                <div className="flex flex-col min-w-0">
                  <div className="flex gap-3 items-center flex-wrap">
                    <p className="font-bold truncate">{"Placeholder"}</p>
                    <p className="text-gray-400 truncate">{"@" + user}</p>
                    <p className="text-gray-400 text-sm">{post.date}</p>
                  </div>
                  <p className="break-words">{post.content}</p>
                </div>
              </div>
            ))}
          </main>
          <div className="hidden md:block md:h-screen md:w-[calc((100vw-600px)/2)]"></div>
        </div>
      </div>
    )
  );
}
