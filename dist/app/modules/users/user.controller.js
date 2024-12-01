"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const httpStatus = require("http-status");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const user_service_1 = require("./user.service");
const createUser = (0, catchAsync_1.default)(async (req, res, next) => {
    try {
        const user = req.body;
        const result = await user_service_1.UserService.createUser(user);
        return (0, sendResponse_1.default)(res, {
            statusCode: httpStatus.OK || 200,
            success: true,
            message: "User created successfully!",
            data: result,
        });
    }
    catch (error) {
        next(error); // Pass error to global error handler
    }
});
exports.UserController = {
    createUser,
};
