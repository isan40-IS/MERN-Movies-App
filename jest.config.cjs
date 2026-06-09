module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/backend/tests/**/*.test.js'],
  setupFiles: ['<rootDir>/backend/tests/testEnv.js'],
  verbose: true,
  detectOpenHandles: true,
  forceExit: true,
};
