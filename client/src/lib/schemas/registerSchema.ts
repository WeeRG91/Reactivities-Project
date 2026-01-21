import z from "zod";
import { requiredString } from "../utils/util";

export const registerSchema = z.object({
  email: z.email(),
  displayName: requiredString("Display Name"),
  password: requiredString("Password"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
