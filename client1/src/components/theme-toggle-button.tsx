"use client";
import React from "react";
import { useTheme } from "./theme-provider";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export function ThemeToggleButton({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  
  const handleClick = () => {
    console.log('Theme toggle clicked, current theme:', theme);
    toggleTheme();
  };
  
  return (
    <button
      onClick={handleClick}
      className={cn(
        "relative z-[70] p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2",
        "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300",
        "transition-colors duration-200 cursor-pointer",
        className
      )}
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? <IconSun size={20} /> : <IconMoon size={20} />}
    </button>
  );
}