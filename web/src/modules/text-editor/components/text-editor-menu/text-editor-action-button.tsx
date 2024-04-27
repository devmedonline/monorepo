import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { ClassValue } from "clsx";
import { forwardRef } from "react";

type TextEditorActionButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    icon: React.ReactNode;
    label: string;
    disabled?: boolean;
    active?: boolean;
    className?: ClassValue;
  };

export const TextEditorActionButton = forwardRef<
  HTMLButtonElement,
  TextEditorActionButtonProps
>(({ icon, label, onClick, disabled, active, className }, ref) => {
  return (
    <Button
      ref={ref}
      onClick={onClick}
      disabled={disabled}
      title={label}
      aria-label={label}
      variant="secondary"
      type="button"
      className={cn(
        "gap-2 flex-1 min-w-[3rem] rounded-none",
        { "bg-gray-500 text-violet-50": active },
        className
      )}
      size="icon"
    >
      {icon}
    </Button>
  );
});
TextEditorActionButton.displayName = "TextEditorActionButton";
