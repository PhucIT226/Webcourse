import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Order extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "userId", as: "user" });
      this.belongsTo(models.Coupon, { foreignKey: "couponId", as: "coupon" });
      this.hasMany(models.OrderItem, { foreignKey: "orderId", as: "items" });
    }
  }

  Order.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      userId: { type: DataTypes.UUID, allowNull: false },
      couponId: { type: DataTypes.UUID, allowNull: false },
      totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
      status: {
        type: DataTypes.ENUM("pending", "paid", "cancelled", "refunded"),
        allowNull: false,
        defaultValue: "pending",
      },
      paymentMethod: { type: DataTypes.STRING(50), allowNull: true },
      provider: { type: DataTypes.STRING(50), allowNull: true },
      providerPaymentId: { type: DataTypes.STRING(100), allowNull: true },
      paidAt: { type: DataTypes.DATE, allowNull: true },
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "orders",
      timestamps: true,
    }
  );

  return Order;
};
