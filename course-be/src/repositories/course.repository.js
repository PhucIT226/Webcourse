import db from "../database/models/index.js";
import { v4 as uuidv4 } from "uuid";
import { Op } from "sequelize";

class CourseRepository {
  constructor() {
    this.model = db.Course;
    this.enrollmentModel = db.Enrollment; // Bảng lưu học viên đăng ký khóa học
    this.paymentModel = db.Payment; // Bảng lưu thông tin thanh toán
  }

  // Lấy tất cả course (có phân trang + search + lọc category/instructor)
  async getAllCourses({
    page = 1,
    pageSize = 10,
    search,
    category,
    instructor,
  }) {
    const where = {};
    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { instructor: { [Op.like]: `%${search}%` } },
      ];
    }
    if (category) where.category = category;
    if (instructor) where.instructor = instructor;

    const { count, rows } = await this.model.findAndCountAll({
      where,
      offset: (page - 1) * pageSize,
      limit: +pageSize,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: this.enrollmentModel,
          as: "enrollments",
          attributes: [], // không lấy chi tiết
        },
      ],
      attributes: {
        include: [
          [db.Sequelize.fn("COUNT", db.Sequelize.col("*")), "studentCount"],
        ],
      },
      group: ["Course.id"],
      distinct: true,
    });

    return {
      data: rows,
      pagination: {
        total: count.length ? count.length : count,
        page: +page,
        pageSize: +pageSize,
        totalPages: Math.ceil((count.length ? count.length : count) / pageSize),
      },
    };
  }

  // Lấy course theo ID
  async getCourseById(id) {
    return this.model.findByPk(id);
  }

  // Tạo course mới
  async createCourse(courseData) {
    return this.model.create({
      id: uuidv4(),
      title: courseData.title,
      instructor: courseData.instructor,
      category: courseData.category,
      price: courseData.price,
      status: courseData.status || "draft",
      thumbnailUrls: courseData.thumbnailUrls || [],
    });
  }

  // Cập nhật course
  async updateCourse(id, data) {
    const course = await this.getCourseById(id);
    if (!course) return null;
    await course.update(data);
    return course;
  }

  // Xóa course
  async deleteCourse(id) {
    const course = await this.getCourseById(id);
    if (!course) return false;
    await course.destroy();
    return true;
  }

  // ========== Instructor Dashboard ==========

  async getInstructorCourses(instructorId) {
    return this.getAllCourses({ instructor: instructorId });
  }

  async getInstructorStudents(instructorId) {
    return this.enrollmentModel.findAll({
      where: { instructorId },
      include: [
        { model: db.User, as: "student", attributes: ["id", "name", "email"] },
      ],
    });
  }

  async getInstructorRevenue(instructorId) {
    const result = await this.paymentModel.findAll({
      where: { instructorId },
      attributes: [
        [db.Sequelize.fn("SUM", db.Sequelize.col("amount")), "totalRevenue"],
      ],
      raw: true,
    });
    return result[0]?.totalRevenue || 0;
  }
}

export default CourseRepository;
