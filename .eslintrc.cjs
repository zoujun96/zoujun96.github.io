/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    './.eslintrc-auto-import.json'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    curly: ['error', 'multi-line'],
    eqeqeq: ['error', 'always'],
    camelcase: [
      'error',
      {
        properties: 'always'
      }
    ],
    'no-proto': 'error',
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'prefer-const': 'error',
    'no-multi-str': 'error',
    'no-empty-function': ['error'],
    'no-empty-static-block': 'error',
    'default-case': 'error',
    'default-case-last': 'error',
    'no-duplicate-imports': ['error'],
    'no-return-assign': ['error', 'except-parens'],
    'no-useless-computed-key': 'error',
    'prefer-rest-params': 'error',
    'no-unneeded-ternary': [
      'error',
      {
        defaultAssignment: false
      }
    ],
    'vue/block-order': ['error', { order: ['template', 'script', 'style'] }],
    'vue/block-tag-newline': [
      'error',
      { singleline: 'always', multiline: 'always', maxEmptyLines: 0 }
    ],
    'vue/component-api-style': ['error', ['script-setup', 'composition']],
    'vue/html-comment-content-spacing': ['error', 'always', { exceptions: ['*'] }],
    'vue/html-comment-indent': ['error', 2],
    'vue/no-use-v-else-with-v-for': 'error',
    'vue/padding-line-between-blocks': ['error', 'always'],
    'vue/padding-line-between-tags': ['error', [{ blankLine: 'consistent', prev: '*', next: '*' }]],
    'vue/require-direct-export': ['error'],
    'vue/require-name-property': 'error',
    'vue/multi-word-component-names': 'off',
    'vue/require-prop-comment': [
      'error',
      {
        type: 'any'
      }
    ],
    'vue/script-indent': [
      'error',
      2,
      {
        baseIndent: 1,
        switchCase: 1,
        ignores: []
      }
    ],
    'vue/array-bracket-spacing': [
      'error',
      'never',
      { singleValue: false, objectsInArrays: false, arraysInArrays: false }
    ],
    'vue/arrow-spacing': ['error', { before: true, after: true }],
    'vue/camelcase': [
      'error',
      {
        properties: 'always'
      }
    ],
    'vue/comma-dangle': ['error', 'never'],
    'vue/eqeqeq': ['error', 'always'],
    'vue/key-spacing': ['error', { beforeColon: false }],
    'vue/keyword-spacing': ['error', { before: true, after: true }],
    'vue/no-constant-condition': ['error', { checkLoops: false }]
  },
  overrides: [
    {
      files: ['src/lang/en_US.js', 'src/lang/zh_CN.js'],
      rules: {
        camelcase: ['error', { properties: 'never' }]
      }
    }
  ]
}
