"use client";

import { useState, useEffect } from "react";
import { useAppState } from "./context";
import Link from "next/link";

interface HashtagCount {
  tag: string;
  count: number;
}

export function Whatshappening() {
  const { posts } = useAppState();
  const [trendingHashtags, setTrendingHashtags] = useState<HashtagCount[]>([]);
  const [displayedHashtags, setDisplayedHashtags] = useState<HashtagCount[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const initialTagsToShow = 3;
  const tagsPerLoad = 3;

  useEffect(() => {
    if (posts) {
      const hashtagCounts = posts
        .filter((post) => !post.ifreply && !post.ifretweet)
        .reduce((acc: { [key: string]: number }, post) => {
          const matches = [
            ...new Set(post.content?.match(/#[\w\u0590-\u05ff]+/g) || []),
          ].map((tag) => tag.toLowerCase());

          matches.forEach((tag) => {
            const cleanTag = tag.slice(1);
            acc[cleanTag] = (acc[cleanTag] || 0) + 1;
          });

          return acc;
        }, {});

      const sortedHashtags = Object.entries(hashtagCounts)
        .map(([tag, count]) => ({
          tag,
          count,
        }))
        .sort((a, b) => b.count - a.count);

      setTrendingHashtags(sortedHashtags);
      setDisplayedHashtags(sortedHashtags.slice(0, initialTagsToShow));
    }
  }, [posts]);

  const loadMoreHashtags = () => {
    setLoading(true);
    setTimeout(() => {
      const currentLength = displayedHashtags.length;
      const nextHashtags = trendingHashtags.slice(
        currentLength,
        currentLength + tagsPerLoad
      );
      setDisplayedHashtags((prev) => [...prev, ...nextHashtags]);
      setLoading(false);
    }, 300);
  };

  if (displayedHashtags.length === 0) return null;

  const hasMoreHashtags = displayedHashtags.length < trendingHashtags.length;

  return (
    <div className="bg-gray-900 rounded-2xl">
      <h2 className="text-xl font-bold p-4">{"What's happening"}</h2>

      {displayedHashtags.map((hashtagInfo, index) => (
        <Link
          href={`/explore?key=%23${hashtagInfo.tag}`}
          key={hashtagInfo.tag}
          className="px-4 py-3 hover:bg-gray-800 cursor-pointer block"
        >
          <p className="text-sm text-gray-500">Trending Hashtag #{index + 1}</p>
          <p className="font-bold">#{hashtagInfo.tag}</p>
          <p className="text-sm text-gray-500">
            {hashtagInfo.count.toLocaleString()}{" "}
            {hashtagInfo.count === 1 ? "post" : "posts"}
          </p>
        </Link>
      ))}

      {hasMoreHashtags && (
        <button
          onClick={loadMoreHashtags}
          disabled={loading}
          className="w-full p-4 text-blue-500 hover:bg-gray-800 text-left rounded-b-2xl transition-colors disabled:opacity-50"
        >
          {loading ? "Loading..." : "Show more"}
        </button>
      )}
    </div>
  );
}
