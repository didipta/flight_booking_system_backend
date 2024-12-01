"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatus = require("http-status");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const user_model_1 = require("../modules/users/user.model");
const tokenuserget_1 = require("../healper/tokenuserget");
const auth = (...requiredRoles) => async (req, res, next) => {
    try {
        // Get authorization token
        const token = req.headers.authorization;
        // Verify token
        const verifiedUser = await (0, tokenuserget_1.tokenuserget)(token);
        // Role-based access control
        if (requiredRoles.length && !requiredRoles.includes(verifiedUser?.role)) {
            throw new ApiError_1.default(httpStatus.FORBIDDEN || 403, "Forbidden");
        }
        // Check if the user exists using the phone number
        const { emails } = verifiedUser;
        const isUserExist = await user_model_1.User.isUserExist(emails);
        if (!isUserExist) {
            throw new ApiError_1.default(httpStatus.UNAUTHORIZED, "You are not authorized");
        }
        // Proceed to the next middleware
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = auth;
