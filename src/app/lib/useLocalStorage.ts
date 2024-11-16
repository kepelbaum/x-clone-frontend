"use client";

import { useEffect, useState } from "react";

const ISSERVER = typeof window === "undefined";
const getStorageValue = (key: string) => {
  if (ISSERVER) return null;
  return localStorage.getItem(key);
};

export function useLocalStorage(key: string) {
  console.log("1. Hook is executing");
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    console.log("2. Effect is running");
    setValue(getStorageValue(key));
  }, [key]);

  return value;
}
