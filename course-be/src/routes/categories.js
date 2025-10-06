// import express from "express";
// import middlewares from "../middlewares/index.js";
// import {
//   getAllCategories,
//   getCategoryById,
//   createCategory,
//   updateCategory,
//   deleteCategory,
// } from "../controllers/category.controller.js";

// const router = express.Router();

// router.get("/", getAllCategories);
// router.get("/:id", getCategoryById);

// // Admin mới tạo, sửa, xóa
// router.post("/", middlewares.auth, middlewares.role("admin"), createCategory);
// router.patch(
//   "/:id",
//   middlewares.auth,
//   middlewares.role("admin"),
//   updateCategory
// );
// router.delete(
//   "/:id",
//   middlewares.auth,
//   middlewares.role("admin"),
//   deleteCategory
// );

// export default router;
