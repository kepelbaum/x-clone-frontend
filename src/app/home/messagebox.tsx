"use client";

import { useAppState } from "../lib/context";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import EmojiPicker from "emoji-picker-react";

interface OptionalId {
  id?: number;
}

export function Messagebox({ id }: OptionalId) {
  const token = localStorage.getItem("token");
  const { updateCounter, setUpdateCounter } = useAppState();
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hasContent = content.length > 0 || selectedFile !== null;
  const isOverLimit = content.length > 255;

  const router = useRouter();

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
    }
  };

  const handleEmojiClick = (emojiObject: any) => {
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
          console.log("Error - unable to create tweet");
        }
      } catch (error) {
        console.error("Error:", error);
        console.log(["An error occurred during tweet post"]);
      }
    }
  }

  return (
    <div className="border-b border-gray-600 p-4">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-white flex-shrink-0" />
        <div className="flex-grow">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening?"
            className="w-full bg-transparent text-xl text-white placeholder-gray-500 border-none resize-none outline-none min-h-[120px]"
          />

          {previewUrl && (
            <div className="relative mt-2 mb-3">
              {selectedFile?.type.startsWith("image/") ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-h-80 rounded-2xl"
                />
              ) : (
                <video
                  src={previewUrl}
                  controls
                  className="max-h-80 rounded-2xl"
                />
              )}
              <button
                onClick={removeMedia}
                className="absolute top-2 right-2 bg-black bg-opacity-75 rounded-full p-1 hover:bg-opacity-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
              </button>
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="hover:bg-blue-500/10 p-2 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" x2="9.01" y1="9" y2="9" />
                  <line x1="15" x2="15.01" y1="9" y2="9" />
                </svg>
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
                disabled={!hasContent || isOverLimit}
              >
                Post
              </button>
            </div>
          </div>

          {showEmojiPicker && (
            <div className="absolute mt-2">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
