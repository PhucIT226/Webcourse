import express from "express";
import middlewares from "../middlewares/index.js";
import dashboardController from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get(
  "/summary",
  middlewares.auth,
  middlewares.role("admin"),
  dashboardController.getSummary
);

router.get(
  "/revenue",
  middlewares.auth,
  middlewares.role("admin"),
  dashboardController.getRevenueStats
);

router.get(
  "/top-courses",
  middlewares.auth,
  middlewares.role("admin"),
  dashboardController.getTopCourses
);

router.get(
  "/recent-orders",
  middlewares.auth,
  middlewares.role("admin"),
  dashboardController.getRecentOrders
);

router.get(
  "/recent-reviews",
  middlewares.auth,
  middlewares.role("admin"),
  dashboardController.getRecentReviews
);

export default router;
