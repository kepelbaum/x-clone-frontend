"use client";

export function Whatshappening() {
  return (
    <div className="bg-gray-900 rounded-2xl">
      <h2 className="text-xl font-bold p-4">{"What's happening"}</h2>
      {[1, 2, 3].map((item) => (
        <div key={item} className="px-4 py-3 hover:bg-gray-800 cursor-pointer">
          <p className="text-sm text-gray-500">Trending Hashtag #{item}</p>
          <p className="font-bold">#{`Placeholder${item}`}</p>
          <p className="text-sm text-gray-500">{`${item}0K posts`}</p>
        </div>
      ))}

      {/* <button className="w-full p-4 text-blue-500 hover:bg-gray-800 text-left rounded-b-2xl">
        Show more
      </button> */}
    </div>
  );
}
