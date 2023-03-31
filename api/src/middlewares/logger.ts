import { DateUtil } from "../utils/date-util";
import { provideSingleton } from "./inversify/ioc-util";

@provideSingleton(Logger)
export class Logger {
  trace(message: string, payload?: any): void {
    this.write(LogSeverity.TRACE, message, payload);
  }
  debug(message: string, payload?: any): void {
    this.write(LogSeverity.DEBUG, message, payload);
  }
  info(message: string, payload?: any): void {
    this.write(LogSeverity.INFO, message, payload);
  }
  warn(message: string, payload?: any): void {
    this.write(LogSeverity.WARN, message, payload);
  }
  error(message: string, payload?: any): void {
    this.write(LogSeverity.ERROR, message, payload);
  }
  emergency(message: string, payload?: any): void {
    this.write(LogSeverity.EMERGENCY, message, payload);
  }
  write(severity: LogSeverity, message: string, payload?: any): void {
    const params = [`${DateUtil.getISOStringTZ()} [${severity}]: ${message}`];

    switch (severity) {
      case LogSeverity.TRACE:
      case LogSeverity.DEBUG:
        console.debug(...params, payload || "");
        break;
      case LogSeverity.INFO:
        console.info(...params, payload || "");
        break;
      case LogSeverity.WARN:
        console.warn(...params, payload || "");
        break;
      case LogSeverity.ERROR:
      case LogSeverity.EMERGENCY:
      default:
        console.error(...params, payload || "");
        break;
    }
  }
}

export enum LogSeverity {
  TRACE = "TRACE",
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  EMERGENCY = "EMERGENCY",
}
