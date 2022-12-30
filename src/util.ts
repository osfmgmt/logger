import * as path from 'path';

export function getLoggerNameFromPath(filename: string): string {
  const { dir, name } = path.parse(filename);
  return name === 'index' ? path.basename(dir) : name;
}
