import {fetchGithubUser,fetchSavedUser} from "../services/github.service.js"
import ApiError from "../utils/apierror.js";

const SIX_HOURS = 6 * 60 * 60 * 1000;
const getRefreshUser = async (req,res,next) => {
    try {
        const username = req.params.username;
        if(!username) {
            throw new ApiError(400,"GitHub Username is required")
        }
        const refresh = req.query.refresh === "true"
        let user;
        if(refresh) {
            user = await fetchGithubUser(username);
        }else {
            user = await fetchSavedUser(username);
            if(!user || !user.lastFetchedAt || Date.now() - user.lastFetchedAt.getTime() >= SIX_HOURS) {
               user = await fetchGithubUser(username); 
            }
        }
        return res.status(200).json({
            success: true,
            message: "GitHub profile retrieved successfully",
            user
        });
    }catch(error) {
        next(error);
    }
}

const getSavedUser = async (req,res,next) => {
    try {
        const username = req.params.username;
        if(!username) {
            throw new ApiError(400,"GitHub username is required")
        }

        const user = await fetchSavedUser(username);
        if(!user) {
            throw new ApiError(404, "Saved GitHub user not found");
        }

        return res.status(200).json({
            success: true,
            message: "Saved GitHub profile retrieved successfully",
            user
        });
    }catch(error) {
        next(error);
    }
}


export default {getSavedUser,getRefreshUser}