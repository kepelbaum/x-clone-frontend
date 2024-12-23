"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "./lib/login";
import { useState } from "react";
import { useAppState } from "./lib/context";

export default function Home() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const { loginSubmit, logAsGuest } = useAuth();
  const { errors } = useAppState();

  return (
    <div className="w-screen h-screen bg-black text-white flex flex-col md:flex-row justify-center items-center gap-10">
      <div className="w-[150px] h-[150px] md:w-[350px] md:h-[350px] lg:w-[500px] lg:h-[500px] relative">
        <Image
          src="/X_logo.jpg"
          alt="X logo"
          fill
          sizes="(max-width: 768px) 150px,
       (max-width: 1024px) 350px,
       500px"
          className="object-contain"
        ></Image>
      </div>
      <div className="md:flex md:flex-col flex flex-col md:flex-row justify-center items-center gap-10">
        <p className="text-4xl font-bold">Happening Now</p>
        <p className="text-3xl font-bold">Join today.</p>
        {typeof errors === "string" ? (
          <p className="text-2xl text-red-500 font-bold text-white">{errors}</p>
        ) : (
          Object.values(errors).map((error, index) => (
            <p
              key={index}
              className="text-2xl text-red-500 font-bold text-white"
            >
              {error}
              <br />
            </p>
          ))
        )}
        <div className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="rounded-md border-2 border-gray-300 bg-gray-900 px-4 py-2 text-white placeholder-white
               hover:border-blue-400
               focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-400/50 focus:placeholder-transparent"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPass(e.target.value);
            }}
            className="rounded-md border-2 border-gray-300 bg-gray-900 px-4 py-2 text-white placeholder-white
               hover:border-blue-400
               focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-400/50 focus:placeholder-transparent"
          />
        </div>
        <div className="flex flex-col gap-5">
          <button
            type="submit"
            onClick={() => loginSubmit(name, pass)}
            className="rounded-full bg-black text-blue-500 border-white border-2 w-[250px] h-[50px] font-bold"
          >
            Sign in
          </button>
          <Link href="sign-up">
            <button
              type="submit"
              className="rounded-full bg-blue-500 text-white border-white border-2 w-[250px] h-[50px] font-bold"
            >
              Create account
            </button>
          </Link>
        </div>
        <p className="text-2xl font-bold">Or use a demo account.</p>
        <button
          type="submit"
          onClick={logAsGuest}
          className="rounded-full bg-gray-700 text-white border-white border-2 w-[250px] h-[50px] font-bold"
        >
          Demo login
        </button>
      </div>
    </div>
  );
}
