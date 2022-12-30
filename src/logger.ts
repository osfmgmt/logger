import getCallerFile from 'get-caller-file';
import Pino, { stdTimeFunctions } from 'pino';

import { getLoggerNameFromPath } from './util';
import { Logger, Level, CreateLoggerOpts, DEFAULT_LEVEL } from './types';

const loggerOpts = {
  timestamp: stdTimeFunctions.isoTime,
  base: {},
};

const localLoggerOpts = {
  sync: true,
  prettyPrint: {
    levelFirst: true,
    colorize: true,
    messageFormat: '{msg}',
    translateTime: 'yyyy-mm-dd"T"HH:MM:ss.l"Z"',
    ignore: 'hostname,pid',
  },
};

export class OsfLogger implements Logger {
  private readonly pino: Pino.Logger;

  constructor(private readonly _name: string, level: Level, local: boolean) {
    this.pino = Pino({
      name: _name,
      level,
      formatters: {
        level(label: string, _number: number) {
          return { level: label.toUpperCase() };
        },
      },
      ...(local ? localLoggerOpts : loggerOpts),
    });
  }

  get name(): string {
    return this._name;
  }

  trace(data: any, ...params: Array<any>): void {
    this.pino.trace(data, ...params);
  }

  debug(data: any, ...params: Array<any>): void {
    this.pino.debug(data, ...params);
  }

  info(data: any, ...params: Array<any>): void {
    this.pino.info(data, ...params);
  }

  warn(data: any, ...params: Array<any>): void {
    this.pino.warn(data, ...params);
  }

  error(data: any, ...params: Array<any>): void {
    this.pino.error(data, ...params);
  }

  fatal(data: any, ...params: Array<any>): void {
    this.pino.fatal(data, ...params);
  }
}

export function createLogger(opts?: CreateLoggerOpts): Logger {
  const { name, level, local } = opts || {};
  return new OsfLogger(
    name || getLoggerNameFromPath(getCallerFile()),
    level || (process.env.LOG_LEVEL as Level) || DEFAULT_LEVEL,
    local || !!process.env.LOCAL,
  );
}
