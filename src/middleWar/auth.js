import jwt from "jsonwebtoken";
import userModel from './../DB/models/user.model.js';

export const roles = {
    Admin: "Admin",
    User: "User"
};

const auth = (role = Object.values(roles)) => {
    return async (req, res, next) => {
        const { authorization } = req.headers;
        if (!authorization) {
            return next(new Error("Please login", { cause: 401 }));
        }
        if (!authorization.startsWith("enas__")) {
            return next(new Error("Invalid bearer key", { cause: 404 }));
        }
        const token = authorization.split("enas__")[1];
        if (!token) {
            return next(new Error("Invalid token", { cause: 400 }));
        }
        try {
            const decoded = jwt.verify(token, process.env.TOKEN_SIGNETURE);
            if (!decoded?.id) {
                return next(new Error("Invalid token payload", { cause: 400 }));
            }
            const authUser = await userModel.findById(decoded.id).select("userName email role status");
            if (!authUser) {
                return next(new Error("User not exist", { cause: 404 }));
            }
            if (authUser.status !== "online") {
                return next(new Error("Invalid token, please login", { cause: 400 }));
            }
            if (!role.includes(authUser.role)) {
                return next(new Error("Not authorized", { cause: 401 }));
            }
            req.user = authUser;
            return next();
        } catch (error) {
            return next(new Error("Error verifying token", { cause: 500 }));
        }
    };
};

export default auth;
