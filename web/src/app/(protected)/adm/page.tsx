import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { GeneralCategoriesCard } from "@/modules/general-category/components/general-categories-card";
import { CurrentUserProfileCard } from "@/modules/user/components/current-user-profile-card";
import { fetchCurrentUserData } from "@/modules/user/services/fetch-current-user-data";
import { getServerSession } from "next-auth";

export default async function AdmHome() {
  const session = await getServerSession(authOptions);

  console.log("sesssss", session);
  const data = await fetchCurrentUserData();

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <CurrentUserProfileCard userData={data} />
      <GeneralCategoriesCard />
    </main>
  );
}
