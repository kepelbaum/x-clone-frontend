"use client";

import { useState, useMemo, useRef } from "react";
import { useAppState } from "../lib/context";
import { useHomeFetch } from "../lib/fetch";
import { useEffect } from "react";
import { Navbar } from "../navbar";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function MessageInterface() {
  const {
    logout,
    posts,
    users,
    updateCounter,
    active,
    setActive,
    follows,
    messages,
    setUpdateCounter,
  } = useAppState();

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  const token = localStorage.getItem("token");
  const currentUser = localStorage.getItem("username");
  const { fetchPosts, fetchUsers, fetchFollows, fetchLikes, fetchMessages } =
    useHomeFetch();

  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [showChat, setShowChat] = useState(false);

  const DEFAULT_AVATAR =
    "https://cdn.midjourney.com/8bd0878a-c555-43c5-aeaa-cea2c62a3abf/grid_0_640_N.webp";

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = DEFAULT_AVATAR;
  };

  const getLastMessage = (username: string) => {
    return messages
      ?.filter(
        (m) =>
          (m.sender === currentUser && m.recipient === username) ||
          (m.sender === username && m.recipient === currentUser)
      )
      .sort((a, b) => b.date.localeCompare(a.date))[0];
  };

  const relevantUsers = useMemo(() => {
    if (!users || !messages || !currentUser) return [];

    const usersWithHistory = new Set<string>();
    messages.forEach((message) => {
      if (message.sender === currentUser) {
        usersWithHistory.add(message.recipient);
      }
      if (message.recipient === currentUser) {
        usersWithHistory.add(message.sender);
      }
    });

    const relevantUsernames = new Set(usersWithHistory);

    if (id) {
      const newUser = users.find((u) => u.username === id);
      if (newUser) {
        relevantUsernames.add(newUser.username);
      }
    }
    return users
      .filter((user) => relevantUsernames.has(user.username))
      .sort((a, b) => {
        const lastMessageA = getLastMessage(a.username);
        const lastMessageB = getLastMessage(b.username);

        if (!lastMessageA) return -1;
        if (!lastMessageB) return 1;

        return lastMessageB.date.localeCompare(lastMessageA.date);
      });
  }, [users, messages, currentUser, id]);

  const conversationMessages = useMemo(() => {
    if (!selectedUser || !messages) return [];
    return messages
      .filter(
        (m) =>
          (m.sender === currentUser && m.recipient === selectedUser) ||
          (m.sender === selectedUser && m.recipient === currentUser)
      )
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [selectedUser, messages, currentUser]);

  const scrollToBottom = () => {
    if (!hasScrolled && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        chatContainerRef.current;
      const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 1;
      setHasScrolled(!isAtBottom);
    }
  };

  async function submitMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedUser || !newMessage.trim() || !token) return;

    try {
      const formData = new FormData();
      formData.append("recipient", selectedUser);
      formData.append("content", newMessage.trim());

      const response = await fetch(
        "https://x-clone-backend-production-15d8.up.railway.app/api/message",
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
          },
          body: formData,
        }
      );

      if (response.ok) {
        setNewMessage("");
        setUpdateCounter(updateCounter + 1);
        setHasScrolled(false);
      } else {
        console.error("Failed to send message:", response.status);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours > 12 ? hours - 12 : hours}:${minutes
      .toString()
      .padStart(2, "0")} ${hours >= 12 ? "PM" : "AM"}`;
  };

  useEffect(() => {
    fetchPosts();
    fetchUsers();
    fetchFollows();
    fetchLikes();
    fetchMessages();
  }, [updateCounter]);

  useEffect(() => {
    if (id) {
      setSelectedUser(id);
      setShowChat(true);
    }
  }, [id]);

  useEffect(() => {
    if (messages && selectedUser) {
      scrollToBottom();
    }
  }, [messages, selectedUser]);

  if (!posts || !messages || !currentUser) return null;
  return (
    posts &&
    users &&
    messages && (
      <div className="md:pl-20 bg-black text-white min-h-screen w-screen box-border md:overflow-y-scroll">
        <div className="w-full flex relative">
          <div className="hidden md:block md:h-screen md:w-[calc((100vw-900px)/2)]"></div>
          <Navbar mb={10} />
          <main className="z-30 w-full md:w-[900px] pb-16 md:pb-0 border-x border-gray-600">
            <div className="flex h-screen">
              <div
                className={`${
                  showChat ? "hidden md:block" : "w-full"
                } md:w-[250px] lg:w-[320px] border-r border-gray-600`}
              >
                <div className="p-4 border-b border-gray-600">
                  <h2 className="ml-20 md:ml-0 text-xl font-bold">Messages</h2>
                </div>
                <div className="overflow-y-auto h-[calc(100vh-65px)]">
                  {relevantUsers.map((user) => (
                    <div
                      key={user.username}
                      onClick={() => {
                        setSelectedUser(user.username);
                        setShowChat(true);
                      }}
                      className={`flex items-center gap-3 p-4 hover:bg-gray-800 cursor-pointer border-b border-gray-600 
                        ${selectedUser === user.username ? "bg-gray-800" : ""}`}
                    >
                      <div className="w-12 h-12 rounded-full bg-gray-600 flex-shrink-0">
                        <img
                          src={user.avatar || DEFAULT_AVATAR}
                          onError={handleImageError}
                          className="w-full h-full rounded-full object-cover"
                          alt=""
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold truncate">{user.username}</p>
                        <p className="text-gray-400 text-sm truncate">
                          {getLastMessage(user.username)?.content ||
                            "No messages yet"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className={`${
                  !showChat ? "hidden md:flex" : "w-full"
                } flex-1 flex-col`}
              >
                {selectedUser ? (
                  <>
                    <div className="p-4 pl-20 md:pl-4 border-b border-gray-600">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setShowChat(false)}
                          className="md:hidden p-2 -ml-2 hover:bg-gray-800 rounded-full"
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
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <h3 className="font-bold">{selectedUser}</h3>
                      </div>
                    </div>
                    <div
                      ref={chatContainerRef}
                      onScroll={handleScroll}
                      className="flex-1 overflow-y-auto p-4"
                    >
                      <div className="flex flex-col gap-3">
                        {conversationMessages.map((message, idx) => (
                          <div
                            key={idx}
                            className={`flex gap-2 ${
                              message.sender === currentUser
                                ? "flex-row-reverse"
                                : ""
                            }`}
                          >
                            <Link
                              href={`/profile/${message.sender}`}
                              className="w-10 h-10 rounded-full bg-gray-600 flex-shrink-0"
                            >
                              <img
                                src={
                                  users.find(
                                    (u) => u.username === message.sender
                                  )?.avatar || DEFAULT_AVATAR
                                }
                                onError={handleImageError}
                                className="w-full h-full rounded-full object-cover"
                                alt=""
                              />
                            </Link>
                            <div
                              className={`max-w-[70%] p-3 rounded-2xl ${
                                message.sender === currentUser
                                  ? "bg-blue-500 text-white"
                                  : "bg-gray-800"
                              }`}
                            >
                              <p>{message.content}</p>
                              <p className="text-xs mt-1 opacity-70">
                                {formatTime(message.date)}
                              </p>
                            </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                    </div>
                    <div className="border-t border-gray-600 p-4">
                      <form onSubmit={submitMessage} className="flex gap-2">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Start a new message"
                          className="flex-1 bg-transparent border border-gray-600 rounded-full px-4 py-2 focus:outline-none focus:border-blue-500"
                        />
                        <button
                          type="submit"
                          className="bg-blue-500 text-white px-4 py-2 rounded-full font-bold hover:bg-blue-600 disabled:opacity-50"
                          disabled={!newMessage.trim()}
                        >
                          Send
                        </button>
                      </form>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    Select a conversation to start messaging
                  </div>
                )}
              </div>
            </div>
          </main>
          <div className="hidden md:block md:h-screen md:w-[calc((100vw-900px)/2)]"></div>
        </div>
      </div>
    )
  );
}
