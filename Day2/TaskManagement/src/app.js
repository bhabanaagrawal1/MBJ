import express from "express"
import authRouter from "./routes/auth.routes.js"
import taskRouter from "./routes/task.routes.js"
import errorHandler from "./middleware/errorHandling.js"

const app = express()
app.use(express.json())
app.use("/api/auth",authRouter)
app.use("/api/tasks",taskRouter)
app.use(errorHandler)

export default app