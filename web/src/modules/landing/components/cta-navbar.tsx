"use client";

import { SignInDropdownTrigger } from "@/modules/auth/components/sign-in-button";
import { AndroidIcon, AppleIcon } from "@/modules/landing/components/icons";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useSticky } from "../hooks/use-sticky";

const DOWNLOAD_LINKS = {
  android: "https://play.google.com/store/apps/details?id=com.medapp",
  ios: "https://apps.apple.com/us/app/medapp/id1234567890",
};

export function CtaNavbar({ className }: { className?: string }) {
  const { isSticky, ref } = useSticky();

  return (
    <nav
      ref={ref}
      className={cn("sticky top-0", isSticky && "pt-4 z-50", className)}
    >
      <div
        className={cn(
          "rounded-full bg-card text-card-foreground flex items-center p-2",
          isSticky && "border shadow-md"
        )}
      >
        <Button variant="ghost" asChild className="gap-2">
          <Link href={DOWNLOAD_LINKS.android}>
            <AndroidIcon className="w-6 h-6" />
            <span className="sr-only lg:not-sr-only">Baixe para Android</span>
            <span className="lg:sr-only">Android</span>
          </Link>
        </Button>

        <Button variant="ghost" asChild className="gap-2">
          <Link href={DOWNLOAD_LINKS.ios}>
            <AppleIcon className="w-6 h-6" />
            <span className="sr-only lg:not-sr-only">Baixe para iOS</span>
            <span className="lg:sr-only">iOS</span>
          </Link>
        </Button>

        <AnimatePresence>
          {isSticky && (
            <motion.div
              initial={{ opacity: 0, x: -10, width: 0 }}
              animate={{ opacity: 1, x: 0, width: "auto" }}
              exit={{ opacity: 0, x: -10, width: 0 }}
              className="flex items-center gap-2"
            >
              <SignInDropdownTrigger />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
