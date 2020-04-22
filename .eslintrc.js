module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'prettier/prettier': 'error',
    'import/order': 'on',
  },
};
