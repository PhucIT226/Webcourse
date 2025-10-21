import type { Pagination } from "./common";

export interface Lesson {
  id: string;
  course: { id?: string; title: string };
  courseId: string;
  title: string;
  content?: string;
  videoUrl?: string;
  resourceUrls?: string[];
  duration?: number;
  position: number;
  isFreePreview: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface LessonResDto {
  data: Lesson[];
  pagination: Pagination;
}

export type GetAllLessonParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  sortField?: string;
  courseId?: string;
  sortOrder?: "asc" | "desc";
};