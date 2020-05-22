module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'linebreak-style': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'max-len': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'import/no-dynamic-require': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'global-require': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'no-var': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'vars-on-top': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'block-scoped-var': process.env.NODE_ENV === 'production' ? 'off' : 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
