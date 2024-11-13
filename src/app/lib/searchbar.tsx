"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function Searchbar() {
  const [searchState, setSearchState] = useState("");
  const router = useRouter();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchState.trim()) {
      router.push(`/explore?key=${searchState.trim()}`);
    }
  };

  return (
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
          value={searchState}
          onChange={(e) => setSearchState(e.target.value)}
          onKeyDown={handleKeyPress}
          className="w-full bg-gray-900 rounded-full py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
