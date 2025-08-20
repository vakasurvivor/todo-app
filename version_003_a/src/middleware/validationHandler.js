// ./src/middlewares/validationHandler.js
import { AppError, BadRequestError } from "../utils/errors.js";
import { z } from "zod";

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
          throw new AppError(`Invalid validation key: ${key}`);
        }
        // 検証済みの req を渡す
        const parsed = schema.parse(req[key]);
        req[key] = parsed;
      }
      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        const formattedErrors = err.issues.map((err) => {
          const path = err.path.join(".");
          return `${path}: ${err.message}`;
        });
        const messages = formattedErrors.join("| ");
        next(new BadRequestError(messages), {
          cause: err,
        });
      } else {
        next(err);
      }
    }
  };
}
