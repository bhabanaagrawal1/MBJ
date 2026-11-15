import express from "express"
import authController from "../controllers/auth.controller.js"
import { registerSchema } from "../middleware/auth-validate-register.js"
import validate from "../middleware/validate.middleware.js"
import { loginSchema } from "../middleware/auth-validate-login.js"
import { authenticate } from "../middleware/authenticate.js"

const router = express.Router()
router.post("/register",validate(registerSchema),authController.registerUser)
router.post("/login",validate(loginSchema),authController.loginUser)
router.get("/me",authenticate,authController.getUser)
router.get("/logout",authenticate,authController.logoutUser)

export default router