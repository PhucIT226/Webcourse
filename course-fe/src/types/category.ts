import type { Pagination } from "./common";

export type Category = {
  id?: string;
  name: string;
  slug: string;
  description?: string;
  createdAt?: string;
  status: "active" | "inactive";
};

export interface CategoryResDto {
  data: Category[];
  pagination: Pagination;
}

export type GetAllCategoryParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  sortField?: string;
  sortOrder?: "asc" | "desc";
};
