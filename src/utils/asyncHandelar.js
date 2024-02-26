export const asyncHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(error => {
            return next(error); // Remove new Error() wrapping
        });
    };
};

export const globalError = (error, req, res, next) => {
    const validationResult = req.validationResult;
    if (validationResult) {
        if (process.env.MOOD == "DEV") {
            return res.status(error.cause || 500).json({ message: error.message, stack: error.stack });
        }
    }
    return res.status(error.cause || 500).json({ message: error.message });
};
