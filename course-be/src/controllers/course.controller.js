import CourseService from "../services/course.service.js";
import BaseController from "./base.controller.js";

class CourseController extends BaseController {
  constructor() {
    super();
    this.service = new CourseService();
  }

  // Lấy danh sách courses
  async getAllCourses(req, res) {
    const { page = 1, pageSize = 10, search, category, instructor } = req.query;
    const result = await this.service.getListCourses({ page, pageSize, search, category, instructor });

    res.json({
      status: true,
      message: "Fetched courses successfully",
      data: result.data,   // <-- mỗi course có thêm studentCount
      pagination: result.pagination,
    });
  }

  // Lấy course theo id
  async getCourseById(req, res) {
    const { id } = req.params;
    const course = await this.service.getCourseById(id);

    if (!course) {
      return res.status(404).json({ status: false, message: "Course not found" });
    }

    res.json({
      status: true,
      message: "Fetched course successfully",
      data: course,
    });
  }

  // Tạo course mới
  async createCourse(req, res) {
    const data = req.body;
    const newCourse = await this.service.createCourse(data);

    res.status(201).json({
      status: true,
      message: "Course created successfully",
      data: newCourse,
    });
  }

  // Cập nhật course
  async updateCourse(req, res) {
    const { id } = req.params;
    const data = req.body;
    const updated = await this.service.updateCourse(id, data);

    if (!updated) {
      return res.status(404).json({ status: false, message: "Course not found" });
    }

    res.json({
      status: true,
      message: "Course updated successfully",
      data: updated,
    });
  }

  // Xóa course
  async deleteCourse(req, res) {
    const { id } = req.params;
    const deleted = await this.service.deleteCourse(id);

    if (!deleted) {
      return res.status(404).json({ status: false, message: "Course not found" });
    }

    res.json({
      status: true,
      message: "Course deleted successfully",
    });
  }

  // ========== Instructor Dashboard ==========

  async getInstructorCourses(req, res) {
    const instructorId = req.user.id;
    const result = await this.service.getInstructorCourses(instructorId);

    res.json({
      status: true,
      message: "Fetched instructor courses successfully",
      data: result.data,
      pagination: result.pagination,
    });
  }

  async getInstructorStudents(req, res) {
    const instructorId = req.user.id;
    const students = await this.service.getInstructorStudents(instructorId);

    res.json({
      status: true,
      message: "Fetched instructor students successfully",
      data: students,
    });
  }

  async getInstructorRevenue(req, res) {
    const instructorId = req.user.id;
    const revenue = await this.service.getInstructorRevenue(instructorId);

    res.json({
      status: true,
      message: "Fetched instructor revenue successfully",
      data: revenue,
    });
  }
}

export default new CourseController();
