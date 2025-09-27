import { v4 as uuidv4 } from "uuid";

export async function up(queryInterface, Sequelize) {
  const now = new Date();

  const categories = [
    { id: uuidv4(), name: "Web Development", slug: "web-development", parentId: null, createdAt: now, updatedAt: now },
    { id: uuidv4(), name: "Mobile App Development", slug: "mobile-app-development", parentId: null, createdAt: now, updatedAt: now },
    { id: uuidv4(), name: "Data Science", slug: "data-science", parentId: null, createdAt: now, updatedAt: now },
    { id: uuidv4(), name: "AI & Machine Learning", slug: "ai-ml", parentId: null, createdAt: now, updatedAt: now },
    { id: uuidv4(), name: "DevOps & Cloud", slug: "devops-cloud", parentId: null, createdAt: now, updatedAt: now },
    { id: uuidv4(), name: "Cybersecurity", slug: "cybersecurity", parentId: null, createdAt: now, updatedAt: now },
  ];

  await queryInterface.bulkInsert("categories", categories, {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete("categories", null, {});
}
