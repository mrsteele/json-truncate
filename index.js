var JSONTruncate
try {
  JSONTruncate = require('./dist/json-truncate')
} catch (err) {
  if (err.code === 'MODULE_NOT_FOUND') {
    require('babel-register')
    JSONTruncate = require('./src/json-truncate')
  } else {
    console.log(err)
    process.exit(1)
  }
}

export default JSONTruncate
