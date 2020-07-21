module.exports = {
  stories: ['../src/stories/**/*.stories.(ts|tsx|mdx)'],
  addons: [
    '@storybook/preset-typescript',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-docs',
    'storybook-dark-mode'
  ]
}
