import type { Pagination } from "./common";

export type User = {
  id?: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  courseCount?: number; 
  progress?: string; 
  status: "active" | "inactive" | "banned" | "pending";
  createdAt?: string;
};

export interface UserResDto {
  data: User[];
  pagination: Pagination;
}

export type GetAllUserParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  sortField?: string;
  sortOrder?: "asc" | "desc";
  role?: "student" | "instructor";
};
