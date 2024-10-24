import Image from "next/image";
import Link from "next/link";

export default function Home() {
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
        <p className="text-2xl font-bold">Error messages go here...</p>
        <div className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Username (handle)"
            className="rounded-md border-2 border-gray-300 bg-gray-900 px-4 py-2 text-white placeholder-white
               hover:border-blue-400
               focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-400/50 focus:placeholder-transparent"
          />
          <input
            type="password"
            placeholder="Password"
            className="rounded-md border-2 border-gray-300 bg-gray-900 px-4 py-2 text-white placeholder-white
               hover:border-blue-400
               focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-400/50 focus:placeholder-transparent"
          />
          <input
            type="password"
            placeholder="Confirm password"
            className="rounded-md border-2 border-gray-300 bg-gray-900 px-4 py-2 text-white placeholder-white
               hover:border-blue-400
               focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-400/50 focus:placeholder-transparent"
          />
        </div>
        <button
          type="submit"
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
