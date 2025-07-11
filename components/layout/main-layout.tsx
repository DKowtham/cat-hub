"use client";

import React from "react";
import { Sidebar } from "./sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen" style={{ backgroundColor: "#0D0D0D" }}>
      <Sidebar />
      <main
        className="flex-1 overflow-y-auto"
        style={{ backgroundColor: "#0D0D0D" }}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};
