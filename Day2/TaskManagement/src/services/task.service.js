import taskModel from "../models/task.model.js"
import ApiError from "../utils/api-error.js"

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

export const getAllTasksOfUser = async(ownerId) => {
    // find(): It searches for all documents matching the given condition.
    // Searching for all tasks whose owner matches ownerId
    const tasks = await taskModel.find({ owner: ownerId });
    return tasks
}

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