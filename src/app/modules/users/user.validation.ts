import { z } from "zod";
import { Role } from "./user.contact";

const uservalidation = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email(),
    role: z.enum([...Role] as [string, ...string[]]),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6)
      .max(20),
    username: z.string({
      required_error: "Username is required",
    }),
  }),
});

export default uservalidation;
