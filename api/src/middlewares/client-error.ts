import { StatusCodes, getReasonPhrase } from "http-status-codes";

// see https://developer.mozilla.org/ja/docs/Web/HTTP/Status
export enum ClientErrorStatusCodes {
  BAD_REQUEST = StatusCodes.BAD_REQUEST,
  UNAUTHENTICATED = StatusCodes.UNAUTHORIZED, // actually unauthenticated
  FORBIDDEN = StatusCodes.FORBIDDEN,
  NOT_FOUND = StatusCodes.NOT_FOUND,
  UNPROCESSABLE_ENTITY = StatusCodes.UNPROCESSABLE_ENTITY,
}

export class ClientError extends Error {
  public readonly statusMessage: string;
  public readonly statusCode: ClientErrorStatusCodes;

  constructor(statusCode: ClientErrorStatusCodes, message: string) {
    super(message);

    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);

    this.statusMessage = getReasonPhrase(statusCode);
    this.statusCode = statusCode || ClientErrorStatusCodes.BAD_REQUEST;
  }
}
