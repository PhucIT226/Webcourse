import LessonRepository from "../repositories/lesson.repository.js";

class LessonService {
  constructor() {
    this.repository = new LessonRepository();
  }

  // Lấy danh sách bài học
  getListLessons({ page, pageSize, courseId, search, sortField, sortOrder }) {
    return this.repository.getAllLessons({ page, pageSize, courseId, search, sortField, sortOrder });
  }

  // Lấy bài học theo id
  getLessonById(id) {
    return this.repository.getLessonById(id);
  }

  // Tạo bài học
  createLesson(data) {
    return this.repository.createLesson(data);
  }

  // Cập nhật bài học
  updateLesson(id, data) {
    return this.repository.updateLesson(id, data);
  }

  // Xóa bài học
  deleteLesson(id) {
    return this.repository.deleteLesson(id);
  }
}

export default LessonService;
