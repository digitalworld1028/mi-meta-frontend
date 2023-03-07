module.exports = {
  // env: {
  //   browser: true,
  //   es2021: true,
  // },

  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    // 'plugin:react/recommended',
    // 'airbnb',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
  ],
  // plugins: [
  //   'react',
  //   '@typescript-eslint',
  // ],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/no-var-requires': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/display-name': 'off',
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  settings: {
    // "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
    // "import/parsers": {
    //   "@typescript-eslint/parser": [".ts", ".tsx"]
    // },
    'import/resolver': {
      // typescript: {
      //   directory: './tsconfig.json',
      // },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    // 'import/resolver': {
    //     node: {
    //         extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
    //         moduleDirectory: ['node_modules', 'src/'],
    //     },
    // },
  },
};
