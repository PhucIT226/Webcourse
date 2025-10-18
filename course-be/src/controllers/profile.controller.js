import db from "../database/models/index.js";

class ProfileController {
  // Lấy profile theo userId
  async getProfile(req, res) {
    try {
      const { userId } = req.params;

      const profile = await db.Profile.findOne({
        where: { userId },
        include: [
          {
            model: db.User,
            as: "user",
            attributes: ["name", "email", "roleId"],
          },
        ],
      });

      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      return res.status(200).json(profile);
    } catch (error) {
      console.error("Get profile error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Cập nhật profile
  async updateProfile(req, res) {
    try {
      const { userId } = req.params;
      const { avatar, bio } = req.body;

      const profile = await db.Profile.findOne({ where: { userId } });
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      await profile.update({ avatar, bio });
      return res.status(200).json(profile);
    } catch (error) {
      console.error("Update profile error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  async getUserCourses(req, res) {
    try {
      const { userId } = req.params;

      // Tìm tất cả order của user
      const orders = await db.Order.findAll({
        where: { userId, paymentStatus: "paid" }, // chỉ lấy đơn đã thanh toán
        include: [
          {
            model: db.OrderItem,
            as: "items",
            include: [
              {
                model: db.Course,
                as: "course",
                attributes: ["id", "title", "price", "thumbnailUrl"],
              },
            ],
          },
        ],
      });

      // Gom tất cả các khoá học từ các order
      const courses = orders.flatMap((order) =>
        order.items.map((item) => item.Course)
      );

      return res.status(200).json(courses);
    } catch (error) {
      console.error("Get user courses error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new ProfileController();
