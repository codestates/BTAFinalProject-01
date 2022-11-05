
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-chrome-extension-router.cjs.production.min.js')
} else {
  module.exports = require('./react-chrome-extension-router.cjs.development.js')
}
