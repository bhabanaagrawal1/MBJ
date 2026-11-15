import {createTaskByUser,getAllTasksOfUser,fetchSingleTask,updatedTask,deletedTask} from "../services/task.service.js"
import ApiError from "../utils/api-error.js";

const createTask = async (req,res) => {
    const {title,description,status,priority,deadline} = req.body;
    const ownerId = req.user
    const task = await createTaskByUser({title,description,status,priority,deadline,ownerId})
    return res.status(201).json({
        message: "Task created successfully",
        task
    })
}

const getAllTasks = async (req,res) => {
    const ownerId = req.user
    const tasks = await getAllTasksOfUser(ownerId)
    return res.status(200).json({
        message: "All the tasks are fetched successfully",
        tasks
    })
}

const getSingleTask = async (req,res) => {
    const taskId = req.params.id;
    const ownerId = req.user;
    const task = await fetchSingleTask({taskId,ownerId})
    if(!task) {
        throw new ApiError(404,"The task does not exist")
    }
    return res.status(200).json({
        message: "The task is fetched by id successfully",
        task
    })
}

const updateTask = async (req,res) => {
    const taskId = req.params.id;
    const ownerId = req.user;
    const {title, description,status,priority,deadline} = req.body
    const task = await updatedTask({taskId,ownerId,title, description,status,priority,deadline})
    if(!task) {
        return res.status(404).json({
            message: "The task could not be updated",
            task
        })
    }
    return res.status(200).json({
        message: "Task updated successfully",
        task
    })
}

const deleteTask = async(req,res) => {
    const taskId = req.params.id
    const ownerId = req.user
    const task = await deletedTask({taskId,ownerId})
    return res.status(200).json({
        message: "Task deleted successfully",
        task
    })
}

export default { createTask,getAllTasks,getSingleTask,updateTask,deleteTask }