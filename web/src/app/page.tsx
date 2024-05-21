import iPhoneMockup from "@/modules/landing/assets/iphone-mockup-bg.png";
import samsungMockup from "@/modules/landing/assets/samsung-mockup-bg.png";
import { CtaNavbar } from "@/modules/landing/components/cta-navbar";
import { FeatureListItem } from "@/modules/landing/components/feature-list-item";
import { SimpleHeader } from "@/modules/landing/components/simple-header";
import { FloatingDashboardButton } from "@/modules/layout/components/floating-dashboard-button";
import { LucideFingerprint, LucideStethoscope } from "lucide-react";
import Image from "next/image";

const YEAR = new Date().getFullYear();

export default function Home() {
  return (
    <main className="flex flex-col items-center bg-gradient-to-t from-gray-200 dark:from-gray-950 to-background">
      <SimpleHeader />
      <FloatingDashboardButton />

      <div className="flex items-center justify-center relative flex-col container">
        <h1 className="text-center inline-block bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-5xl font-black text-transparent lg:text-9xl mt-[24dvh]">
          MedApp
        </h1>
        <p className="text-center text-lg mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>

      <CtaNavbar className="mt-8" />

      <div className="mt-36 flex max-w-sm justify-center items-center">
        <Image src={iPhoneMockup} alt="iPhone Mockup" />
        <Image
          className="-ml-40 h-fit"
          src={samsungMockup.src}
          alt="Samsung Mockup"
          width={samsungMockup.width * 0.66}
          height={samsungMockup.height * 0.66}
        />
      </div>

      <section className="flex flex-col items-center max-w-2xl mt-16 px-4">
        <h2
          id="features"
          className="text-2xl flex items-center font-bold mt-32"
        >
          <LucideStethoscope size={28} className="mr-2" />
          Recursos
        </h2>

        <ul className="space-y-8 mt-8">
          <FeatureListItem
            title="Lorem ipsum dolor sit amet."
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            image={{
              ...iPhoneMockup,
              alt: "iPhone Mockup",
              height: iPhoneMockup.height * 0.2,
              width: iPhoneMockup.width * 0.2,
            }}
          />

          <FeatureListItem
            title="Lorem ipsum dolor sit amet."
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            reverse
            image={{
              ...iPhoneMockup,
              alt: "iPhone Mockup",
              height: iPhoneMockup.height * 0.2,
              width: iPhoneMockup.width * 0.2,
            }}
          />

          <FeatureListItem
            title="Lorem ipsum dolor sit amet."
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            image={{
              ...iPhoneMockup,
              alt: "iPhone Mockup",
              height: iPhoneMockup.height * 0.2,
              width: iPhoneMockup.width * 0.2,
            }}
          />
        </ul>
      </section>

      <section className="flex flex-col items-center max-w-2xl mt-16 px-4">
        <h2 id="about" className="text-2xl flex items-center font-bold mt-32">
          <LucideFingerprint size={28} className="mr-2" />
          Sobre Nós
        </h2>

        <p className="text-lg mt-8 text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </section>

      <footer className="mt-16 w-full h-40 shadow-lg bg-primary text-primary-foreground">
        <div className="flex justify-center items-center h-full">
          <p className="text-center">{YEAR} DevMed.</p>
        </div>
      </footer>
    </main>
  );
}
