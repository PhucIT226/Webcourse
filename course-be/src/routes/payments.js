// import express from "express";
// import middlewares from "../middlewares/index.js";
// import paymentController from '../controllers/payment.controller.js';

// const router = express.Router({ mergeParams: true });

// router.get("/", middlewares.auth, middlewares.role("admin", "student"), paymentController.getPaymentsByOrder);
// router.get("/:id", middlewares.auth, middlewares.role("admin", "student"), paymentController.getPaymentById);
// router.post("/", middlewares.auth, middlewares.role("student", "admin"), paymentController.createPayment);
// router.patch("/:id", middlewares.auth, middlewares.role("admin"), paymentController.updatePayment );
// router.delete("/:id", middlewares.auth, middlewares.role("admin"), paymentController.deletePayment);

// export default router;
