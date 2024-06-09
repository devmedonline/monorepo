"use client";

import { GeneralCategoriesCard } from "@/modules/general-category/components/general-categories-card";
import { MediaListingCard } from "@/modules/media/components/media-listing-card";
import { PostCard } from "@/modules/post/components/post-card";
import { SimulationCategoriesCard } from "@/modules/simulation-category/components/simulation-categories-card";
import { CurrentUserProfileCard } from "@/modules/user/components/current-user-profile-card";

export default function AdmHome() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <CurrentUserProfileCard />
      <GeneralCategoriesCard />
      <MediaListingCard />
      <PostCard />
      <SimulationCategoriesCard />
    </main>
  );
}
