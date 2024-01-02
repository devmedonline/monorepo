'use client';

import { useCurrentUserProfileQuery } from '@/modules/user/hooks/user-current-user-profile-query';

export default function CurrentUserProfilePage() {
  const currentUserProfileQuery = useCurrentUserProfileQuery();

  if (currentUserProfileQuery.isLoading) {
    return <p>Loading...</p>;
  }

  if (currentUserProfileQuery.isError) {
    return <p>Error...</p>;
  }

  const currentUserProfile = currentUserProfileQuery.data;

  return (
    <>
      <h1>Profile</h1>

      <pre>{JSON.stringify(currentUserProfile, null, 2)}</pre>
    </>
  );
}
