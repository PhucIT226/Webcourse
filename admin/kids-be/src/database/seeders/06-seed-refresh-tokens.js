import { v4 as uuidv4 } from "uuid";

export async function up(queryInterface, Sequelize) {
  const now = new Date();
  const users = await queryInterface.sequelize.query(
    `SELECT id FROM users LIMIT 5`,
    { type: Sequelize.QueryTypes.SELECT }
  );

  const rows = users.map((u) => ({
    id: uuidv4(),
    userId: u.id,
    token: uuidv4(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // +30 ngày
    createdAt: now,
    updatedAt: now,
  }));

  await queryInterface.bulkInsert("refresh_tokens", rows, {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete("refresh_tokens", null, {});
}
