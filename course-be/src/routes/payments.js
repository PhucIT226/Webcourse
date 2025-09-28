// import express from "express";
// import middlewares from "../middlewares/index.js";
// import {
//   getPaymentsByOrder,
//   getPaymentById,
//   createPayment,
//   updatePayment,
//   deletePayment,
// } from "../controllers/payment.controller.js";

// const router = express.Router({ mergeParams: true });

// // Lấy danh sách payment của 1 order
// router.get("/", middlewares.auth, middlewares.role("admin", "student"), getPaymentsByOrder);

// // Lấy chi tiết 1 payment
// router.get("/:id", middlewares.auth, middlewares.role("admin", "student"), getPaymentById);

// // Tạo payment mới (user tự thanh toán order của mình)
// router.post("/", middlewares.auth, middlewares.role("student", "admin"), createPayment);

// // Cập nhật payment (vd: admin xác nhận, webhook provider callback)
// router.patch("/:id", middlewares.auth, middlewares.role("admin"), updatePayment );

// // Xóa payment (chỉ admin, thường để rollback/test)
// router.delete("/:id", middlewares.auth, middlewares.role("admin"), deletePayment);

// export default router;
