import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import taskController from "../controllers/task.controller.js";
import validate from "../middleware/validate.middleware.js";
import { createTaskSchema,updateTaskSchema,paginateSchema } from "../middleware/task.validation.js";

const router = express.Router();
router.post("/",authenticate,validate(createTaskSchema),taskController.createTask)
router.get("/",authenticate,validate(paginateSchema, "query"),taskController.getAllTasks)
router.get("/stats",authenticate,taskController.knowStats)
router.get("/:id",authenticate,taskController.getSingleTask)
router.patch("/:id",authenticate,validate(updateTaskSchema),taskController.updateTask)
router.delete("/:id",authenticate,taskController.deleteTask)

export default router