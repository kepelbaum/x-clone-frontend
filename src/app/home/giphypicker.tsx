"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Search } from "lucide-react";

interface GiphyPickerProps {
  onSelect: (gif: { url: string }) => void;
  onClose: () => void;
  token: string | null;
}

interface Gif {
  id: string;
  title: string;
  images: {
    fixed_height: {
      url: string;
    };
  };
}

export default function GiphyPicker({
  onSelect,
  onClose,
  token,
}: GiphyPickerProps) {
  const [search, setSearch] = useState("");
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTrendingGifs();
  }, []);

  const fetchTrendingGifs = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = `https://x-clone-backend-production-15d8.up.railway.app/api/gifs`;
      const response = await fetch(url, {
        mode: "cors",
        method: "GET",
        headers: {
          authorization: "Bearer " + (token ? token.toString() : ""),
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setGifs(data.data);
    } catch (err) {
      console.error("Error fetching trending:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch GIFs");
    } finally {
      setLoading(false);
    }
  };

  const searchGifs = async (query: string) => {
    if (!query) {
      fetchTrendingGifs();
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const url = `https://x-clone-backend-production-15d8.up.railway.app/api/gifs/search?query=${encodeURIComponent(
        query
      )}`;
      const response = await fetch(url, {
        headers: {
          authorization: "Bearer " + (token ? token.toString() : ""),
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setGifs(data.data);
    } catch (err) {
      console.error("Error searching:", err);
      setError(err instanceof Error ? err.message : "Failed to search GIFs");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    searchGifs(value);
  };

  const handleSelect = (gif: Gif) => {
    onSelect({ url: gif.images.fixed_height.url });
    onClose();
  };

  return (
    <div className="absolute mt-2 left-0 right-0 mx-auto md:left-0 md:mx-0 bg-gray-900 rounded-xl shadow-lg w-[336px] max-[424px]:w-[200px] md:w-[400px] max-h-[480px] overflow-hidden z-50">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-2 bg-gray-800 rounded-full px-4 py-2">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search GIFs"
            className="bg-transparent w-full outline-none text-white placeholder-gray-400"
          />
        </div>
      </div>

      <div className="overflow-y-auto h-96">
        {error && (
          <div className="text-red-500 text-center p-4">
            {error}
            <button
              onClick={fetchTrendingGifs}
              className="block mx-auto mt-2 text-blue-500 hover:underline"
            >
              Try Again
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : gifs.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-1 p-1">
            {gifs.map((gif) => (
              <button
                key={gif.id}
                onClick={() => handleSelect(gif)}
                className="relative aspect-square overflow-hidden hover:opacity-80 transition-opacity rounded-lg"
              >
                <Image
                  src={gif.images.fixed_height.url}
                  alt={gif.title}
                  width={500}
                  height={300}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </button>
            ))}
          </div>
        ) : (
          !error && (
            <div className="text-gray-400 text-center p-4">
              <p>{search ? "No GIFs found" : "Loading trending GIFs..."}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
