// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by Lázaro Adrian.
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '@': './src',
          },
        },
      ],
      // Worklets plugin must be listed last.
      // Reanimated 4 moved the Babel plugin to react-native-worklets.
      'react-native-worklets/plugin',
    ],
  };
};
