# json-truncate [![NPM version](https://badge.fury.io/js/json-truncate.svg)](http://badge.fury.io/js/json-truncate)

A way to truncate a json object. Useful for circular referenced objects.

## Status

[![travis](https://travis-ci.org/mrsteele/json-truncate.svg?branch=master)](https://travis-ci.org/mrsteele/json-truncate)
[![dependencies](https://david-dm.org/mrsteele/json-truncate.svg)](#)
[![npm](https://img.shields.io/npm/v/json-truncate.svg?maxAge=0&style=flat)](https://www.npmjs.com/package/json-truncate)
[![GitHub commits](https://img.shields.io/github/commits-since/mrsteele/json-truncate/v1.1.0.svg?maxAge=0&style=flat)](https://github.com/mrsteele/json-truncate/commits/master)
[![npm](https://img.shields.io/npm/l/json-truncate.svg?maxAge=0&style=flat)](https://raw.githubusercontent.com/mrsteele/json-truncate/master/LICENSE)

## Install

```
npm install json-truncate --save
```

## Usage

```javascript
// You can add this as a static function on JSON.
JSON.truncate = require('json-truncate');

console.log(JSON.truncate(SomeDeepObject, 10));
```

## Returns

You will get a proper truncated object that can now be written to a file if needed.

#### Arguments

* `obj` - The Object that will be truncated.
* `maxDepth` - (optional) The depth at which to stop building the valid json. Defaults to `10`.


## Licence

MIT
