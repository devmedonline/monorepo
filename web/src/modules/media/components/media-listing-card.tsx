"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { MediaListing } from "./media-listing";

export function MediaListingCard() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Galeria</CardTitle>
        <CardDescription>Gerencie as imagens</CardDescription>
      </CardHeader>

      <MediaListing />
    </Card>
  );
}
