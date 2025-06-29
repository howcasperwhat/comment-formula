import antfu from '@antfu/eslint-config'

module.exports = antfu({
  ignores: [
    'src/generated',
    'src/store/mathjax.ts',
  ],
})
