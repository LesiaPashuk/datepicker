import type { StorybookConfig } from '@storybook/react-vite';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mergeConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@app': path.resolve(__dirname, '../src/app'),
          '@shared': path.resolve(__dirname, '../src/shared'),
          '@entities': path.resolve(__dirname, '../src/entities'),
          '@features': path.resolve(__dirname, '../src/features'),
        },
      },

      css: {
        preprocessorOptions: {
          scss: {
            additionalData: `
                @use "${path.resolve(__dirname, '../src/app/styles/variables')}" as *;
                @use "${path.resolve(__dirname, '../src/app/styles/extends')}" as *;
                @use "${path.resolve(__dirname, '../src/app/styles/themes')}" as *;
                @use "sass:map";
            `,
          },
        },
      },
    });
  },
};

export default config;
