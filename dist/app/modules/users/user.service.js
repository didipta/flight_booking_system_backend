"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = require("./user.model");
const createUser = async (payload) => {
    payload.role = "USER";
    const result = await user_model_1.User.create(payload);
    return result;
};
exports.UserService = {
    createUser,
};
