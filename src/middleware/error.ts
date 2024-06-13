import type { Request, Response, NextFunction } from "express";
import type { ErrorResponse } from "../types/common";
import { NODE_ENV } from "../config";

export default function errorHandler(
  error: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction // eslint-disable-line @typescript-eslint/no-unused-vars
) {
  let response: { [key: string]: unknown } = {};
  if (NODE_ENV === "production") {
    response = { error: { message: "Server Error" } };
  } else {
    console.error(error);
    response = { message: error.message, error: error.stack };
  }
  res.status(error.status || 500).json(response);
}
