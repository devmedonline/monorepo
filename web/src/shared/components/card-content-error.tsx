import { CardContent } from "./ui/card";

export function CardContentError({ message }: { message: string }) {
  return (
    <CardContent className="text-destructive flex items-center py-4 justify-center h-full">
      {message}
    </CardContent>
  );
}
