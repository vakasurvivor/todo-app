import { z } from "zod";

export const taskParamsSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "IDは正の整数で指定してください。")
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0, "IDは1以上で指定してください。"),
});

export const taskUpdateSchema = z
  .object({
    text: z.string().optional(),
    isCompleted: z.boolean().optional(),
  })
  .strict();
