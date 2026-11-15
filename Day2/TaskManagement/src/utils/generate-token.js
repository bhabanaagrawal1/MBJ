import config from "../config/config.js"
import jwt from "jsonwebtoken"

const generateToken = (userId) => {
    return jwt.sign({ userId },config.jwt_secret,{expiresIn: config.expiresIn})
}

export default generateToken