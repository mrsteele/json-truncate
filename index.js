'use strict';

const _ = require('lodash');

const truncate = (obj, maxDepth, curDepth) => {
  curDepth = curDepth || 0;
  
  if (curDepth < maxDepth) {
    const newDepth = curDepth + 1;
    
    if (_.isString(obj) || _.isNumber(obj) || _.isBoolean(obj)) {
      return obj;
    } else if (_.isArray(obj)) {
      let newObj = [];
      obj.map(value => {
        newObj.push(truncate(value, maxDepth, newDepth));
      });
      return newObj;
    } else {
      let newObj = {};
      for (let key in obj) {
        newObj[key] = truncate(obj[key], maxDepth, newDepth);
      }
      return newObj;
    }
  }
}

module.exports = (obj, maxDepth) => {
  try {
    return truncate(obj, maxDepth || 10);
  } catch (e) {
    console.log(e);
    return {};
  }
};
