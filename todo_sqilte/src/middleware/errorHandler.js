// ./src/middleware/errorHandler.js

import { AppError } from "../utils/errors.js";

/**
 * @param {Error} err
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").ErrorRequestHandler} err
 * @return {import("express").NextFunction} next
 */
export default function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    res.status(err.status).json({
      status: "error",
      message: err.message,
    });
    return;
  }

  // 予期しない例外は [500] で返却する
  console.error("[Unhandled Error]", err);
  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
}
