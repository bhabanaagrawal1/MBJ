import jwt from "jsonwebtoken"
import config from "../config/config.js";
import ApiError from "../utils/api-error.js";

export const authenticate = async (req,res,next) => {
    // Read the Authorization header
    const authHeader = req.get("Authorization")
    // Check whether it starts with Bearer
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new ApiError(401, "Authentication required"));
    }
    const token = authHeader.split(" ")[1];
    try {
        const verifyToken = jwt.verify(token,config.jwt_secret)
        // Every middleware and controller that executes afterward can access the authenticated user's ID through req.user
        req.user = verifyToken.userId;
        next();
    }catch(error) {
        next(new ApiError(401, "Invalid or expired token"));
    }
}