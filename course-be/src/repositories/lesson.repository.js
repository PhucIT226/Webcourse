import db from "../database/models/index.js";
import { v4 as uuidv4 } from "uuid";
import { Op } from "sequelize";

class LessonRepository {
  constructor() {
    this.model = db.Lesson;
    this.courseModel = db.Course;
  }

  // Lấy tất cả bài học (có phân trang + search)
  async getAllLessons({ 
    page = 1, 
    pageSize = 10, 
    course,
    search,
    sortField = "createdAt",
    sortOrder = "desc",
  }) {
    const orderDir = sortOrder.toLowerCase() === "asc" ? "ASC" : "DESC";

    const where = {};
    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { "$course.title$": { [Op.like]: `%${search}%` } },
      ];
    }

    if (course) where.courseId = course;

    const orderArray = [];
    const directColumns = ["title", "position", "createdAt"];

    if (directColumns.includes(sortField)) {
      orderArray.push([sortField, orderDir]);
    }

    const { count, rows } = await this.model.findAndCountAll({
      where,
      offset: (page - 1) * pageSize,
      limit: +pageSize,
      order: orderArray.length ? orderArray : [["createdAt", "DESC"]],
      include: [
        {
          model: this.courseModel,
          as: "course",
          attributes: ["id", "title"],
          required: false,
        },
      ],
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

  // Lấy bài học theo ID
  async getLessonById(id) {
    return this.model.findByPk(id);
  }

  // Tạo bài học mới
  async createLesson(lessonData) {
    return this.model.create({
      id: uuidv4(),
      courseId: lessonData.courseId,
      title: lessonData.title,
      content: lessonData.content || "",
      videoUrl: lessonData.videoUrl || "",
      resourceUrls: lessonData.resourceUrls || [],
      duration: lessonData.duration || 0,
      position: lessonData.position,
      isFreePreview: lessonData.isFreePreview || false,
    });
  }

  // Cập nhật bài học
  async updateLesson(id, data) {
    const lesson = await this.model.findByPk(id);
    if (!lesson) return null;

    await lesson.update({
      courseId: data.courseId ?? lesson.courseId,
      title: data.title ?? lesson.title,
      content: data.content ?? lesson.content,
      videoUrl: data.videoUrl ?? lesson.videoUrl,
      resourceUrls: data.resourceUrls ?? lesson.resourceUrls,
      duration: data.duration ?? lesson.duration,
      position: data.position ?? lesson.position,
      isFreePreview: data.isFreePreview ?? lesson.isFreePreview,
    });

    return lesson;
  }

  // Xóa bài học
  async deleteLesson(id) {
    const lesson = await this.getLessonById(id);
    if (!lesson) return false;
    await lesson.destroy();
    return true;
  }
}

export default LessonRepository;
