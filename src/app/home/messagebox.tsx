"use client";

import { useAppState } from "../lib/context";
import { useState, useRef, RefObject, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import GiphyPicker from "./giphypicker";
import { Image as LucideImage, Smile, X } from "lucide-react";
import Image from "next/image";
import { EmojiClickData } from "emoji-picker-react";

interface OptionalId {
  id?: number;
  avatar: string;
}

export function Messagebox({ id, avatar }: OptionalId) {
  const token = localStorage.getItem("token");
  const { updateCounter, setUpdateCounter } = useAppState();
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const gifPickerRef = useRef<HTMLDivElement>(null);

  const hasContent = content.length > 0 || selectedFile !== null;
  const isOverLimit = content.length > 255;

  function useClickOutside(ref: RefObject<HTMLElement>, handler: () => void) {
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          handler();
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, handler]);
  }

  useClickOutside(emojiPickerRef, () => setShowEmojiPicker(false));
  useClickOutside(gifPickerRef, () => setShowGifPicker(false));

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 30 * 1024 * 1024) {
        alert("File size must be less than 30MB");
        return;
      }

      if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
        alert("Only image and video files are allowed");
        return;
      }

      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setShowGifPicker(false);
    }
  };

  const handleGifSelect = async (gif: { url: string }) => {
    try {
      setIsLoading(true);
      const response = await fetch(gif.url);
      const blob = await response.blob();
      const file = new File([blob], "gif.gif", { type: "image/gif" });
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setShowGifPicker(false);
    } catch (error) {
      console.error("Error processing GIF:", error);
      alert("Failed to process GIF. Please try another one.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmojiClick = (emojiObject: EmojiClickData) => {
    setContent((prevContent) => prevContent + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const removeMedia = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  async function submitTweet() {
    if (hasContent && !isOverLimit) {
      try {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("content", content);

        if (id) {
          formData.append("ifreply", id.toString());
        }

        if (selectedFile) {
          formData.append("media", selectedFile);
        }

        const response = await fetch(
          "https://x-clone-backend-production-15d8.up.railway.app/api/post",
          {
            mode: "cors",
            method: "POST",
            body: formData,
            headers: {
              authorization: "Bearer " + (token ? token.toString() : ""),
            },
          }
        );

        const data = await response.json();
        if (data.post_id) {
          setUpdateCounter(updateCounter + 1);
          setContent("");
          setSelectedFile(null);
          setPreviewUrl(null);
        } else {
          throw new Error("Failed to create post");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to create post. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <div className="border-b border-gray-600 p-4">
      <div className="flex gap-3">
        <div className="relative w-10 h-10 flex-shrink-0">
          <Image
            src={avatar}
            alt="User avatar"
            fill
            className="rounded-full bg-white object-cover"
            sizes="40px"
          />
        </div>
        <div className="flex-grow relative">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening?"
            className="w-full bg-transparent text-xl text-white placeholder-gray-500 border-none resize-none outline-none min-h-[120px]"
          />

          {previewUrl && (
            <div className="relative mt-2 mb-3">
              {selectedFile?.type.startsWith("image/") ? (
                <div className="relative w-full aspect-video">
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    fill
                    className="rounded-2xl object-cover"
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                </div>
              ) : (
                <video
                  src={previewUrl}
                  controls
                  className="max-h-80 rounded-2xl w-full"
                />
              )}
              <button
                onClick={removeMedia}
                className="absolute top-2 right-2 bg-black bg-opacity-75 rounded-full p-1 hover:bg-opacity-100"
              >
                <X size={20} className="text-white" />
              </button>
            </div>
          )}

          <div className="flex items-center justify-between mt-3">
            <div className="flex gap-4 text-blue-500">
              <input
                type="file"
                hidden
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*,video/*"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="hover:bg-blue-500/10 p-2 rounded-full"
              >
                <LucideImage size={20} />
              </button>
              <button
                onClick={() => {
                  setShowGifPicker(!showGifPicker);
                  setShowEmojiPicker(false);
                }}
                className="hover:bg-blue-500/10 p-2 rounded-full font-bold text-sm"
              >
                GIF
              </button>
              <button
                onClick={() => {
                  setShowEmojiPicker(!showEmojiPicker);
                  setShowGifPicker(false);
                }}
                className="hover:bg-blue-500/10 p-2 rounded-full"
              >
                <Smile size={20} />
              </button>
            </div>
            <div className="flex items-center gap-4">
              <span
                className={`text-sm ${
                  content.length === 0
                    ? "text-gray-500"
                    : isOverLimit
                    ? "text-red-500"
                    : "text-gray-400"
                }`}
              >
                {content.length}/255
              </span>
              <button
                onClick={submitTweet}
                className="bg-blue-500 text-white px-4 py-1.5 rounded-full font-bold hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-blue-500"
                disabled={!hasContent || isOverLimit || isLoading}
              >
                {isLoading ? "Posting..." : "Post"}
              </button>
            </div>
          </div>

          {showEmojiPicker && (
            <div ref={emojiPickerRef} className="absolute mt-2 z-50">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}

          {showGifPicker && (
            <div ref={gifPickerRef} className="absolute mt-2 z-50">
              <GiphyPicker
                onSelect={handleGifSelect}
                onClose={() => setShowGifPicker(false)}
                token={token}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
