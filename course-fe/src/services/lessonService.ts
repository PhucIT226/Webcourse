import axios from "./axiosClient";
import type { Lesson, LessonResDto, GetAllLessonParams } from "../types/lesson";

const LessonService = {
  // GET /api/lessons?page=&pageSize=&courseId=
  async getAll(params?: GetAllLessonParams): Promise<LessonResDto> {
    const res = await axios.get<LessonResDto>("/lessons", { params });
    return res.data;
  },

  // GET /api/lessons/:id
  async getById(id: string): Promise<Lesson> {
    const res = await axios.get(`/lessons/${id}`);
    return res.data.data;
  },

  // POST /api/lessons
   async create(lesson: Partial<Lesson>): Promise<Lesson> {
    const res = await axios.post<{ status: boolean; message: string; data: Lesson }>(
      "/lessons",
      lesson
    );

    return res.data.data;
  },

  // PUT /api/lessons/:id
  async update(id: string, lesson: Partial<Lesson>): Promise<Lesson> {
    const res = await axios.patch<{ status: boolean; message: string; data: Lesson }>(
      `/lessons/${id}`,
      lesson
    );

    return res.data.data;
  },

  // DELETE /api/lessons/:id
  async delete(id: string): Promise<void> {
    await axios.delete(`/lessons/${id}`);
  },
};

export default LessonService;
