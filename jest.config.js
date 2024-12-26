module.exports = {
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  transformIgnorePatterns: [
    '/node_modules/(?!(@testing-library/dom)/)',
  ],
  modulePathIgnorePatterns: [
    '<rootDir>/dist/'
  ],
  preset: 'ts-jest',
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom', '<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
