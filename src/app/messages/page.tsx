"use client";

import { Suspense } from "react";
import Messages from "./messages";

export default function Page() {
  return (
    <Suspense fallback={<div className="bg-black w-screen h-screen" />}>
      <Messages />
    </Suspense>
  );
}
