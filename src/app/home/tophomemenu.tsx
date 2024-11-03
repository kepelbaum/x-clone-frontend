"use client";

import { useAppState } from "../lib/context";
import { useState } from "react";

export function TopHomeMenu() {
  const { active, setActive } = useAppState();
  function activateForYou() {
    setActive("foryou");
  }
  function activateFollowing() {
    setActive("following");
  }
  return (
    <div className="border-b border-gray-600 mt-4">
      <div className="flex">
        <button
          onClick={activateForYou}
          className={`flex-1 py-4 hover:bg-gray-900 relative text-center font-bold ${
            active === "foryou" ? "" : "text-gray-500"
          }`}
        >
          For you
          <div
            className={`absolute bottom-0 left-0 right-0 h-1 ${
              active === "foryou" ? "bg-blue-500" : "text-gray-500"
            }`}
          />
        </button>
        <button
          onClick={activateFollowing}
          className={`flex-1 py-4 hover:bg-gray-900 relative text-center font-bold ${
            active === "following" ? "" : "text-gray-500"
          }`}
        >
          Following
          <div
            className={`absolute bottom-0 left-0 right-0 h-1 ${
              active === "following" ? "bg-blue-500" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
}
