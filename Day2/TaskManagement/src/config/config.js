import dotenv from "dotenv"
dotenv.config();

const config = {
    port: process.env.PORT || 3000,
    database_uri: process.env.DATABASE_URI,
    jwt_secret: process.env.JWT_SECRET,
    jwt_expires_in: process.env.JWT_EXPIRES_IN,
    node_env: process.env.NODE_ENV,
}

export default config