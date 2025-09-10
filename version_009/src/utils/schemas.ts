// ./src/utils/schemas.ts

import { z } from "zod";

export const taskSchema = z.object({
  id: z.coerce
    .number({
      error: "数値を指定してください。",
    })
    .int({
      error: "整数を指定してください。",
    })
    .positive({
      error: "正の整数を指定してください。",
    }),

  text: z
    .string({
      error: (iss) => `${iss.expected} 型で指定してください。`,
    })
    .trim()
    .min(1, { error: "入力は必須です。" })
    .max(50, {
      error: (iss) => `${iss.maximum}字以内で入力してください。`,
    }),

  isCompleted: z.boolean({
    error: (iss) => `${iss.expected} 型で指定してください。`,
  }),
});
