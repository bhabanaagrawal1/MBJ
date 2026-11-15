import app from "./app.js";
import config from "./config/config.js";
import connectDB from "./config/db.js";

const port = config.port
await connectDB();
app.listen(port,()=>{
    console.log(`App is running on port ${port}`)
})