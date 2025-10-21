import db from "../database/models/index.js";
import { Op } from "sequelize";

class SearchRepository {
  async searchAll(query) {
    if (!query) return [];

    const users = await db.User.findAll({
      where: { name: { [Op.like]: `%${query}%` } },
      limit: 5,
    });

    const courses = await db.Course.findAll({
      where: { title: { [Op.like]: `%${query}%` } },
      limit: 5,
    });

    const orders = await db.Order.findAll({
      where: { code: { [Op.like]: `%${query}%` } },
      limit: 5,
    });

    return [
      ...users.map((u) => ({ type: "User", ...u.dataValues })),
      ...courses.map((c) => ({ type: "Course", ...c.dataValues })),
      ...orders.map((o) => ({ type: "Order", ...o.dataValues })),
    ];
  }
}

export default SearchRepository;
