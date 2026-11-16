import config from "../config/config";

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    const message =
        statusCode === 500 && config.node_env === "production"
            ? "Internal Server Error"
            : err.message || "Something went wrong";

    return res.status(statusCode).json({
        success: false,
        message
    });
};

export default errorHandler;