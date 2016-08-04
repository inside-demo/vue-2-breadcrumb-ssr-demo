const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackConfig = require('./webpack.client.config')

module.exports = merge(webpackConfig, {
  target: 'node',
  entry: './src/server-entry.js',
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  externals: {
    firebase: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        VUE_ENV: '"server"'
      }
    })
  ]
})