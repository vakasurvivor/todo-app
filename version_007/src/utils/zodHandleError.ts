// ./src/utils/zodHandleError.ts

import { z } from "zod";
import { BadRequestError } from "./errors";

export default function zodHandleError<T>(
  parseResult: ReturnType<z.ZodSchema<T>["safeParse"]>
): T {
  if (!parseResult.success) {
    const flattenedError = z.flattenError(parseResult.error);

    throw new BadRequestError("入力値が無効です。", {
      details: flattenedError,
      cause: parseResult.error,
    });
  }

  return parseResult.data;
}
