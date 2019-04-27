import config from '../../src/config';

describe('Configuration tests', () => {

  test('Runtime profile test', () => {
    expect(process.env.profile).toBe('test');
  });

  test('Configuration loaded test', () => {
    expect(config.port).toBeDefined();
    expect(config.port).not.toBeNull();
  });

});
