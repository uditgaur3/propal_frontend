"use client";
import React from "react";
import { useTheme } from "./theme-provider";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export function ThemeToggleButton({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2",
        "hover:bg-gray-200 dark:hover:bg-gray-700",
        className
      )}
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? <IconSun size={20} /> : <IconMoon size={20} />}
    </button>
  );
}