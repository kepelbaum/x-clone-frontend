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

  function handleUser(e) {
    setName(e.target.value);
  }

  function handlePass(e) {
    setPass(e.target.value);
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
        <p className="text-4xl font-bold">Happening Now</p>
        <p className="text-3xl font-bold">Join today.</p>
        <div className="flex flex-col">
          {errors.map((error, index) => (
            <p
              key={index}
              className="text-2xl text-red-500 font-bold text-white"
            >
              {error}
              <br />
            </p>
          ))}
        </div>
        <div className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Username"
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

// <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li className="mb-2">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
//               src/app/page.tsx
//             </code>
//             .
//           </li>
//           <li>Save and see your changes instantly.</li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
