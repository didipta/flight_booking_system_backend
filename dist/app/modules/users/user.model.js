"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    username: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (_doc, ret) => {
            delete ret.password;
            return ret;
        },
    },
});
// Static methods
userSchema.statics.isUserExist = async function (email) {
    return this.findOne({ email }, { email: 1, password: 1, role: 1 });
};
userSchema.statics.isPasswordMatched = async function (givenPassword, savedPassword) {
    return bcrypt_1.default.compare(givenPassword, savedPassword);
};
// Middleware: Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt_1.default.hash(this.password, Number(config_1.default.bcrypt_salt));
    next();
});
exports.User = (0, mongoose_1.model)("User", userSchema);
