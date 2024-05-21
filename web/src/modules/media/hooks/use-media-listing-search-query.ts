import { useQuery } from "@tanstack/react-query";
import { MediaInput, fetchMedia } from "../services/fetch-media";

export const MEDIA_LISTING_QUERY_KEY = "MEDIA_LISTING_QUERY_KEY";

export function useMediaListingQuery(params: MediaInput) {
  return useQuery({
    queryKey: [MEDIA_LISTING_QUERY_KEY, params],
    queryFn: () => fetchMedia(params),
  });
}
