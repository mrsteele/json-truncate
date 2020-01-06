# json-truncate

A way to truncate a json object. Useful for circular referenced objects.

## Status

[![npm](https://img.shields.io/npm/v/json-truncate.svg?maxAge=0&style=flat)](https://www.npmjs.com/package/json-truncate)
[![Travis](https://travis-ci.org/mrsteele/json-truncate.svg?branch=master)](https://travis-ci.org/mrsteele/json-truncate)
[![codecov](https://codecov.io/gh/mrsteele/json-truncate/branch/master/graph/badge.svg)](https://codecov.io/gh/mrsteele/json-truncate)
[![Dependency Status](https://david-dm.org/mrsteele/json-truncate.svg)](#)
[![devDependency Status](https://david-dm.org/mrsteele/json-truncate/dev-status.svg)](https://david-dm.org/mrsteele/json-truncate#info=devDependencies)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![npm](https://img.shields.io/npm/l/json-truncate.svg?maxAge=0&style=flat)](https://raw.githubusercontent.com/mrsteele/json-truncate/master/LICENSE)
[![Greenkeeper badge](https://badges.greenkeeper.io/mrsteele/json-truncate.svg)](https://greenkeeper.io/)

## About

If you need to write data to a file or output an object to an api endpoint that has circular references I recommend you give `json-truncate` a try.

By removing deeply nested data to maintain simple copies of the circular references you can keep most of the data you might be interested in.

## Install

```
npm install json-truncate --save
```

## Usage

Below are examples of how to use `json-truncate`

#### Including

You can include with regular node require:

```javascript
JSON.truncate = require('json-truncate')
```

#### Usage

**Figure 1.0** - A basic example with default options.

```javascript
JSON.truncate(SomeDeepObject)
```

**Figure 1.1** - An example of setting the `maxDepth` property.

```javascript
JSON.truncate(SomeDeepObject, 5)
```

**Figure 1.2** - An example of all configurable options.

```javascript
console.log(JSON.truncate({
  data: 'foo',
  level1: {
    data: 'bar',
    level2: {
      level3: {}
    }
  }
}, {
  maxDepth: 2,
  replace: '[Truncated]'
}))
/**
 * Output:
{
  "data": "foo",
  "level1": {
    "data": "bar",
    "level2": "[Truncated]"
  }
}
 **/
```

### Configuration

By default, there are two configurable variables to keep in mind when using `json-truncate`:

1. `maxDepth (Number)` = `10`
2. `replace (Any)` = `undefined`

If you would you can configure these either individually with each request, or globally with the configuration function. The following example mimics figure 1.2 above.

```javascript
JSON.truncate.configure({
  maxDepth: 2,
  replace: '[Truncated]'
})
```

#### Arguments

* `obj` - The Object that will be truncated.
* `options` - (optional) An option object to customize the behavior of the utility. Defaults to `{}`.

**Current Option Properties**

|Option|Description|
|:--|:--|
|**maxDepth**|The default maxDepth to use for nested and deep properties on an object. Defaults to `10`|
|:--|:--|
|**replace**|A string value that is used to replace all truncated values. If this value is not a string then all truncated values will be replaced with `undefined`|


## Licence

MIT
