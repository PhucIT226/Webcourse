import express from "express";
import middlewares from "../middlewares/index.js";
import {
  getPaymentsByOrder,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
} from "../controllers/payments.js";

const router = express.Router({ mergeParams: true });

// Lấy danh sách payment của 1 order
router.get("/", middlewares.auth, middlewares.role.allowRoles("admin", "student"), getPaymentsByOrder);

// Lấy chi tiết 1 payment
router.get("/:id", middlewares.auth, middlewares.role.allowRoles("admin", "student"), getPaymentById);

// Tạo payment mới (user tự thanh toán order của mình)
router.post("/", middlewares.auth, middlewares.role.allowRoles("student", "admin"), createPayment);

// Cập nhật payment (vd: admin xác nhận, webhook provider callback)
router.patch("/:id", middlewares.auth, middlewares.role.allowRoles("admin"), updatePayment );

// Xóa payment (chỉ admin, thường để rollback/test)
router.delete("/:id", middlewares.auth, middlewares.role.allowRoles("admin"), deletePayment);

export default router;
