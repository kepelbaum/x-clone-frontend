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
            className="fixed bottom-0 w-full md:w-[50px] flex-shrink-0 xl:w-[220px] xl:left-[calc(50vw-525px)] md:left-[calc(50vw-375px)] h-16 border-t-2 border-gray-400 md:border-0 md:w-[50px] md:top-0 bg-black 
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
          <main className="w-full md:w-[600px] pb-16 md:pb-0">
            {/* Profile header with background */}
            <div className="relative">
              {/* Background image */}
              <div className="h-48 bg-gray-700" /> {/* Placeholder bg */}
              {/* Profile picture - positioned to overlap background */}
              <div className="absolute left-4 -bottom-16">
                <div className="w-32 h-32 rounded-full border-4 border-black bg-white" />
              </div>
            </div>

            {/* Profile info section */}
            <div className="pt-20 px-4">
              {" "}
              {/* pt-20 to account for overlapping profile pic */}
              {/* Edit profile button */}
              <div className="flex justify-end mb-4">
                <button className="border border-gray-600 px-4 py-1.5 rounded-full font-bold hover:bg-gray-900">
                  Edit profile
                </button>
              </div>
              {/* Profile text info */}
              <div className="mb-4">
                <h2 className="text-xl font-bold">Display Name</h2>
                <p className="text-gray-500">@username</p>

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
                    <span>Location</span>
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
                    <span>Joined September 2023</span>
                  </div>
                </div>

                <div className="flex gap-4 mt-3 text-gray-400">
                  <div className="flex gap-1">
                    <span className="text-white font-bold">123</span>
                    Following
                  </div>
                  <div className="flex gap-1">
                    <span className="text-white font-bold">456</span>
                    Followers
                  </div>
                </div>
              </div>
              {/* Navigation tabs */}
              <div className="border-b border-gray-600 mt-4">
                <div className="flex">
                  <button className="flex-1 py-4 hover:bg-gray-900 relative text-center font-bold">
                    Posts
                    {/* Active indicator */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500" />
                  </button>
                  <button className="flex-1 py-4 hover:bg-gray-900 text-gray-500 text-center font-bold">
                    Replies
                  </button>
                  <button className="flex-1 py-4 hover:bg-gray-900 text-gray-500 text-center font-bold">
                    Likes
                  </button>
                </div>
              </div>
            </div>
          </main>

          <div className="hidden md:block md:h-screen md:w-[calc((100vw-600px)/2)]"></div>
        </div>
      </div>
    )
  );
}
