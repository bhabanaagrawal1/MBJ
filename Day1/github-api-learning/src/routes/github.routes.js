import express from "express"
import githubController from "../controllers/github.controller.js"
import validate from "../middleware/validateGithubUsername.js"

// The same Express application/server handles all the feature-specific routers. Each router manages its own group of routes, while controllers handle the request-processing logic.
const router = express.Router()
router.get("/saved-user/:username",validate,githubController.getSavedUser)
router.get("/users/:username",validate,githubController.getRefreshUser)

export default router;