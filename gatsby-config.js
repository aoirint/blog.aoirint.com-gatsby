// https://miyauchi.dev/ja/posts/gatsby-typescript/
const { register } = require('esbuild-register/dist/node')

register({
  target: 'node14'
})

module.exports = require('./gatsby-config.ts')
