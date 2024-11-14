// src/app/clientwrapper.tsx
"use client";
import { ReactNode } from "react";

export function ClientWrapper({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
