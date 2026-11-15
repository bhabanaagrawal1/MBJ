import config from "../config/config.js"
import ApiError from "../utils/apierror.js"
import githubModel from "../models/github.model.js"

export const fetchSavedUser = async (username) => {
    console.log("Fetching data from MongoDB...");
    const user = await githubModel.findOne({ login: username })
    return user
}

export const fetchGithubUser = async (username) => {
    console.log("Fetching data from GitHub API...");
    const url = `https://api.github.com/users/${username}`
    const response = await fetch(url,{
        // authentication provides a higher API rate limit and allows access to additional resources when the token has the necessary permissions.
        headers: {
            Authorization: `Bearer ${config.github_token}`,
            Accept: "application/vnd.github+json"
        }
    })
    if(!response.ok) {
        if(response.status === 404) {
            throw new ApiError(404, "GitHub user not found");
        }else if (response.status === 403) {
            // Rate limit exceeded or access forbidden
            throw new ApiError(403, "Rate limit exceeded or access forbidden")
        }else if (response.status === 401) {
            // Authentication failed
            throw new ApiError(401, "Invalid or missing authentication")
        }else {
            // Other GitHub API errors
            throw new ApiError(500, "GitHub server error")
        }
    }
    const data = await response.json();
    /**
    Option	           Purpose
    upsert: true	Insert if no matching document exists
    returnDocument: "after"	Return the updated document
    runValidators: true	Run schema validators during the update
     */
    const savedUser = await githubModel.findOneAndUpdate(
        { login: username },
        {
            login: username,
            name: data.name,
            avatar_url: data.avatar_url,
            followers: data.followers,
            following: data.following,
            public_repos: data.public_repos,
            lastFetchedAt: new Date(),
        },
        {
            upsert: true,
            returnDocument: "after",
            runValidators: true
        }
    );
    return savedUser;
}