import taskModel from "../models/task.model.js"
import ApiError from "../utils/api-error.js"
import mongoose from "mongoose"

export const createTaskByUser = async ({title,description,status,priority,deadline,ownerId}) => {
    const task = await taskModel.create({
        title: title,
        description: description,
        status: status,
        priority: priority,
        deadline: deadline,
        owner: ownerId,
    })
    return task
}

// Get tasks with filtering, sorting and pagination
export const getAllTasksOfUser = async ({
    ownerId,
    page = 1,
    limit = 10,
    status,
    priority,
    sortBy = "createdAt",
    order = "desc"
}) => {
    const filters = {owner: ownerId};
    if (status !== undefined) {
        filters.status = status;
    }
    if (priority !== undefined) {
        filters.priority = priority;
    }
    const skip = (page - 1) * limit;
    const sortOptions = {[sortBy]: order === "asc" ? 1 : -1};
    const [tasks, totalTasks] = await Promise.all([
        taskModel.find(filters)
            .sort(sortOptions)
            .skip(skip)
            .limit(limit),
        taskModel.countDocuments(filters)
    ]);
    const totalPages = Math.ceil(totalTasks / limit);
    return {
        tasks,
        pagination: {
            currentPage: page,
            limit,
            totalTasks,
            totalPages
        }
    };
};

export const fetchSingleTask = async({taskId,ownerId}) => {
    const task = await taskModel.findOne({
        _id: taskId,
        owner: ownerId,
    });
    return task
}

export const updatedTask = async ({taskId,ownerId,title, description,status,priority,deadline}) => {
    const updatedData = {}
    if(title !== undefined) {
        updatedData.title = title
    }
    if(description !== undefined){
        updatedData.description = description
    }
    if(status !== undefined) {
        updatedData.status = status
    }
    if(priority !== undefined) {
        updatedData.priority = priority
    }
    if(deadline !== undefined) {
        updatedData.deadline = deadline
    }
    // Check whether the update object is empty
    /**
    console.log(Object.keys(updatedData));        // ["status"]
    console.log(Object.keys(updatedData).length); // 1
     */
    if (Object.keys(updatedData).length === 0) {
        throw new ApiError(400, "No data provided to update");
    }
    const task = await taskModel.findOneAndUpdate({
        _id: taskId,
        owner: ownerId,
    },updatedData, {
        new: true,
        runValidators: true,
    })
    if(!task) {
        throw new ApiError(404,"Task not found")
    }
    return task
}

export const deletedTask = async ({taskId,ownerId}) => {
    const task = await taskModel.findOneAndDelete({
        _id: taskId,
        owner: ownerId,
    })
    if(!task) {
        throw new ApiError(404,"Task not found")
    }
    return task
}

export const knowStatistics = async(ownerId) => {
    if (!mongoose.isValidObjectId(ownerId)) {
        throw new ApiError(400, "Invalid user ID");
    }
    const stats = await taskModel.aggregate([
        { $match: { owner: new mongoose.Types.ObjectId(ownerId) }},
        { $group: {
            _id: null,
            totalTasks: { $sum: 1 },
            pendingTasks: { $sum: { $cond: [{ $eq: ["$status", "PENDING"] }, 1, 0] }},
            inProgressTasks: { $sum: { $cond: [{ $eq: ["$status", "IN_PROGRESS"] }, 1, 0] }},
            completedTasks: { $sum: { $cond: [{ $eq: ["$status", "COMPLETED"] }, 1, 0] }},
            highPriorityTasks: { $sum: { $cond: [{ $eq: ["$priority", "HIGH"]},1,0] }},
            mediumPriorityTasks: { $sum: { $cond: [{ $eq: ["$priority","MEDIUM"]},1,0]}},
            lowPriorityTasks: { $sum: { $cond: [{ $eq: ["$priority","LOW"]},1,0]}},
            overdueTasks: { $sum: { $cond: [{$and: [{ $lt: ["$deadline", new Date()] },{ $ne: ["$status", "COMPLETED"] }]},1,0]}}
        }}
    ])
    const { _id, ...result } = stats[0];
    return result || { totalTasks: 0, pendingTasks: 0, inProgressTasks: 0, completedTasks: 0, lowPriorityTasks: 0, mediumPriorityTasks: 0, highPriorityTasks: 0, overdueTasks: 0 };
}