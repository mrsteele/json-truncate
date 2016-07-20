'use strict'

let JSONTruncate
try {
  JSONTruncate = require('./dist/json-truncate').default
} catch (err) {
  if (err.code === 'MODULE_NOT_FOUND') {
    require('babel-register')
    JSONTruncate = require('./src/json-truncate').default
  } else {
    console.log(err)
    process.exit(1)
  }
}

module.exports = JSONTruncate
