"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authColtroller = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const auth_service_1 = require("./auth.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = require("../../healper/http.status");
const tokenuserget_1 = require("../../healper/tokenuserget");
const loginuser = (0, catchAsync_1.default)(async (req, res, next) => {
    try {
        const { ...loginData } = req.body;
        const result = await auth_service_1.authService.loginuser(loginData);
        const { ...others } = result;
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "User lohggedin successfully !",
            data: others,
        });
    }
    catch (error) {
        next(error);
    }
});
const getauthUser = (0, catchAsync_1.default)(async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        console.log(token);
        const { emails } = await (0, tokenuserget_1.tokenuserget)(token);
        console.log(emails);
        const user = await auth_service_1.authService.getmyprofile(emails);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.httpStatus.OK || 200,
            success: true,
            message: "User fetched successfully",
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.authColtroller = {
    loginuser,
    getauthUser,
};
