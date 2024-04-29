"use client";

import { SignInButtonList } from "@/modules/auth/components/sign-in-button";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { motion } from "framer-motion";
import { LucideMenu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const fadeInAnimationVariants = {
  initial: { opacity: 0, y: 10 },
  animate: (idx: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      delay: idx * 0.1,
    },
  }),
  exit: { opacity: 0, y: 10 },
};

const MotionButton = motion(Button);

export function SimpleHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute top-0 right-0 left-0 w-full">
      <div className="w-full flex justify-between items-center p-4">
        <Button
          variant="outline"
          size="icon"
          className="font-bold text-lg flex-shrink-0 lg:hidden"
          onClick={() => setOpen(!open)}
        >
          <LucideMenu size={24} />
        </Button>

        <nav
          className={cn(
            "gap-4 hidden lg:flex lg:flex-row lg:relative lg:top-0 lg:left-0 lg:right-0 lg:justify-center lg:items-center lg:shadow-none lg:bg-transparent lg:p-0",
            open &&
              "flex absolute top-full left-4 right-4 border rounded-xl p-4 justify-center bg-card shadow-md z-50"
          )}
        >
          <HeaderItemList />
        </nav>

        <SignInButtonList />
      </div>
    </header>
  );
}

function HeaderItemList() {
  return (
    <>
      <MotionButton
        asChild
        variant="link"
        custom={0}
        variants={fadeInAnimationVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <Link href="#features">Recursos</Link>
      </MotionButton>

      <MotionButton
        asChild
        variant="link"
        custom={1}
        variants={fadeInAnimationVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <Link href="#about">Sobre</Link>
      </MotionButton>

      <MotionButton
        asChild
        variant="link"
        custom={2}
        variants={fadeInAnimationVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <Link href="#contact">Contatos</Link>
      </MotionButton>
    </>
  );
}
