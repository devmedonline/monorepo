export type PaginationResponse = {
  links: {
    first: string;
    last: string;
    prev: string;
    next: string;
  };
  meta: {
    currentPage: number;
    from: number;
    lastPage: number;
    path: string;
    perPage: number;
    to: number;
    total: number;
  };
};
