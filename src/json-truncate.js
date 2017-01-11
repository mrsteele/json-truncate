'use strict'

const flatTypes = [String, Number, Boolean]

const isDefined = val => {
  return val !== null && val !== undefined
}

const isFlat = val => {
  return !isDefined(val) || flatTypes.indexOf(val.constructor) !== -1
}

const truncate = (obj, maxDepth, options, curDepth) => {
  curDepth = curDepth || 0
  maxDepth = (isDefined(maxDepth)) ? maxDepth : 10
  options = (typeof options === 'object') ? options : {}

  if (curDepth < maxDepth) {
    const newDepth = curDepth + 1

    if (isFlat(obj)) {
      return obj
    } else if (Array.isArray(obj)) {
      const newArr = []
      obj.map(value => {
        if (isFlat(value)) {
          newArr.push(value)
        } else {
          newArr.push(truncate(value, maxDepth, options, newDepth))
        }
      })
      return newArr
    } else {
      const newObj = {}
      for (let key in obj) {
        if (isFlat(obj[key])) {
          newObj[key] = obj[key]
        } else {
          newObj[key] = truncate(obj[key], maxDepth, options, newDepth)
        }
      }
      return newObj
    }
  }
  return options.replace;
}

export default truncate
