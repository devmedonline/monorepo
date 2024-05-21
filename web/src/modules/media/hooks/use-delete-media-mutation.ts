import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchDeleteMedia } from "../services/fetch-delete-media";
import { MEDIA_LISTING_QUERY_KEY } from "./use-media-listing-search-query";

export function useDeleteMediaMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchDeleteMedia,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MEDIA_LISTING_QUERY_KEY],
      });
    },
  });
}
