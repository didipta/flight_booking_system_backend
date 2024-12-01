"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const user_contact_1 = require("./user.contact");
const uservalidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: "Email is required",
        })
            .email(),
        role: zod_1.z.enum([...user_contact_1.Role]),
        password: zod_1.z
            .string({
            required_error: "Password is required",
        })
            .min(6)
            .max(20),
        username: zod_1.z.string({
            required_error: "Username is required",
        }),
    }),
});
exports.default = uservalidation;
