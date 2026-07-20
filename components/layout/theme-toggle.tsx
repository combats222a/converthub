"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Light/dark segmented toggle. ConvertContext defaults to dark (set on <html>
 * in the root layout); this only flips the `dark` class on the document
 * element client-side.
 */
export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  function setTheme(dark: boolean) {
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }

  return (
    <div
      role="group"
      aria-label="Тема оформления"
      className="hidden items-center gap-0.5 rounded-lg border border-border p-0.5 sm:inline-flex"
    >
      <button
        type="button"
        aria-pressed={!isDark}
        aria-label="Светлая тема"
        onClick={() => setTheme(false)}
        className={cn(
          "inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors",
          !isDark && "bg-accent text-foreground"
        )}
      >
        <Sun className="size-3.5" />
      </button>
      <button
        type="button"
        aria-pressed={isDark}
        aria-label="Тёмная тема"
        onClick={() => setTheme(true)}
        className={cn(
          "inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors",
          isDark && "bg-accent text-foreground"
        )}
      >
        <Moon className="size-3.5" />
      </button>
    </div>
  );
}
