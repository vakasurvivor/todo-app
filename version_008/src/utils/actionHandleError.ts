// ./src/utils/actionHandleError.ts

import { AppError, BadRequestError } from "./errors";

export default function actionHandleError(err: unknown) {
  if (err instanceof AppError) {
    return {
      success: false,
      error: {
        name: err.name,
        message: err.message,
        ...(err instanceof BadRequestError && err.details
          ? { details: err.details }
          : {}),
      },
    };
  }

  return {
    success: false,
    error: {
      name: "Unexpected Error",
      message: "サーバーで予期しない例外が発生しました。",
    },
  };
}
