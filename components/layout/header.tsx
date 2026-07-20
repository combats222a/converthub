"use client";

import Link from "next/link";
import { Code2, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";

interface HeaderProps {
  sidebarOpen: boolean;
  onMenuClick: () => void;
}

/**
 * Fixed top bar. Always spans the full width — it does not react to the
 * sidebar's open/closed state beyond the icon it shows.
 */
export function Header({ sidebarOpen, onMenuClick }: HeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-3 border-b border-border bg-background/95 px-3 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:px-4">
      <div className="flex min-w-0 items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          aria-label={sidebarOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={sidebarOpen}
          onClick={onMenuClick}
        >
          {sidebarOpen ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
        </Button>

        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 rounded-md px-1.5 py-1 text-[15px] font-bold"
        >
          <span className="flex size-6.5 items-center justify-center rounded-md bg-gradient-to-br from-primary to-blue-600 text-xs text-white">
            C
          </span>
          <span>ConvertHub</span>
        </Link>

        <div className="hidden h-5 w-px shrink-0 bg-border sm:block" />

        <Link
          href="/api"
          aria-label="API для разработчиков"
          title="API для разработчиков"
          className="hidden size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground sm:inline-flex"
        >
          <Code2 className="size-4" />
        </Link>

        <div className="hidden h-5 w-px shrink-0 bg-border md:block" />

        <span className="hidden truncate text-sm font-semibold text-foreground md:inline">
          Конвертер файлов
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
        <ThemeToggle />
        <Button size="sm">Регистрация</Button>
      </div>
    </header>
  );
}
