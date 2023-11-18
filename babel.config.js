module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@vue/cli-plugin-babel/preset'
  ],
  env: {
    test: {
      plugins: ['transform-require-context'],
    },
  },
};
