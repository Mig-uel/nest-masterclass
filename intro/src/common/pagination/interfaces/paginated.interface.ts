type Meta = {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
};

type Links = {
  first: string;
  last: string;
  current: string;
  next: string;
  previous: string;
};

export interface Paginated<T = any> {
  data: T[];
  meta: Meta;
  links: Links;
}
