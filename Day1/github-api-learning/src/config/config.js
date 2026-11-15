import dotenv from "dotenv"
// Load the environment variables
dotenv.config();

const config = {
    port: process.env.PORT || 3000,
    github_token: process.env.GITHUB_TOKEN,
    mongodb_uri: process.env.MONGODB_URI,
}

export default config;