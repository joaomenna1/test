import { z } from "zod";

export const loginBodySchema = z.object({
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSuccessResponseSchema = z.object({
  token: z.string(),
});

export const errorResponseSchema = z.object({
  error: z.string(),
  message: z.string(),
});