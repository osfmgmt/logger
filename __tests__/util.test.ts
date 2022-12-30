import { getLoggerNameFromPath } from '../dist/util';

describe('Log utilities', function () {
  describe('getLoggerNameFromPath', () => {
    it('should use filename without extension', function () {
      expect(getLoggerNameFromPath('/a/b/c/d/e.ext')).toBe('e');
    });
    it('should use filename without extension, even if the filename has additional dots', function () {
      expect(getLoggerNameFromPath('/a/b/c.d.e.ext')).toBe('c.d.e');
    });
    it('should use take the directory name if the file as an index file', function () {
      expect(getLoggerNameFromPath('/a/b/c/index.js')).toBe('c');
      expect(getLoggerNameFromPath('/a/b/c/index.ts')).toBe('c');
    });
  });
});
