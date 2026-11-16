const validate = (schema, source = "body") => {
    return (req, res, next) => {
        const result = schema.safeParse(req[source]);
        if (!result.success) {
            return res.status(400).json({
                message: "Validation Failed",
                errors: result.error.issues.map(issue => ({
                    field: issue.path.join("."),
                    message: issue.message
                }))
            });
        }
        if (source === "query") {
            req.validatedQuery = result.data;
        } else {
            req[source] = result.data;
        }
        next();
    };
};

export default validate;