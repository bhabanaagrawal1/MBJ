import mongoose from "mongoose";

const githubSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    avatar_url: {
        type: String,
    },
    followers: {
        type: Number,
        required: true,
    },
    following: {
        type: Number,
        required: true,
    },
    public_repos: {
        type: Number,
        required: true,
    },
    lastFetchedAt: {
        type: Date,
        default: Date.now
    },
})
/**
Mongoose:
1. Creates a model using your schema.
2. Associates it with a MongoDB collection.
3. Provides methods to create, read, update and delete documents.

Mongoose uses the GithubUser model and its schema to create a document in the MongoDB githubusers collection.
One more thing: MongoDB automatically generates an _id for every document.
 */
const GithubUser = mongoose.model("GitHubSchema",githubSchema)
export default GithubUser;