import express from "express"
import githubRoutes from "./src/routes/github.routes.js"
import errorHandler from "./src/middleware/error.middleware.js";

// Creates the main Express application
const app = express()
// This middleware allows Express to parse incoming JSON request bodies and makes the parsed data available through req.body.
app.use(express.json());
// Whenever an incoming request starts with /api/github, pass it to githubRoutes to handle.
app.use("/api/github",githubRoutes)
// Always register error-handling middleware after routes
app.use(errorHandler)

export default app;