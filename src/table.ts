import { createHash } from 'crypto';

import { Table } from 'console-table-printer';

export const COLORS = [
  'red',
  'green',
  'yellow',
  'white',
  'blue',
  'magenta',
  'cyan',
  'crimson',
  'white_bold'
];

export function printTable(rows: Record<string, any>[], opts?: {
  title?: string;
  colorKeyFn?: (row: Record<string, any>) => string,
}) {
  const { title, colorKeyFn } = opts || {};
  const cols: Record<string, number> = {};
  for (const row of rows) {
    for (const [col, val] of Object.entries(row)) {
      cols[col] = Math.max((cols[col] || 0), val.length);
    }
  }
  if (typeof title !== 'undefined') {
    process.stdout.write(`\n\n${title}\n`);
  }
  const t = new Table({
    columns: Object.keys(cols).map(name => ({ name, alignment: 'left' })),
  });
  for (const row of rows) {
    const clean = Object.entries(row).reduce((acc, [k, v]) => {
      if (k !== 'color') {
        acc[k] = `${v || (v === 0 ? 0 : '--')}`;
      }
      return acc;
    }, {} as Record<string, string>);
    if ('color' in row) {
      t.addRow(clean, { color: row.color });
    } else if (typeof colorKeyFn !== 'undefined') {
      const colorKey = colorKeyFn(row);
      const colorNum = createHash('md5').update(colorKey).digest().reduce((acc, x) =>  acc + x, 0);
      const color = COLORS[colorNum % COLORS.length];
      t.addRow(clean, { color });
    } else {
      t.addRow(clean);
    }
  }
  t.printTable();
}

export function printVerticalTable(row: Record<string, any>, opts?: {
  title?: string;
  colorFn?: (k: string, v: any) => string | undefined,
}) {
  const { title, colorFn } = opts || {};
  if (typeof title !== 'undefined') {
    process.stdout.write(`\n\n${title}\n`);
  }
  const t = new Table({
    columns: [
      { name: 'Field', alignment: 'left', color: 'white_bold' },
      { name: 'Value', alignment: 'left' },
  ]});
  const clean = Object.entries(row).reduce((acc, [k, v]) => {
    acc.push({ Field: k, Value: `${v || (v === 0 ? 0 : '--')}`});
    return acc;
  }, [] as Record<string, string>[]);
  for (const row of clean) {
    let color: string | undefined;
    if (typeof colorFn !== 'undefined') {
      color = colorFn(row.Field, row.Value);
    }
    if (typeof color !== 'undefined') {
      t.addRow(row, { color });
    } else {
      t.addRow(row);
    }
  }
  t.printTable();
}
