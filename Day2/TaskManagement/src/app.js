import express from "express"
import authRouter from "./routes/auth.routes.js"
import errorHandler from "./middleware/errorHandling.js"

const app = express()
app.use(express.json())
app.use("/api/auth",authRouter)
app.use(errorHandler)

export default app