"use client";

import { Searchbar } from "../lib/searchbar";
import { Whatshappening } from "../lib/whatshappening";
import { Whotofollow } from "../lib/whotofollow";

export function Rightsection() {
  return (
    <div className="hidden md:flex md:flex-col md:w-[350px] gap-4 px-4">
      <Searchbar />
      <Whatshappening />
      <Whotofollow />
    </div>
  );
}
