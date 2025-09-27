import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class User extends Model {
    static associate(models) {
      this.belongsTo(models.Role, { foreignKey: "roleId", as: "role" });
      this.hasOne(models.Profile, { foreignKey: "userId", as: "profile" });
      this.hasMany(models.Course, { foreignKey: "instructorId", as: "coursesTaught" });
      this.hasMany(models.Order, { foreignKey: "userId", as: "orders" });
      this.hasMany(models.Review, { foreignKey: "userId", as: "reviews" });
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Auto-generates a UUID
        primaryKey: true,
        allowNull: false,
      },
      name: { type: DataTypes.STRING(100), allowNull: false },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      passwordHash: { type: DataTypes.STRING(255), allowNull: false },
      avatarUrl: { type: DataTypes.STRING(500), allowNull: true },
      roleId: { type: DataTypes.UUID, allowNull: false },
    },
    {
      sequelize, // truyền kết nối
      modelName: "User", // tên model
      tableName: "users",
      timestamps: true,
      // 👇 This hides passwordHash from queries by default
      defaultScope: {
        attributes: { exclude: ["passwordHash"] },
      },
      // Optional: allow an "includeSensitive" scope if you need the password
      scopes: {
        withPassword: {
          attributes: {},
        },
      },
    }
  );

  return User;
};
