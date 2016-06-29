'use strict'

var flatTypes = ['string', 'number', 'boolean']
var isFlat = function (val) {
  return flatTypes.indexOf(typeof val) !== -1
}

var truncate = function (obj, maxDepth, curDepth) {
  curDepth = curDepth || 0

  if (curDepth < maxDepth) {
    var newDepth = curDepth + 1

    if (isFlat(obj)) {
      return obj
    } else if (Array.isArray(obj)) {
      var newArr = []
      obj.map(function (value) {
        if (isFlat(value)) {
          newArr.push(value)
        } else {
          newArr.push(truncate(value, maxDepth, newDepth))
        }
      })
      return newArr
    } else {
      var newObj = {}
      for (var key in obj) {
        if (isFlat(obj[key])) {
          newObj[key] = obj[key]
        } else {
          newObj[key] = truncate(obj[key], maxDepth, newDepth)
        }
      }
      return newObj
    }
  }
}

module.exports = function (obj, maxDepth) {
  return truncate(obj, maxDepth || 10)
}
