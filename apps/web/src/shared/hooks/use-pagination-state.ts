import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function usePaginationState(
  searchParamsName = "page",
): [number, (page: number | ((oldPage: number) => number)) => void] {
  const path = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = +(searchParams.get(searchParamsName) || 0);

  const setCurrentPage = (page: number | ((oldPage: number) => number)) => {
    if (typeof page === "function") {
      page = page(currentPage);
    }

    router.push(`${path}?${searchParamsName}=${page}`, {
      scroll: false,
    });
  };

  return [currentPage, setCurrentPage];
}
