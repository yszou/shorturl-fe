module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['plugin:@typescript-eslint/recommended'],
  rules: {
    // 自定义规则
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-unused-vars': 'off',

    // 'object-curly-spacing': 'off',
    // 'unused-imports/no-unused-imports': 'off',
    // 'func-call-spacing': 'off',
    // 'operator-linebreak': 'off',
    // 'object-curly-newline': 'off',
  },
};
