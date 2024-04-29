"use client";

import { cn } from "@/shared/lib/utils";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";

type FeatureListItemProps = {
  title: string;
  description: string;
  reverse?: boolean;
  image: StaticImageData & { alt: string };
};

const fadeInAnimationVariants = {
  initial: { opacity: 0, y: 10, transition: { duration: 0.6 } },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

export function FeatureListItem({
  title,
  description,
  reverse,
  image,
}: FeatureListItemProps) {
  return (
    <motion.li
      variants={fadeInAnimationVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className={cn("flex gap-4 p-4", reverse && "flex-row-reverse")}
    >
      <Image {...image} alt={image.alt} />

      <div>
        <h3 className="text-xl font-semibold">{title}</h3>

        <p className="text-lg mt-2">{description}</p>
      </div>
    </motion.li>
  );
}
