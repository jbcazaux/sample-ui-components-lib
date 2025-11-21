import { defineMain } from '@storybook/react-vite/node'

export default defineMain({
  framework: '@storybook/react-vite',
  stories: [
    {
      directory: '../lib/components',
      files: '**/*.stories.*',
    },
  ],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
})
