"use client";

import { cn } from "@/lib/utils";
import { useConvert } from "@/components/home/convert-context";

export function Toast() {
  const { toastMessage, toastVisible } = useConvert();

  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 z-50 max-w-[86vw] -translate-x-1/2 rounded-lg border border-border bg-secondary px-4.5 py-2.5 text-center text-[13px] text-foreground shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-200",
        toastVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      )}
    >
      {toastMessage}
    </div>
  );
}
