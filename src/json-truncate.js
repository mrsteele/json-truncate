// configurables
let maxDepth
let replace

const flatTypes = [String, Number, Boolean]

const isDefined = val => val !== null && val !== undefined

const isFlat = val => !isDefined(val) || ~flatTypes.indexOf(val.constructor)

/**
 * Truncates variables.
 * @param {Object} obj - The object to truncate.
 * @param {Object|Number} [options={}] - If a number, the maxDepth, otherwise configurable options.
 * @param {Number} [options.maxDepth=10] - The max depth to build.
 * @param {Object} [options.replace=] - What to replace the truncated reference to.
 * @param {Number} [curDepth=0] - The current depth (used for recursive requests).
 * @returns {Object} The truncated object.
 */
const truncate = (obj, options = {}, curDepth = 0) => {
  options = isNaN(options) ? options : {maxDepth: options}
  options.maxDepth = options.maxDepth || maxDepth
  options.replace = options.replace || replace

  if (curDepth < options.maxDepth) {
    const newDepth = curDepth + 1

    if (isFlat(obj)) {
      return obj
    } else if (Array.isArray(obj)) {
      const newArr = []
      obj.map(value => {
        if (isFlat(value)) {
          newArr.push(value)
        } else {
          newArr.push(truncate(value, options, newDepth))
        }
      })
      return newArr
    } else {
      const newObj = {}
      for (let key in obj) {
        if (isFlat(obj[key])) {
          newObj[key] = obj[key]
        } else {
          newObj[key] = truncate(obj[key], options, newDepth)
        }
      }
      return newObj
    }
  }

  return options.replace
}

/**
 * Configures globals and defaults.
 * @param {Object} [obj={}] - The configuration.
 * @param {Number} obj.maxDepth - The default and global maxDepth for future truncations.
 * @param {} obj.replace - The default and global replacement value.
 */
truncate.config = (obj = {}) => {
  maxDepth = obj.maxDepth || maxDepth
  replace = obj.replace || replace
}

/**
 * Allows you to reset the variables (mainly for testing).
 */
truncate.reset = () => {
  maxDepth = 10
  replace = undefined
}

truncate.reset()

export default truncate
