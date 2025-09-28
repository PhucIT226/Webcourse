import AppConfig from "../../config/index.js";
import Sequelize from "sequelize";

import userModel from "./user.model.js";
import profileModel from "./profile.model.js";
import categoryModel from "./category.model.js";
import courseModel from "./course.model.js";
import orderModel from "./order.model.js";
import orderItemModel from "./orderItem.model.js";
import paymentModel from "./payment.model.js";
import roleModel from "./role.model.js";
import couponModel from "./coupon.model.js";
import reviewModel from "./review.model.js";
import lessonModel from "./lesson.model.js";
import enrollmentModel from "./enrollment.model.js";
import certificateModel from "./certificate.model.js";

const sequelize = new Sequelize(AppConfig.database.url, {
  dialect: AppConfig.database.dialect, // ✅ Rất quan trọng!
  pool: AppConfig.database.pool,
});

const db = {
  sequelize,
  User: userModel(sequelize),
  Profile: profileModel(sequelize),
  Category: categoryModel(sequelize),
  Course: courseModel(sequelize),
  Order: orderModel(sequelize),
  OrderItem: orderItemModel(sequelize),
  Payment: paymentModel(sequelize),
  Role: roleModel(sequelize),
  Coupon: couponModel(sequelize),
  Review: reviewModel(sequelize),
  Lesson: lessonModel(sequelize),
  Enrollment: enrollmentModel(sequelize),
  Certificate: certificateModel(sequelize),
  
};

// Gọi associate cho tất cả models
Object.values(db).forEach((model) => {
  if (model?.associate) {
    model.associate(db);
  }
});

export default db;
