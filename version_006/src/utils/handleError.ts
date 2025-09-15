// ./src/utils/handleError.ts
import { NextResponse } from "next/server";
import { AppError, BadRequestError } from "./errors";

export default function handleError(err: unknown) {
  if (err instanceof AppError) {
    return NextResponse.json(
      {
        name: err.name,
        message: err.message,
        ...(err instanceof BadRequestError && err.details
          ? { details: err.details }
          : {}),
      },
      { status: err.status }
    );
  }

  return NextResponse.json(
    {
      name: "Internal Server Error",
      message: "サーバーで予期しない例外が発生しました。",
    },
    { status: 500 }
  );
}
