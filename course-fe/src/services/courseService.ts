import axiosClient from "./axiosClient";
import type { Course, CourseResDto, GetAllCourseParams } from "../types/course";

const CourseService = {
  async getAll(params?: GetAllCourseParams): Promise<CourseResDto> {
    const res = await axiosClient.get<CourseResDto>("/courses", { params });
    return res.data;
  },

  async getById(id: string): Promise<Course> {
    const res = await axiosClient.get<Course>(`/courses/${id}`);
    return res.data;
  },

  async create(course: Partial<Course>): Promise<Course> {
    const res = await axiosClient.post<Course>("/courses", course);
    return res.data;
  },

  async update(id: string, course: Partial<Course>): Promise<Course> {
    const res = await axiosClient.put<Course>(`/courses/${id}`, course);
    return res.data;
  },

  async remove(id: string): Promise<void> {
    await axiosClient.delete(`/courses/${id}`);
  },
};

export default CourseService;
