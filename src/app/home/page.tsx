"use client";

import Image from "next/image";
import Link from "next/link";
import { useAppState } from "../lib/context";

export default function Home() {
  const { logout } = useAppState();

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("username");

  return (
    <div className="flex justify-center items-center gap-10">
      <p>User details:</p>
      <p>{user}</p>
      <p>{token}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
