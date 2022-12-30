export interface Logger {
  readonly name: string;

  trace(data: any, ...params: Array<any>): void;

  debug(data: any, ...params: Array<any>): void;

  info(data: any, ...params: Array<any>): void;

  warn(data: any, ...params: Array<any>): void;

  error(data: any, ...params: Array<any>): void;

  fatal(data: any, ...params: Array<any>): void;
}

export type Level = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';

export interface CreateLoggerOpts {
  name?: string;
  level?: Level;
  local?: boolean;
}
export const DEFAULT_LEVEL = 'info';
