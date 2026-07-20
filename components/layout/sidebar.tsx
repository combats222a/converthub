"use client";

import Link from "next/link";
import { Home } from "lucide-react";

import { cn } from "@/lib/utils";
import { NAV_SECTIONS } from "@/components/layout/nav-config";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Global navigation drawer.
 *
 * Behaves like Linear / GitHub / Notion's overlay sidebar:
 * - always `position: fixed`, never part of document flow
 * - opens/closes purely via `transform: translateX(...)`
 * - sits above a blurred backdrop overlay
 * - the main content area is completely unaware of this component's
 *   open/closed state — it never changes margin-left or width.
 */
export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {/* Backdrop: dims + blurs whatever is behind the drawer, closes on click */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          "fixed inset-x-0 bottom-0 top-14 z-30 bg-black/50 backdrop-blur-sm transition-opacity duration-200 ease-out",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      {/* Drawer panel */}
      <aside
        aria-label="Основная навигация"
        aria-hidden={!open}
        inert={!open}
        className={cn(
          "fixed left-0 top-14 bottom-0 z-40 flex w-72 max-w-[85vw] flex-col",
          "border-r border-border bg-background",
          "transition-transform duration-200 ease-out will-change-transform",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="mb-4">
            <SidebarSectionTitle>Главная</SidebarSectionTitle>
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center gap-2.5 rounded-md bg-accent px-2.5 py-2 text-sm font-medium text-foreground"
            >
              <Home className="size-4 shrink-0" />
              <span className="truncate">Конвертер файлов</span>
            </Link>
          </div>

          {NAV_SECTIONS.map((section) => (
            <div key={section.title} className="mb-4">
              <SidebarSectionTitle>{section.title}</SidebarSectionTitle>
              <div className="flex flex-col gap-0.5">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    {item.gradient ? (
                      <span
                        className={cn(
                          "flex size-6 shrink-0 items-center justify-center rounded-md bg-gradient-to-br text-white",
                          item.gradient
                        )}
                      >
                        <item.icon className="size-3.5" />
                      </span>
                    ) : (
                      <item.icon className="size-4 shrink-0 text-muted-foreground" />
                    )}
                    <span className="truncate">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-border p-3">
          <div className="flex flex-col gap-1.5 rounded-lg border border-border bg-muted/40 p-2.5 text-xs">
            <div className="flex items-center gap-2 text-foreground">
              <span className="relative flex size-1.5 rounded-full bg-muted-foreground/50" />
              <span>0 файлов</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>В очереди</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

function SidebarSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-1 px-2.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
      {children}
    </div>
  );
}
