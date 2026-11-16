
import { z } from "zod";

// Validation schema for creating a task
export const createTaskSchema = z.object({
    title: z.string()
        .trim()
        .min(1, "Title is required"),

    description: z.string()
        .optional(),

    status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"])
        .default("PENDING"),

    priority: z.enum(["LOW", "MEDIUM", "HIGH"])
        .default("MEDIUM"),

    deadline: z.coerce.date({
        error: "A valid deadline is required"
    }),
});

// Validation schema for updating a task
export const updateTaskSchema = createTaskSchema
    .partial()
    .refine(
        (data) => Object.keys(data).length > 0,
        {
            message: "At least one field must be provided for updating"
        }
    );

export const paginateSchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]).optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
    sortBy: z.enum([
        "deadline",
        "createdAt",
        "title",
        "priority",
        "status"
    ]).default("createdAt"),
    order: z.enum(["asc", "desc"]).default("desc")
});