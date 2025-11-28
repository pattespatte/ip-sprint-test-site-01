const { purgeCSSPlugin } = require('@fullhuman/postcss-purgecss')
const { resolve } = require('node:path')

module.exports = {
  plugins: [
    // Only apply PurgeCSS in production
    ...(process.env.NODE_ENV === 'production' ? [
      purgeCSSPlugin({
        content: [
          resolve(__dirname, './index.html'),
          resolve(__dirname, './src/**/*.{vue,js,ts,jsx,tsx}'),
          resolve(__dirname, './node_modules/@fkui/vue/**/*.{vue,js,ts}')
        ],
        safelist: [
          // Keep all FKUI classes
          /^fk-/,
          /^button/,
          /^form/,
          /^color-/,
          /^font-size-/,
          /^--/,
          // Keep all CSS custom properties
          /^--/,
          // Keep common utility classes
          /^i-/,
          /^row/,
          /^col/,
          /^container/,
          /^h-display/,
          /^h-no/
        ],
        defaultExtractor: (content) => {
          const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []
          const innerMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:():]/g) || []
          return [...broadMatches, ...innerMatches]
        },
        // Preserve keyframes and other CSS at-rules
        keyframes: true,
        fontFace: true,
        variables: true
      })
    ] : [])
  ]
}