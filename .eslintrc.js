module.exports = {
  'env': {
    'browser': true,
    'node': true,
    'es6': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:vue/essential'
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'plugins': [
    'vue'
  ],
  'rules': {
    'indent': [ 'warn', 2, { ignoreComments: true }],
    'linebreak-style': [ 'warn', 'unix' ],
    'quotes': [ 'warn', 'single' ],
    'semi': [ 'error', 'always' ],
    'no-console': 'warn',
  }
};