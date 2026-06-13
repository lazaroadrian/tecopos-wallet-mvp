// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.
/** @type {import('jest').Config} */
const config = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|moti|@motify/.*)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  // Set EXPO_PUBLIC_MOCKAPI_URL before any module loads so that config.ts's
  // dev console.warn is silenced in the test environment (FIX-4 / S3).
  setupFiles: ['<rootDir>/src/__mocks__/jest.setup.env.ts'],
  setupFilesAfterEnv: ['@testing-library/react-native/extend-expect'],
  testMatch: ['**/__tests__/**/*.{ts,tsx}', '**/*.{spec,test}.{ts,tsx}'],
};

module.exports = config;
