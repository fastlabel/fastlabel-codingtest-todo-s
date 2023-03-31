import { Response, Request, NextFunction } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { ValidateError } from "tsoa";
import { ClientError } from "./client-error";
import { Logger } from "./logger";

export const RequestHandler = {
  start(req: Request, res: Response, next: NextFunction): void {
    // skip health check logging
    if (req.path !== "/") {
      new Logger().info(`START: ${req.method.toUpperCase()} ${req.path}`);
    }
    next();
  },
  error(
    err: Error | ClientError | ValidateError,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    if (err instanceof ClientError) {
      res.status(err.statusCode).json({
        message: err.message,
      });
      new Logger().error(
        `${err.statusCode}: ${req.method.toUpperCase()} ${req.path}`,
        err
      );
    } else if (err instanceof ValidateError) {
      res.status(err.status).json({
        message: err.fields,
      });
      new Logger().error(
        `${err.status}: ${req.method.toUpperCase()} ${req.path}`,
        err
      );
    } else if (err instanceof Error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: ReasonPhrases.INTERNAL_SERVER_ERROR,
      });
      new Logger().error(
        `${res.statusCode}: ${req.method.toUpperCase()} ${req.path}`,
        err
      );
    }
    next();
  },
};
