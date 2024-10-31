"use client";

import { useAppState } from "../lib/context";

export function TopHomeMenu() {
  const {} = useAppState();
  return (
    <div className="border-b border-gray-600 mt-4">
      <div className="flex">
        <button className="flex-1 py-4 hover:bg-gray-900 relative text-center font-bold">
          For you
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500" />
        </button>
        <button className="flex-1 py-4 hover:bg-gray-900 text-gray-500 text-center font-bold">
          Following
        </button>
      </div>
    </div>
  );
}
