"use client";
import { cn } from "@/shared/lib/utils";
import { MoonIcon, SunIcon } from "lucide-react";
import { changeThemeServerAction } from "../server-actions/change-theme-serve-action";

export function ThemeOptions({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <form action={changeThemeServerAction} method="post">
        <input type="hidden" name="theme" value="dark" />
        <button
          type="submit"
          title="Dark mode"
          aria-label="Dark mode"
          className={cn(
            "rounded-xl h-10 w-10 flex items-center justify-center",
            "bg-muted text-muted-foreground border border-border/10",
            "dark:border-primary-foreground/10 dark:bg-primary dark:text-primary-foreground"
          )}
        >
          <MoonIcon size={16} />
        </button>
      </form>

      <form action={changeThemeServerAction} method="post">
        <input type="hidden" name="theme" value="light" />
        <button
          type="submit"
          title="Dark mode"
          aria-label="Dark mode"
          className={cn(
            "rounded-xl h-10 w-10 flex items-center justify-center",
            "dark:bg-muted dark:text-muted-foreground dark:border dark:border-border/10",
            "border-primary-foreground/10 bg-primary text-primary-foreground"
          )}
        >
          <SunIcon size={16} />
        </button>
      </form>
    </div>
  );
}
