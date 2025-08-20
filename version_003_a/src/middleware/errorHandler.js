// ./src/middleware/errorHandler.js

import { AppError } from "../utils/errors.js";

/**
 * @param {import("express").ErrorRequestHandler} err
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export default function errorHandler(err, req, res, next) {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.status).json({
      name: err.name,
      message: err.message,
    });
  }

  res.status(500).json({
    error: {
      name: "Internal Server Error",
      message: "サーバーで予期しない例外が発生しました。",
    },
  });
}
