import db from "../database/models/index.js";
import { v4 as uuidv4 } from "uuid";
import { Op } from "sequelize";

class CategoryRepository {
  constructor() {
    this.model = db.Category;
  }

  // Lấy tất cả categories (có phân trang + search)
  async getAllCategories({ page = 1, pageSize = 10, search }) {
    const where = {};
    if (search) {
      where.name = { [Op.like]: `%${search}%` };
    }

    const { count, rows } = await this.model.findAndCountAll({
      where,
      offset: (page - 1) * pageSize,
      limit: +pageSize,
      order: [["createdAt", "DESC"]],
    });

    return {
      data: rows,
      pagination: {
        total: count,
        page: +page,
        pageSize: +pageSize,
        totalPages: Math.ceil(count / pageSize),
      },
    };
  }

  // Lấy category theo ID
  async getCategoryById(id) {
    return this.model.findByPk(id);
  }

  // Tạo category mới
  async createCategory(categoryData) {
    return this.model.create({
      id: uuidv4(),
      name: categoryData.name,
      description: categoryData.description || "",
      status: categoryData.status || "active",
    });
  }

  // Cập nhật category
  async updateCategory(id, data) {
    const category = await this.getCategoryById(id);
    if (!category) return null;
    await category.update(data);
    return category;
  }

  // Xóa category
  async deleteCategory(id) {
    const category = await this.getCategoryById(id);
    if (!category) return false;
    await category.destroy();
    return true;
  }
}

export default CategoryRepository;
