import ApiError from "../utils/apierror.js";

const validate = (req,res,next) => {
    const username = req.params.username
    console.log("Validation middleware executed:", username);
    if(!username){
        return next(new ApiError(400, "GitHub username is required"));
    }
    const pattern = /^[a-zA-Z0-9-]+$/;
    if(!pattern.test(username)) {
        return next(new ApiError(400, "Invalid GitHub username"));
    }
    if(username.length > 39) {
        return next(new ApiError(400,"Username cannot exceed 39 characters"))
    }
    if(username.startsWith("-")){
        return next(new ApiError(400,"Username cannot start with a hyphen"))
    }
    if(username.endsWith("-")){
        return next(new ApiError(400,"Username cannot end with a hyphen"))
    }
    if(username.includes("--")){
        return next(new ApiError(400,"Username cannot contain consecutive hyphens"))
    }
    next()
}

export default validate