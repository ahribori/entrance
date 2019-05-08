module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.ts'],
  testPathIgnorePatterns: ['/node_modules/', 'global(Setup|Teardown).ts'],
  globalSetup: './test/globalSetup.ts',
  globalTeardown: './test/globalTeardown.ts',
};
