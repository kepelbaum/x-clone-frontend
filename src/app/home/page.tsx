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
            className="fixed bottom-0 w-full md:w-[50px] flex-shrink-0 xl:w-[220px] xl:left-[calc(40px+(100vw-1280px)/200*90)] md:left-[calc((100vw-768px)/512*150)] h-16 border-t-2 border-gray-400 md:border-0 md:w-[50px] md:top-0 bg-black 
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
            <div className="flex gap-5 items-center hover:bg-gray-800 rounded-full cursor-pointer py-3 px-5 -mx-5 -my-3">
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
              <p className="font-semibold text-xl hidden xl:block">Home</p>
            </div>
            <div className="flex gap-5 items-center hover:bg-gray-800 rounded-full cursor-pointer md:py-3 md:px-5 md:-mx-5 md:-my-3">
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
                className="lucide lucide-search"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <p className="font-semibold text-xl hidden xl:block">Explore</p>
            </div>
            <div className="flex gap-5 items-center hover:bg-gray-800 rounded-full cursor-pointer md:py-3 md:px-5 md:-mx-5 md:-my-3">
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
              <p className="font-semibold text-xl hidden xl:block">
                Notifications
              </p>
            </div>

            <div className="flex gap-5 items-center hover:bg-gray-800 rounded-full cursor-pointer md:py-3 md:px-5 md:-mx-5 md:-my-3">
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
              <p className="font-semibold text-xl hidden xl:block">Messages</p>
            </div>

            <div className="flex gap-5 items-center hover:bg-gray-800 rounded-full cursor-pointer md:py-3 md:px-5 md:-mx-5 md:-my-3">
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
              <p className="font-semibold text-xl hidden xl:block">Profile</p>
            </div>

            <div className="flex gap-5 items-center hover:bg-gray-800 rounded-full cursor-pointer md:py-3 md:px-5 md:-mx-5 md:-my-3">
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
              <p className="font-semibold text-xl hidden xl:block">Settings</p>
            </div>

            <div className="flex gap-5 items-center hover:bg-gray-800 rounded-full cursor-pointer md:py-3 md:px-5 md:-mx-5 md:-my-3">
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
                className="font-semibold text-xl hidden xl:block"
                onClick={logout}
              >
                Logout
              </p>
            </div>
          </div>

          <main className="w-full md:w-[600px] pb-16 md:pb-0 border-gray-600 border-2">
            <div className="sticky top-0 bg-black bg-opacity-80 backdrop-blur z-10">
              <div
                className="h-[50px] flex items-center justify-evenly md:gap-10 
                font-bold border-b border-gray-600"
              >
                <p className="whitespace-nowrap">For you</p>
                <p>Following</p>
              </div>
            </div>

            <div className="border-b border-gray-600 p-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex-shrink-0" />
                <div className="flex-grow">
                  <textarea
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
                          <rect
                            width="18"
                            height="18"
                            x="3"
                            y="3"
                            rx="2"
                            ry="2"
                          />
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
                    <button
                      className="bg-blue-500 text-white px-4 py-1.5 rounded-full font-bold hover:bg-blue-600 disabled:opacity-50"
                      disabled={true}
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {posts.map((post) => (
              <div
                className="border-gray-600 border-b p-4 flex gap-2 hover:bg-gray-600"
                key={post.post_id}
              >
                <div className="w-10 h-10 bg-white rounded-full flex-shrink-0" />
                <div className="flex flex-col min-w-0 w-full">
                  <div className="flex gap-3 items-center flex-wrap">
                    <p className="font-bold truncate">{"Placeholder"}</p>
                    <p className="text-gray-400 truncate">
                      {"@" + post.username}
                    </p>
                    <p className="text-gray-400 text-sm">{post.date}</p>
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
                      <span className="text-sm group-hover:text-blue-500">
                        24
                      </span>
                    </div>
                    <div className="flex items-center group">
                      <button className="p-2 hover:bg-green-500/10 rounded-full group-hover:text-green-500">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path d="M17 1l4 4-4 4" />
                          <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                          <path d="M7 23l-4-4 4-4" />
                          <path d="M21 13v2a4 4 0 0 1-4 4H3" />
                        </svg>
                      </button>
                      <span className="text-sm group-hover:text-green-500">
                        5
                      </span>
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
                      <span className="text-sm group-hover:text-pink-500">
                        182
                      </span>
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
            ))}
          </main>
          <div className="hidden md:flex md:flex-col md:w-[350px] gap-4 px-4">
            <div className="sticky top-0 pt-2 bg-black z-10">
              <div className="relative">
                <svg
                  className="absolute left-4 top-3.5 text-gray-500"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full bg-gray-900 rounded-full py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="bg-gray-900 rounded-2xl">
              <h2 className="text-xl font-bold p-4">What's happening</h2>
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="px-4 py-3 hover:bg-gray-800 cursor-pointer"
                >
                  <p className="text-sm text-gray-500">
                    Trending Hashtag #{item}
                  </p>
                  <p className="font-bold">#{`Placeholder${item}`}</p>
                  <p className="text-sm text-gray-500">{`${item}0K posts`}</p>
                </div>
              ))}

              <button className="w-full p-4 text-blue-500 hover:bg-gray-800 text-left rounded-b-2xl">
                Show more
              </button>
            </div>
            <div className="bg-gray-900 rounded-2xl">
              <h2 className="text-xl font-bold p-4">Who to follow</h2>

              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="px-4 py-3 hover:bg-gray-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-full" />
                    <div>
                      <p className="font-bold">User Name {item}</p>
                      <p className="text-gray-500">@username{item}</p>
                    </div>
                  </div>
                  <button className="bg-white text-black px-4 py-1.5 rounded-full font-bold hover:bg-gray-200">
                    Follow
                  </button>
                </div>
              ))}

              <button className="w-full p-4 text-blue-500 hover:bg-gray-800 text-left rounded-b-2xl">
                Show more
              </button>
            </div>
          </div>
          <div className="hidden md:block md:h-screen md:w-[calc((100vw-600px)/2)]"></div>
        </div>
      </div>
    )
  );
}
