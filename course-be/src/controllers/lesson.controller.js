import LessonService from "../services/lesson.service.js";
import BaseController from "./base.controller.js";

class LessonController extends BaseController {
  constructor() {
    super();
    this.service = new LessonService();
  }

  // Lấy danh sách bài học
  async getAllLessons(req, res) {
    const { 
      page = 1, 
      pageSize = 10, 
      course,
      search,
      sortField, 
      sortOrder,
    } = req.query;

    const result = await this.service.getListLessons({ 
      page, 
      pageSize,
      course,
      search,
      sortField, 
      sortOrder,
    });

    res.json({
      status: true,
      message: "Fetched lessons successfully",
      data: result.data,
      pagination: result.pagination,
    });
  }

  // Lấy bài học theo id
  async getLessonById(req, res) {
    const { id } = req.params;
    const lesson = await this.service.getLessonById(id);

    if (!lesson) {
      return res.status(404).json({ status: false, message: "Lesson not found" });
    }

    res.json({
      status: true,
      message: "Fetched lesson successfully",
      data: lesson,
    });
  }

  // Tạo bài học mới
  async createLesson(req, res) {
    const data = req.body;
    
    const newLesson = await this.service.createLesson(data);
    
    data.courseId = data.courseId;
    
    res.status(201).json({
      status: true,
      message: "Lesson created successfully",
      data: newLesson,
    });
  }

  // Cập nhật bài học
  async updateLesson(req, res) {
    const { id } = req.params;
    const data = req.body;
    const updated = await this.service.updateLesson(id, data);

    data.courseId = data.courseId;

    if (!updated) {
      return res.status(404).json({ status: false, message: "Lesson not found" });
    }

    res.json({
      status: true,
      message: "Lesson updated successfully",
      data: updated,
    });
  }

  // Xóa bài học
  async deleteLesson(req, res) {
    const { id } = req.params;
    const deleted = await this.service.deleteLesson(id);

    if (!deleted) {
      return res.status(404).json({ status: false, message: "Lesson not found" });
    }

    res.json({
      status: true,
      message: "Lesson deleted successfully",
    });
  }
}

export default new LessonController();
