import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
    try {
        await mongoose.connect(config.database_uri)
        console.log("MongoDB connection successful!")
    }catch(error) {
        console.log("MongoDB connection failed: ",error.message)
        process.exit(1)
    }
}

export default connectDB