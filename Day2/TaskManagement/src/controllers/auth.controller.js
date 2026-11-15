import { getUserRegistered,getUserLogin,findUser } from "../services/auth.service.js";
import ApiError from "../utils/api-error.js";

const registerUser = async (req,res) => {
    const {name,email,password} = req.body;
    if(!name || !email || !password) {
        throw new ApiError(400,"Missing email or password or name")
    }
    const user = await getUserRegistered({name,email,password})
    return res.status(201).json({
        message: "User registered successfully",user
    })
}

const loginUser = async (req,res) => {
    const { email,password } = req.body
    if( !email || !password) {
        throw new ApiError(400, "Missing email or password")
    }
    const user = await getUserLogin({email,password})
    return res.status(200).json({
        messgae: "User logged in successfully",user
    })
}

const getUser = async (req,res) => {
    const user = await findUser(req.user)
    return res.status(200).json({
        message: "User found successfully",
        user
    })
}
/**
Even after the original user logs out, the copied JWT remains valid until its expiration.
This is because JWT authentication is stateless by default. The server doesn't maintain a session or remember whether a particular token has been logged out.
 */
const logoutUser= async (req,res) => {
    return res.status(200).json({
        message: "Logged out successfully"
    });
}

export default {registerUser,loginUser,getUser,logoutUser}