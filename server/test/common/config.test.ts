import config from '../../src/config';
import logger from '../../src/logger';

describe('Configuration tests', () => {
  test('Runtime profile test', () => {
    expect(process.env.profile).toBe('test');
  });

  test('Configuration loaded test', () => {
    expect(config.port).toBeDefined();
    expect(config.port).not.toBeNull();
  });

  test('Logger test', () => {
    // logger.info('Hello, world!');
  });
});
