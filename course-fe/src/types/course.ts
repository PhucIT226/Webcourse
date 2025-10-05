import type { Image, Pagination } from "./common";

export type Course = {
  id?: string;
  title: string;
  description?: string; // ✅ Thêm mô tả
  instructor: string;
  category: string;
  price: number;
  studentCount?: number; // ✅ Số học viên
  createdAt?: string;
  status: "published" | "draft" | "closed";
  thumbnailUrls?: Image[];
};

export interface CourseResDto {
  data: Course[];
  pagination: Pagination;
}

export type GetAllCourseParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  sortField?: string;
  sortOrder?: "asc" | "desc";
};
