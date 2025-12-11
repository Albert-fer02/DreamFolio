import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  webpackFinal: async (config) => {
    // Module Federation support for Storybook
    config.plugins = config.plugins || [];

    // Add Module Federation plugin for shared components
    config.plugins.push(
      new (require('webpack').container.ModuleFederationPlugin)({
        name: 'storybook_host',
        shared: {
          react: {
            singleton: true,
            eager: true,
          },
          'react-dom': {
            singleton: true,
            eager: true,
          },
          'framer-motion': {
            singleton: true,
          },
          'tailwindcss': {
            singleton: true,
          },
        },
      })
    );

    return config;
  },
};

export default config;