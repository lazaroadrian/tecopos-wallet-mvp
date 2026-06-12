// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.
module.exports = {
  extends: ['expo', 'plugin:import/recommended', 'plugin:import/typescript'],
  plugins: ['import'],
  rules: {
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'import/no-duplicates': 'error',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
  ignorePatterns: ['node_modules/', '.expo/', 'dist/'],
};
