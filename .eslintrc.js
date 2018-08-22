module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/airbnb'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'linebreak-style': 'off',
    'comma-dangle': 'off',
    'space-before-function-paren': 'off',
    'no-unused-vars': 'off',
    'prefer-const': 'off',
    'prefer-destructuring': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
