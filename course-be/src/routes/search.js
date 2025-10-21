import express from "express";
import searchController from "../controllers/search.controller.js";
import middlewares from "../middlewares/index.js";

const router = express.Router();

// Chỉ admin được search
router.get("/", middlewares.auth, middlewares.role("admin"), searchController.searchAll);

export default router;
