import { motion } from "framer-motion";
import { Badge } from "./ui/badge";

const AnimatedBadge = motion(Badge);

export function PublicationStatusBadge({ status }: { status: string }) {
  return (
    <AnimatedBadge
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.7 }}
      variant={status === "published" ? "success" : "warning"}
      key={status}
      className="rounded-md rounded-tl-none w-fit"
    >
      {status === "published" ? "público" : "rascunho"}
    </AnimatedBadge>
  );
}
