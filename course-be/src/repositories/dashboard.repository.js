import db from "../database/models/index.js";
import { Sequelize } from "sequelize";

class DashboardRepository {
  constructor() {
    this.orderModel = db.Order;
    this.orderItemModel = db.OrderItem;
    this.courseModel = db.Course;
    this.userModel = db.User;
    this.reviewModel = db.Review;
    this.paymentModel = db.Payment;
    this.roleModel = db.Role;
  }

  // 1️⃣ Tổng quan hệ thống
  async getSummary() {
    // Đếm số học viên (role = 'user')
    const [totalUsers, totalCourses, totalOrders, totalRevenue] = await Promise.all([
      this.userModel.count({
        include: [
          {
            model: this.roleModel,
            as: "role",
            where: { name: "student" }, // chỉ tính học viên
          },
        ],
      }),
      this.courseModel.count(),
      this.orderModel.count(),
      this.paymentModel.sum("amount"),
    ]);

    return {
      totalUsers,
      totalCourses,
      totalOrders,
      totalRevenue: totalRevenue || 0,
    };
  }

  // 2️⃣ Doanh thu theo tháng (6 tháng gần nhất)
  async getRevenueStats() {
    const result = await this.paymentModel.findAll({
      attributes: [
        [
          Sequelize.fn("DATE_FORMAT", Sequelize.col("createdAt"), "%Y-%m"),
          "month",
        ],
        [Sequelize.fn("SUM", Sequelize.col("amount")), "totalRevenue"],
      ],
      group: ["month"],
      order: [[Sequelize.literal("month"), "ASC"]],
      raw: true,
    });

    return result.map((r) => ({
      month: r.month,
      totalRevenue: parseFloat(r.totalRevenue),
    }));
  }

  // 3️⃣ Top khóa học bán chạy
  async getTopCourses(limit = 5) {
    const result = await this.orderItemModel.findAll({
      attributes: [
        "courseId",
        [Sequelize.fn("COUNT", Sequelize.col("courseId")), "salesCount"],
      ],
      include: [
        {
          model: this.courseModel,
          as: "course",
          attributes: ["id", "title", "price", "thumbnailUrl"],
        },
      ],
      group: ["courseId", "course.id"],
      order: [[Sequelize.literal("salesCount"), "DESC"]],
      limit,
      raw: true,
      nest: true,
    });

    return result.map((r) => ({
      id: r.course.id,
      title: r.course.title,
      price: r.course.price,
      thumbnailUrl: r.course.thumbnailUrl,
      salesCount: r.salesCount,
    }));
  }

  // 4️⃣ Đơn hàng gần đây
  async getRecentOrders(limit = 5) {
    const result = await this.orderModel.findAll({
      limit,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: this.userModel,
          as: "user",
          attributes: ["id", "name", "email"],
        },
      ],
      attributes: ["id", "totalAmount", "status", "createdAt"],
    });

    return result.map((order) => ({
      id: order.id,
      totalAmount: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt,
      user: order.user,
    }));
  }

  // 5️⃣ Đánh giá gần đây
  async getRecentReviews(limit = 5) {
    const result = await this.reviewModel.findAll({
      limit,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: this.userModel,
          as: "user",
          attributes: ["id", "name"],
        },
        {
          model: this.courseModel,
          as: "course",
          attributes: ["id", "title"],
        },
      ],
      attributes: ["id", "rating", "comment", "createdAt"],
    });

    return result.map((review) => ({
      id: review.id,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
      user: review.user,
      course: review.course,
    }));
  }
}

export default DashboardRepository;
