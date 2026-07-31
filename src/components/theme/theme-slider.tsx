"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { flushSync } from "react-dom";
import { cn } from "@/lib/utils";

export default function ThemeSlider({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const trackRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Default dark before mount to match ThemeProvider defaultTheme / html class.
  const isDark = mounted ? resolvedTheme === "dark" : true;

  const applyTheme = async (next: "light" | "dark", event?: React.MouseEvent) => {
    // @ts-expect-error view transitions are not in all TS DOM libs
    if (!document.startViewTransition || !event || !trackRef.current) {
      setTheme(next);
      return;
    }

    const { top, left, width, height } =
      trackRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));

    // @ts-expect-error view transitions are not in all TS DOM libs
    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(next);
      });
    });

    await transition.ready;

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 450,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  };

  const onToggle = (e: React.MouseEvent) => {
    applyTheme(isDark ? "light" : "dark", e);
  };

  return (
    <button
      ref={trackRef}
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={onToggle}
      className={cn(
        "relative inline-flex h-8 w-[4.25rem] shrink-0 items-center rounded-full border border-border/60",
        "bg-muted/80 px-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
    >
      <Sun
        className={cn(
          "pointer-events-none absolute left-1.5 h-3.5 w-3.5 transition-opacity",
          isDark ? "opacity-40" : "opacity-100 text-amber-500"
        )}
      />
      <Moon
        className={cn(
          "pointer-events-none absolute right-1.5 h-3.5 w-3.5 transition-opacity",
          isDark ? "opacity-100 text-sky-300" : "opacity-40"
        )}
      />
      <span
        className={cn(
          "pointer-events-none z-10 block h-6 w-6 rounded-full bg-background shadow-md ring-1 ring-border transition-transform duration-300",
          isDark ? "translate-x-[2.15rem]" : "translate-x-0"
        )}
      />
    </button>
  );
}
