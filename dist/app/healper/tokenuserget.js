"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenuserget = void 0;
const config_1 = __importDefault(require("../../config"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const http_status_1 = require("./http.status");
const jwtHelpers_1 = require("./jwtHelpers");
const tokenuserget = async (token) => {
    if (!token) {
        throw new ApiError_1.default(http_status_1.httpStatus.UNAUTHORIZED, "You are not authorized");
    }
    let verifiedidUser = null;
    verifiedidUser = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt_secret);
    return verifiedidUser;
};
exports.tokenuserget = tokenuserget;
