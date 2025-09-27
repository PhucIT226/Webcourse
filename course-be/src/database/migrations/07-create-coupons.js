export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("coupons", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    code: {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true
    },
    type: { type: Sequelize.ENUM("percent", "amount"), allowNull: false },
    value: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
    usageCount: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    maxUsage: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    validFrom: { type: Sequelize.DATE, allowNull: true },
    validTo: { type: Sequelize.DATE, allowNull: true },
    minOrderValue: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
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
  await queryInterface.dropTable("coupons");
}
