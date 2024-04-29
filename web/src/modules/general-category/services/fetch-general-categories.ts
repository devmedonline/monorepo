import { fetchWithServerSession } from "@/modules/auth/lib/server-fetch-with-session";

type Pagination = {
  page: number;
  perPage: number;
};

function paginationToSearchParams(pagination: Pagination) {
  const searchParams = new URLSearchParams();
  searchParams.set("page", String(pagination.page));
  searchParams.set("perPage", String(pagination.perPage));
  return searchParams;
}

export async function fetchGeneralCategories(params: Pagination) {
  const searchParams = new URLSearchParams(paginationToSearchParams(params));

  const response = await fetchWithServerSession(
    "/general-category" + "?" + searchParams.toString(),
    {
      method: "GET",
    }
  );

  return response.json();
}
