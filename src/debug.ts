import Debug, { IDebugger } from 'debug';
import getCallerFile from 'get-caller-file';

import { getLoggerNameFromPath } from './util';

export function createDebugPrinter(...names: string[]) {
  return Debug(
    [
      'osf',
      ...(names.length ? names : [getLoggerNameFromPath(getCallerFile())]),
    ].join(':'),
  );
}

export type Dbg = IDebugger;
