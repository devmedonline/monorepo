import { Card, CardContent } from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import type { CurrentUserData } from "../types/user";

type CurrentUserProfileCardProps = {
  userData: CurrentUserData;
};

export function CurrentUserProfileCard({
  userData,
}: CurrentUserProfileCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center space-x-4 py-4 justify-center h-full">
        <Image
          className="w-24 h-24 rounded-full"
          src={userData.avatar}
          alt={userData.name}
          width={96}
          height={96}
        />

        <div>
          <h2 className="text-xl font-semibold truncate">{userData.name}</h2>
          <p className="text-muted-foreground truncate">{userData.email}</p>
          <strong
            className={cn(
              "text-sm font-semibold",
              userData.verified ? "text-green-500" : "text-red-500"
            )}
          >
            {userData.verified ? "Verificado" : "Não verificado"}
          </strong>
        </div>
      </CardContent>
    </Card>
  );
}
