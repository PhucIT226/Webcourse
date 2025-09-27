export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("orders", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
    },
    couponId: {
      type: Sequelize.UUID,
      allowNull: true,
      references: { model: "coupons", key: "id" },
      onDelete: "SET NULL",
    },
    totalAmount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    status: {
      type: Sequelize.ENUM("pending", "paid", "cancelled", "refunded"),
      allowNull: false,
      defaultValue: "pending",
    },
    paymentMethod: { type: Sequelize.STRING(50), allowNull: true},
    provider: { type: Sequelize.STRING(50), allowNull: true },
    providerPaymentId: { type: Sequelize.STRING(100), allowNull: true },
    paidAt: { type: Sequelize.DATE, allowNull: true },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
    },
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable("orders");
}
