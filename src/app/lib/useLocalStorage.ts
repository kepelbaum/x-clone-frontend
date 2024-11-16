"use client";

import { useEffect, useState } from "react";

export function useLocalStorage(key: string) {
  console.log("1. Hook is executing");
  const ISSERVER = typeof window === "undefined";
  console.log("2. ISSERVER is:", ISSERVER);
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    console.log("3. Effect is running");
    if (!ISSERVER) {
      console.log("4. About to access localStorage");
      setValue(localStorage.getItem(key));
    }
  }, [key]);

  return value;
}
