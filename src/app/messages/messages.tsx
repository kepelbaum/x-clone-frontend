"use client";

import { useState, useMemo, useRef } from "react";
import { useAppState } from "../lib/context";
import { useHomeFetch } from "../lib/fetch";
import { useEffect } from "react";
import { Navbar } from "../navbar";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useLocalStorage } from "../lib/useLocalStorage";
import Image from "next/image";

export default function Messages() {
  const { posts, users, updateCounter, messages, setUpdateCounter } =
    useAppState();

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  const token = useLocalStorage("token");
  const currentUser = useLocalStorage("username");
  const { fetchPosts, fetchUsers, fetchFollows, fetchLikes, fetchMessages } =
    useHomeFetch();

  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [showChat, setShowChat] = useState(false);

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
      }); // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const timeStr = `${hours > 12 ? hours - 12 : hours}:${minutes
      .toString()
      .padStart(2, "0")} ${hours >= 12 ? "PM" : "AM"}`;

    if (isToday) {
      return timeStr;
    }

    return `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()} ${timeStr}`;
  };

  useEffect(() => {
    fetchPosts();
    fetchUsers();
    fetchFollows();
    fetchLikes();
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, selectedUser]);

  if (!posts || !messages || !currentUser) return null;

  return (
    posts &&
    users &&
    messages && (
      <div className="bg-black text-white h-[calc(100vh-64px)] md:h-screen w-screen">
        <div className="flex h-full">
          <div className="hidden md:block md:w-[calc((100vw-600px)/2)]" />
          <Navbar />
          <main className="z-30 w-full md:w-[900px] md:-ml-[calc(18px+((100vw-768px)/672*57))] xl:-ml-[calc(75px+((100vw-1440px)/1120*35))] border-l-2 border-r-2 border-gray-600">
            <div className="flex h-[calc(100vh-64px)] md:h-screen">
              <div
                className={`${
                  showChat ? "hidden md:block" : "w-full"
                } md:w-[250px] lg:w-[320px] border-r border-gray-600 h-[calc(100vh-64px)] md:h-screen flex flex-col`}
              >
                <div className="h-14 bg-black border-b border-gray-600 z-10">
                  <div className="p-4">
                    <h2 className="text-xl font-bold">Messages</h2>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto">
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
                      <div className="relative w-10 h-10">
                        <Image
                          src={user.avatar}
                          alt={`${user}'s avatar`}
                          fill
                          className="rounded-full object-cover"
                          sizes="40px"
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
                } h-[calc(100vh-64px)] md:h-screen flex flex-col`}
              >
                {selectedUser ? (
                  <>
                    <div className="h-14 bg-black border-b border-gray-600 z-10">
                      <div className="p-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setShowChat(false)}
                            className="md:hidden p-2 hover:bg-gray-800 rounded-full"
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
                    </div>
                    <div
                      ref={chatContainerRef}
                      onScroll={handleScroll}
                      className="flex-1 overflow-y-auto p-4 mb-[110px] md:mb-0"
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
                              <div className="relative w-10 h-10">
                                <Image
                                  src={
                                    users.find(
                                      (u) => u.username === message.sender
                                    )!.avatar
                                  }
                                  className="rounded-full object-cover"
                                  alt={`${
                                    users.find(
                                      (u) => u.username === message.sender
                                    )!.username
                                  }'s avatar`}
                                  sizes="40px"
                                  fill
                                />
                              </div>
                            </Link>
                            <div
                              className={`max-w-[70%] p-3 rounded-2xl break-words ${
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
                    <div className="fixed bottom-16 w-full bg-black border-t border-gray-600 p-4 md:static">
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
