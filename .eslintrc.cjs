module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb' /*Удалил все ненужное, правила airbnb работают */,
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser:
    '@typescript-eslint/parser' /* Пришлось добавить парсер который хорошо работает с jsx, без него были ошибки */,
  parserOptions: { ecmaVersion: '2020', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-no-bind': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
  },
}
