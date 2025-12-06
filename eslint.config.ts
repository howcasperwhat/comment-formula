import antfu from '@antfu/eslint-config'

module.exports = antfu({
  typescript: true,
  ignores: [
    'src/generated',
    'src/store/mathjax.ts',
  ],
})
