"use client";

import { useState } from "react";

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";

interface AppShellProps {
  children: React.ReactNode;
}

/**
 * Single shared layout used by every page.
 *
 * Owns the sidebar's open/closed state. The `<main>` element below is
 * completely static with respect to that state: it always has the same
 * margin and width, whether the sidebar is open or closed. Only the
 * Sidebar itself moves (via its own transform), on a layer above the page.
 */
export function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header sidebarOpen={sidebarOpen} onMenuClick={() => setSidebarOpen((v) => !v)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="min-h-screen pt-14">{children}</main>
    </div>
  );
}
