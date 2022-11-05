const { merge } = require('webpack-merge');
const common = require('./Wallet/webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
})
