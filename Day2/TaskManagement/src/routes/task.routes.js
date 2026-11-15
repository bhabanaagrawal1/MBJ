import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import taskController from "../controllers/task.controller.js";
import validate from "../middleware/validate.middleware.js";
import { createTaskSchema,updateTaskSchema } from "../middleware/task.validation.js";

const router = express();
router.post("/",authenticate,validate(createTaskSchema),taskController.createTask)
router.get("/",authenticate,taskController.getAllTasks)
router.get("/:id",authenticate,taskController.getSingleTask)
router.patch("/:id",authenticate,validate(updateTaskSchema),taskController.updateTask)
router.patch("/:id",authenticate,taskController.deleteTask)

export default router