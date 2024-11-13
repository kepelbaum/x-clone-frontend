"use client";

import { useAppState } from "./lib/context";
import Image from "next/image";
import Link from "next/link";

export function Navbar({ mb }: { mb: number }) {
  const { logout } = useAppState();
  return (
    <div
      className="fixed bottom-0 w-full md:w-[50px] flex-shrink-0 xl:w-[220px] xl:left-[calc(40px+(100vw-1280px)/200*90)] md:left-[calc((100vw-768px)/512*150)] h-16 border-t-2 border-gray-400 md:border-0 md:w-[50px] md:top-0 bg-black 
      flex md:flex-col justify-around md:gap-5 md:justify-start xl:items-start items-center md:items-center 
      md:h-screen z-20 mb-${mb} md:m-0"
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
      <Link
        href="/home"
        className="flex gap-5 items-center hover:bg-gray-800 rounded-full cursor-pointer py-3 px-5 -mx-5 -my-3"
      >
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
      </Link>
      {/* <div className="flex gap-5 items-center hover:bg-gray-800 rounded-full cursor-pointer md:py-3 md:px-5 md:-mx-5 md:-my-3">
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
      </div> */}
      <Link
        href="/notifications"
        className="flex gap-5 items-center hover:bg-gray-800 rounded-full cursor-pointer md:py-3 md:px-5 md:-mx-5 md:-my-3"
      >
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
        <p className="font-semibold text-xl hidden xl:block">Notifications</p>
      </Link>

      <Link
        href="/messages"
        className="flex gap-5 items-center hover:bg-gray-800 rounded-full cursor-pointer md:py-3 md:px-5 md:-mx-5 md:-my-3"
      >
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
      </Link>

      <Link
        href="/profile"
        className="flex gap-5 items-center hover:bg-gray-800 rounded-full cursor-pointer md:py-3 md:px-5 md:-mx-5 md:-my-3"
      >
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
      </Link>

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
        <p className="font-semibold text-xl hidden xl:block" onClick={logout}>
          Logout
        </p>
      </div>
    </div>
  );
}
