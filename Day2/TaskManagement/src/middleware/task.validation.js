
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
