// ./src/middlewares/validationHandler.js

import { z } from "zod";
import { AppError, BadRequestError } from "../utils/errors.js";

/**
 * @typedef {Object} SchemaMap
 * @property {import("zod").ZodType} [params] - req.params 検証用の Zod Schema
 * @property {import("zod").ZodType} [body]   - req:body 検証用の Zod Schema
 * @property {import("zod").ZodType} [query]  - req:query 検証用の Zod Schema
 */

/**
 * @param {SchemaMap} schemaMap
 * @returns {import("express").RequestHandler}
 * @throws {BadRequestError}
 */
export default function zValidate(schemasMap) {
  return (req, _, next) => {
    try {
      for (const [key, schema] of Object.entries(schemasMap)) {
        // Express から渡される req に検証対象が存在するか確認
        if (!Object.prototype.hasOwnProperty.call(req, key)) {
          throw new AppError(`Requestの対象に含まれていません。: ${key}`);
        }
        // 検証済みの req を渡す
        const parsed = schema.parse(req[key]);
        req[key] = parsed;
      }
      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        const flattenedError = z.flattenError(err);
        next(
          new BadRequestError("入力値が無効です。", {
            details: flattenedError,
            cause: err,
          })
        );
      } else {
        next(err);
      }
    }
  };
}
