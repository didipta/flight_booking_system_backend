"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = require("../../healper/http.status");
const jwtHelpers_1 = require("../../healper/jwtHelpers");
const user_model_1 = require("../users/user.model");
const loginuser = async (payload) => {
    const { email, password } = payload;
    const isuserExist = await user_model_1.User.isUserExist(email);
    if (!isuserExist) {
        throw new ApiError_1.default(http_status_1.httpStatus.NOT_FOUND || 404, "User does not exist");
    }
    if (isuserExist.password &&
        !(await user_model_1.User.isPasswordMatched(password, isuserExist.password))) {
        throw new ApiError_1.default(http_status_1.httpStatus.UNAUTHORIZED || 401, "Password is incorrect");
    }
    const { email: emails, role, _id: id } = isuserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ emails, role, id }, config_1.default.jwt_secret, config_1.default.jwt_expire_time);
    return {
        accessToken,
    };
};
const getmyprofile = async (email) => {
    const result = await user_model_1.User.findOne({ email });
    return result;
};
exports.authService = {
    loginuser,
    getmyprofile,
};
