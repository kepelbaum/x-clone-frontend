"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../lib/login";
import { useState } from "react";
import { useAppState } from "../lib/context";

export default function Home() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [conf, setConf] = useState("");
  const { register } = useAuth();
  const { errors } = useAppState();

  function handleUser(e) {
    setName(e.target.value);
  }

  function handlePass(e) {
    setPass(e.target.value);
  }

  function handleConf(e) {
    setConf(e.target.value);
  }

  return (
    <div className="w-screen h-screen bg-black text-white flex flex-col md:flex-row justify-center items-center gap-10">
      <Image
        src="/X_logo.jpg"
        alt="X logo"
        width={500}
        height={500}
        className="w-[150px] h-[150px] md:w-[500px] md:h-[500px]"
      ></Image>
      <div className="md:flex md:flex-col flex flex-col md:flex-row justify-center items-center gap-10">
        <p className="text-4xl font-bold">Create Account</p>
        <div className="flex flex-col">
          {typeof errors === "string" ? (
            <p className="text-2xl text-red-500 font-bold text-white">
              {errors}
            </p>
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
        </div>
        <div className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Username (handle)"
            onChange={handleUser}
            className="rounded-md border-2 border-gray-300 bg-gray-900 px-4 py-2 text-white placeholder-white
               hover:border-blue-400
               focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-400/50 focus:placeholder-transparent"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={handlePass}
            className="rounded-md border-2 border-gray-300 bg-gray-900 px-4 py-2 text-white placeholder-white
               hover:border-blue-400
               focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-400/50 focus:placeholder-transparent"
          />
          <input
            type="password"
            placeholder="Confirm password"
            onChange={handleConf}
            className="rounded-md border-2 border-gray-300 bg-gray-900 px-4 py-2 text-white placeholder-white
               hover:border-blue-400
               focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-400/50 focus:placeholder-transparent"
          />
        </div>
        <button
          type="submit"
          onClick={() => register(name, pass, conf)}
          className="rounded-full bg-blue-500 text-white border-white border-2 w-[250px] h-[50px] font-bold"
        >
          Submit
        </button>
        <p>
          Already have an account?{" "}
          <Link href="/" className="text-blue-500">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
