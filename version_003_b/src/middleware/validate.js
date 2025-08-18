// ./middlewares/validate.js
import { BadRequestError } from "../errors.js";
import { ZodError } from "zod";

/**
 * @typedef {Object} SchemaMap
 * @property {import("zod").ZodType} [params] - パスパラメータ検証用のZodスキーマ
 * @property {import("zod").ZodType} [body]   - リクエストボディ検証用のZodスキーマ
 */

/**
 * @param {SchemaMap} schemaMap
 * @returns {import("express").RequestHandler}
 * @throws {BadRequestError}
 *
 * @example
 * ```javascript
 * import { z } from "zod";
 * import taskValidate from "./middlewares/validate.js";
 *
 * const userSchema = z.object({
 *   name: z.string().min(1),
 *   email: z.string().email()
 * });
 *
 * app.post("/users", taskValidate({ body: userSchema }), (req, res) => {
 *   // req.validatedBody が利用可能になる
 * });
 * ```
 */
export default function taskValidate(schemaMap) {
  return (req, res, next) => {
    try {
      if (schemaMap.params) {
        req.validatedParams = schemaMap.params.parse(req.params);
      }
      if (schemaMap.body) {
        req.validatedBody = schemaMap.body.parse(req.body);
      }
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return next(
          new BadRequestError(err.errors.map((e) => e.message).join(", "))
        );
      }
      next(err);
    }
  };
}
