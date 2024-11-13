"use client";

import { useState } from "react";
import { useAppState } from "../lib/context";
import { Navbar } from "../navbar";
import { Rightsection } from "../lib/rightsection";

export default function Settings() {
  const { errors, setErrors } = useAppState();
  const [errorColor, setErrorColor] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const user = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  const handlePasswordChange = async () => {
    if (newPass !== confirmPass) {
      setErrorColor("red");
      setErrors(["Passwords do not match"]);
      return;
    }

    try {
      const response = await fetch(
        "https://x-clone-backend-production-15d8.up.railway.app/api/auth/password", // Changed to /api/auth/password
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            password: newPass,
          }),
        }
      );

      if (response.status === 200) {
        setErrorColor("green");
        setErrors(["Password updated successfully"]);
        setNewPass("");
        setConfirmPass("");
      } else {
        const data = await response.json();
        if (data.errors) {
          setErrorColor("red");
          setErrors(Array.isArray(data.errors) ? data.errors : [data.errors]);
        } else {
          setErrorColor("red");
          setErrors(["Failed to update password"]);
        }
      }
    } catch (error) {
      console.error("Password update error:", error);
      setErrors(["An error occurred while updating password"]);
    }
  };
  return (
    <div className="bg-black text-white min-h-screen fixed inset-0 overflow-y-auto overflow-x-hidden">
      <div className="w-full max-w-[100vw] flex relative">
        <div className="hidden md:block md:h-screen md:w-[calc((100vw-600px)/2)]"></div>
        <Navbar mb={10} />
        <main className="w-full md:w-[600px] pb-16 md:pb-0 border-gray-600 border-2">
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>

            <div className="mb-6">
              <h2 className="text-xl mb-4">Change Password</h2>
              {typeof errors === "string" ? (
                <p
                  className={`${
                    errorColor === "red" ? "text-red-500" : "text-green-500"
                  } mb-4`}
                >
                  {errors}
                </p>
              ) : (
                errors.map((error, index) => (
                  <p
                    key={index}
                    className={`${
                      errorColor === "red" ? "text-red-500" : "text-green-500"
                    } mb-2`}
                  >
                    {error}
                  </p>
                ))
              )}
              <div className="flex flex-col gap-4">
                <input
                  type="password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder="New Password"
                  className="rounded-md border-2 border-gray-300 bg-gray-900 px-4 py-2 
                    text-white placeholder-white hover:border-blue-400
                    focus:border-blue-400 focus:outline-none focus:ring-4 
                    focus:ring-blue-400/50 focus:placeholder-transparent"
                />
                <input
                  type="password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="Confirm New Password"
                  className="rounded-md border-2 border-gray-300 bg-gray-900 px-4 py-2 
                    text-white placeholder-white hover:border-blue-400
                    focus:border-blue-400 focus:outline-none focus:ring-4 
                    focus:ring-blue-400/50 focus:placeholder-transparent"
                />
                <button
                  onClick={handlePasswordChange}
                  className="rounded-full bg-blue-500 text-white border-white 
                    border-2 w-full py-2 font-bold hover:bg-blue-600 
                    transition-colors"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </main>
        <Rightsection />
        <div className="hidden md:block md:h-screen md:w-[calc((100vw-600px)/2)]"></div>
      </div>
    </div>
  );
}
