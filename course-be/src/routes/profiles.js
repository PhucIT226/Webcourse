import express from "express";
import profileController from "../controllers/profile.controller.js";

const router = express.Router();

// Lấy profile theo userId
router.get("/:userId", profileController.getProfile);

// Cập nhật profile theo userId
router.put("/:userId", profileController.updateProfile);

router.get("/:userId", profileController.getUserCourses);
export default router;
