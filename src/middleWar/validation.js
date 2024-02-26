import { Types } from "mongoose";

export const validation = (schema) => {
    return (req, res, next) => {
        try {
            let methods;
            if (req.headers.authorization) {
                methods = { ...req.body, ...req.query, ...req.params, authorization: req.headers.authorization }
              } else {
                methods = { ...req.body, ...req.query, ...req.params };
            }

            if (req.file) {
                methods = { ...methods, file: req.file };
            }

            if (req.files) {
                methods = { ...methods, files: req.files };
            }

            const validationResult = schema.validate(methods, { abortEarly: false });

            if (validationResult?.error) {
                return res.status(403).json({
                    message: "Validation error",
                    errors: validationResult.error.details.map((error) => error.message),
                });
            }

            return next();
        } catch (error) {
            return res.status(500).json({
                message: error.message,
                stack: error.stack,
            });
        }
    };
};


export const idValidation = (value, helper) => {
    return Types.ObjectId.isValid(value) ? true : helper.message('invalid id');
}