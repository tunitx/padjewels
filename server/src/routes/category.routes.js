import { Router } from "express";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategory,
} from "../controllers/category.controller.js";

const router = Router();

router.post("/create", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);
router.get("/all", getAllCategory);

export default router;
