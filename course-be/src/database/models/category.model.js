import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Category extends Model {
    static associate(models) {
      this.hasMany(models.Course, { foreignKey: "categoryId", as: "courses" });

      // Self-relation: 1 Category có thể có nhiều sub-categories
      this.hasMany(models.Category, { foreignKey: "parentId", as: "subCategories" });

      // Sub-category thuộc về 1 parent category
      this.belongsTo(models.Category, { foreignKey: "parentId", as: "parentCategory" });
    }
  }

  Category.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: { type: DataTypes.STRING(150), allowNull: false },
      slug: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
      },
      parentId: { type: DataTypes.UUID, allowNull: true },
    },
    {
      sequelize,
      modelName: "Category",
      tableName: "categories",
      timestamps: true,
     }
  );

  return Category;
};
