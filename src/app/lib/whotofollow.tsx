"use client";

export function Whotofollow() {
  return (
    <div className="bg-gray-900 rounded-2xl">
      <h2 className="text-xl font-bold p-4">Who to follow</h2>

      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="px-4 py-3 hover:bg-gray-800 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full" />
            <div>
              <p className="font-bold">User Name {item}</p>
              <p className="text-gray-500">@username{item}</p>
            </div>
          </div>
          <button className="bg-white text-black px-4 py-1.5 rounded-full font-bold hover:bg-gray-200">
            Follow
          </button>
        </div>
      ))}

      <button className="w-full p-4 text-blue-500 hover:bg-gray-800 text-left rounded-b-2xl">
        Show more
      </button>
    </div>
  );
}
