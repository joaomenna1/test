import { z } from "zod";

export const loginBodySchema = z.object({
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSuccessResponseSchema = z.object({
  token: z.string(),
});

export const checklistBodyResponseSchema = z.object({
  id: z.string(),
  description: z.string()
});

export const createServiceOrderResponseSchema = z.object({
  id: z.string(),
  description: z.string(),
  photoUrl: z.string().nullable(),
  createdAt: z.date(),
  userId: z.string()
})

export const errorResponseSchema = z.object({
  error: z.string(),
  message: z.string(),
});

export const createServiceOrderBody = z.object({
  description: z.string().min(1),
  photoUrl: z.string().url(),
  checklists: z
    .array(
      z.object({
        checklistId: z.string().uuid(),
        checked: z.boolean(),
      })
    )
    .min(1),
});

export type CreateServiceOrderBody = z.infer<
  typeof createServiceOrderBody
>;


export const updateChecklistBody = z.object({
  checklistId: z.string().uuid(),
  checked: z.boolean(),
});

export type UpdateChecklistParams = {
  id: string;
};

export type UpdateChecklistBody = z.infer<typeof updateChecklistBody>;

export type ServiceOrderByIdParams = {
  id: string;
};