"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const auth_controller_1 = require("./auth.controller");
const user_validation_1 = __importDefault(require("../users/user.validation"));
const user_controller_1 = require("../users/user.controller");
const router = express_1.default.Router();
router.post("/register", (0, validateRequest_1.default)(user_validation_1.default), user_controller_1.UserController.createUser);
router.post("/login", (0, validateRequest_1.default)(auth_validation_1.AuthValidation.loginZodSchema), auth_controller_1.authColtroller.loginuser);
router.get('/me', auth_controller_1.authColtroller.getauthUser);
exports.AuthRouter = router;
