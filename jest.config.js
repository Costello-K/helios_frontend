module.exports = {
  moduleFileExtensions: ['js', 'json', 'vue'],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons']
  },
  testMatch: [
    '**/tests/unit/**/*.spec.js',
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.vue$': '@vue/vue3-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@(.*)$': '<rootDir>/node_modules/@$1',
  },
};
