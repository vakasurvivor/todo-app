// ./src/utils/validationHandler.js

import { z, ZodType } from "zod";
import { BadRequestError } from "./errors";

export default function zValidate<T>(schema: ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    const flattenedError = z.flattenError(result.error);
    throw new BadRequestError("入力値が無効です。", {
      details: flattenedError,
      cause: result.error,
    });
  }
  return result.data;
}
