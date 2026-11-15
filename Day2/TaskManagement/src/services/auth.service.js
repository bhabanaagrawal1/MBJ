import userModel from "../models/user.model.js";
import bcrypt from "bcrypt"
import ApiError from "../utils/api-error.js";
import generateToken from "../utils/generate-token.js";

export const getUserRegistered = async ({ name,email,password }) =>{
    try {
        const normalizedEmail = email.trim().toLowerCase();
        const existingUser = await userModel.findOne({ email: normalizedEmail })
        if(existingUser) {
            throw new ApiError(409, "The user with this email already exist")
        }
        const hashedPassword = await bcrypt.hash(password,12);
        const user = await userModel.create(
            { 
                name: name.trim(),
                email: normalizedEmail,
                password: hashedPassword,
            }
        )
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
        }
    }catch (error) {
        if(error.code === 11000){
            throw new ApiError(409, "Email already registered")
        }
        throw error;
    }
}

export const getUserLogin = async ({email,password}) => {
    try {
        const normalizedEmail = email.trim().toLowerCase();
        const user = await userModel.findOne({email: normalizedEmail})
        if(!user) {
            throw new ApiError(401,"Invalid email or password")
        }
        const storedHash = user.password
        const isPasswordValid = await bcrypt.compare(password,storedHash)
        if(!isPasswordValid) {
            throw new ApiError(401,"Invalid email or password")
        }
        const token = generateToken(user._id)
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
            createdAt: user.createdAt,
        }
    }catch(error) {
        throw error
    }
}

export const findUser = async (userId) => {
    const user = await userModel.findById(userId)
    if(!user) {
        throw new ApiError(404,"User does not exist")
    }
    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
    }
}