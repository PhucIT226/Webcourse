import db from "../database/models/index.js";
import { v4 as uuidv4 } from "uuid";
import { Op } from "sequelize";

class OrderRepository {
  constructor() {
    this.model = db.Order;
    this.userModel = db.User;
    this.itemModel = db.OrderItem;
    this.courseModel = db.Course;
  }

  // Lấy tất cả đơn hàng (admin hoặc lọc theo userId)
  async getAllOrders({
    page = 1, 
    pageSize = 10, 
    search, 
    paymentStatus, 
    userId 
  }) {
    const where = {};

    if (search) {
      where[Op.or] = [
        { id: { [Op.like]: `%${search}%` } },
        { "$user.name$": { [Op.like]: `%${search}%` } },
      ];
    }

    if (paymentStatus) where.paymentStatus = paymentStatus;
    if (userId) where.userId = userId; // <-- filter theo userId nếu có

    const { count, rows } = await this.model.findAndCountAll({
      where,
      offset: (page - 1) * pageSize,
      limit: +pageSize,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: this.userModel,
          as: "user",
          attributes: ["id", "name", "email"],
        },
        {
          model: this.itemModel,
          as: "items",
          include: [
            {
              model: this.courseModel,
              as: "course",
              attributes: ["id", "title", "price"],
            },
          ],
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

  async getOrderById(id) {
    return this.model.findByPk(id, {
      include: [
        { model: this.userModel, as: "user", attributes: ["id", "name", "email"] },
        {
          model: this.itemModel,
          as: "items",
          include: [{ model: this.courseModel, as: "course", attributes: ["id", "title", "price"] }],
        },
      ],
    });
  }

  async getUserOrders(userId) {
    return this.model.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: this.itemModel,
          as: "items",
          include: [{ model: this.courseModel, as: "course" }],
        },
      ],
    });
  }

  async createOrder(orderData) {
    const orderId = uuidv4();

    const order = await this.model.create({
      id: orderId,
      userId: orderData.userId,
      totalAmount: orderData.totalAmount,
      paymentMethod: orderData.paymentMethod || null,
      paymentStatus: orderData.paymentStatus || "unpaid",
      note: orderData.note || null,
    });

    return this.getOrderById(orderId);
  }

  async updateOrder(id, data) {
    const order = await this.model.findByPk(id);
    if (!order) return null;
    await order.update(data);
    return this.getOrderById(id);
  }

  async deleteOrder(id) {
    const order = await this.model.findByPk(id);
    if (!order) return false;
    await order.destroy();
    return true;
  }
}

export default OrderRepository;
