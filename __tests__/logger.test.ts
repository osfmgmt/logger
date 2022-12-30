import { createLogger, OsfLogger } from '../dist/logger';
import { Logger } from '../dist';

describe('Logger creation', function () {
  let logger: Logger;
  beforeEach(() => {
    logger = createLogger();
  });
  it('should create a non local logger by default', function () {
    expect(logger instanceof OsfLogger).toBeTruthy();
  });
  it('supports all logging methods', function () {
    logger.trace('trace');
    logger.debug('debug');
    logger.info('info');
    logger.warn('warn');
    logger.error('error');
    logger.fatal('fatal');
  });
});
