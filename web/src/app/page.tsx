"use client";

import { SignInButton } from "@/modules/auth/components/sign-in-button";
import iphoneMockup from "@/modules/landing/assets/iphone-mockup-bg.png";
import samsungMockup from "@/modules/landing/assets/samsung-mockup-bg.png";
import { AndroidIcon, AppleIcon } from "@/modules/landing/components/icons";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const DOWNLOAD_LINKS = {
  android: "https://play.google.com/store/apps/details?id=com.medapp",
  ios: "https://apps.apple.com/us/app/medapp/id1234567890",
};

const YEAR = new Date().getFullYear();

function useIsSticked(element: HTMLElement | null, topOffset = 0) {
  const [isSticked, setIsSticked] = useState(false);

  useEffect(() => {
    if (!element) return;

    const handleScroll = () => {
      const isSticked =
        Math.round(window.scrollY - element.offsetTop) >= topOffset;

      setIsSticked(isSticked);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [element, topOffset]);

  return isSticked;
}

export default function Home() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isSticked = useIsSticked(headerRef.current);

  return (
    <main className="flex flex-col items-center">
      <h1 className="text-4xl lg:text-5xl font-black text-center mt-[30dvh]">
        MedApp - Lorem ipsum dolor sit.
      </h1>

      <div
        ref={headerRef}
        className={cn("sticky top-0 mt-8", isSticked && "pt-4 z-50")}
      >
        <div
          className={cn(
            "rounded-full bg-card text-card-foreground flex items-center gap-2 p-2",
            isSticked && "border shadow-md"
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

          {isSticked && (
            <div className="ml-6 flex items-center gap-2">
              <SignInButton />
            </div>
          )}
        </div>
      </div>

      <div className="mt-48 flex max-w-sm justify-center items-center">
        <Image src={iphoneMockup} alt="iPhone Mockup" />
        <Image
          className="-ml-40 h-fit"
          src={samsungMockup.src}
          alt="Samsung Mockup"
          width={samsungMockup.width * 0.66}
          height={samsungMockup.height * 0.66}
        />
      </div>

      <section className="flex flex-col items-center max-w-2xl mt-16 px-4">
        <h2 className="text-2xl font-bold text-center mt-32">
          Lorem ipsum dolor sit amet.
        </h2>
        <p className="text-center mt-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          malesuada, libero nec ultricies lacinia, purus turpis ultricies
          sapien, vel ultricies purus purus at nisl.
        </p>
      </section>

      <footer className="mt-16 w-full h-40 border-t bg-secondary text-secondary-foreground">
        <div className="flex justify-center items-center h-full">
          <p className="text-center">{YEAR} DevMed.</p>
        </div>
      </footer>
    </main>
  );
}
