// ./src/utils/schemas.js

import { z } from "zod";

export const idSchema = z.object({
  id: z.coerce.number().int().positive({
    error: "IDは正の整数で指定してください。",
  }),
});

export const taskSchema = z.object({
  text: z
    .string({ error: "文字列で入力してださい。" })
    .trim()
    .min(1, { error: "テキストの入力は必須です。" })
    .max(50, { error: "テキストは50文字以内で入力してください。" }),

  isCompleted: z.boolean({ error: "真偽値で指定してください。" }),
});
