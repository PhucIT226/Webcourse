import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";

export async function up(queryInterface, Sequelize) {
  const now = new Date();

  // Lấy users, courses, coupons từ DB
  const users = await queryInterface.sequelize.query(
    `SELECT id FROM users`,
    { type: Sequelize.QueryTypes.SELECT }
  );
  const courses = await queryInterface.sequelize.query(
    `SELECT id, price FROM courses`,
    { type: Sequelize.QueryTypes.SELECT }
  );
  const coupons = await queryInterface.sequelize.query(
    `SELECT id FROM coupons`,
    { type: Sequelize.QueryTypes.SELECT }
  );

  const orders = [];
  const orderItems = [];

  for (let i = 0; i < 15; i++) {
    const orderId = uuidv4();
    const user = faker.helpers.arrayElement(users);
    const status = faker.helpers.arrayElement([
      "pending",
      "paid",
      "cancelled",
      "refunded",
    ]);

    let totalAmount = 0;

    // Mỗi đơn 1-3 khóa học, không trùng nhau
    const itemCount = faker.number.int({ min: 1, max: 3 });
    const selectedCourses = faker.helpers.arrayElements(courses, itemCount);

    selectedCourses.forEach((course) => {
      const price = Number(course.price);
      const quantity = 1;
      totalAmount += price * quantity;

      orderItems.push({
        id: uuidv4(),
        orderId,
        courseId: course.id,
        price,
        quantity,
        discount: 0,
        createdAt: now,
        updatedAt: now,
      });
    });

    // Random coupon hoặc null
    const coupon = faker.helpers.arrayElement([...coupons, null]);
    const couponId = coupon ? coupon.id : null;

    orders.push({
      id: orderId,
      userId: user.id,
      couponId,
      totalAmount: Number(totalAmount.toFixed(2)),
      status,
      createdAt: now,
      updatedAt: now,
    });
  }

  await queryInterface.bulkInsert("orders", orders, {});
  await queryInterface.bulkInsert("order_items", orderItems, {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete("order_items", null, {});
  await queryInterface.bulkDelete("orders", null, {});
}
