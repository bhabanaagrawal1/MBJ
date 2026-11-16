import { createTaskByUser,getAllTasksOfUser,fetchSingleTask,updatedTask,deletedTask,knowStatistics } from "../services/task.service.js"
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

const getAllTasks = async (req, res) => {
    const ownerId = req.user;
    const { page, limit, status, priority, sortBy, order } =
        req.validatedQuery;

    const result = await getAllTasksOfUser({
        ownerId,
        page,
        limit,
        status,
        priority,
        sortBy,
        order
    });

    return res.status(200).json({
        message: "Tasks fetched successfully",
        ...result
    });
};

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

const knowStats = async(req,res) => {
    const owner = req.user
    const stats = await knowStatistics(owner)
    return res.status(200).json({
        message: "Statistics of tasks are fetched successfully",
        stats
    })
}

export default { createTask,getAllTasks,getSingleTask,updateTask,deleteTask,knowStats }