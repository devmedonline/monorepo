import { GeneralCategoriesCard } from "@/modules/general-category/components/general-categories-card";
import { CurrentUserProfileCard } from "@/modules/user/components/current-user-profile-card";

export default async function AdmHome() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <CurrentUserProfileCard />
      <GeneralCategoriesCard />
    </main>
  );
}
