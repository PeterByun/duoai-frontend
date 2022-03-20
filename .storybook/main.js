const path = require('path');

module.exports = {
  webpackFinal: async config => {
    config.resolve.alias = { ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src/')
    };
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: '@storybook/react',
  core: {
    builder: "webpack5"
  }
};