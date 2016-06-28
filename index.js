'use strict';

const flatTypes = ["string", "number", "boolean"];
const isFlat = function(val) {
    return flatTypes.indexOf(typeof(val)) !== -1;
}

const truncate = function(obj, maxDepth, curDepth) {
    curDepth = curDepth || 0;

    if (curDepth < maxDepth) {
        const newDepth = curDepth + 1;

        if (isFlat(obj)) {
            return obj;
        } else if (Array.isArray(obj)) {
            let newObj = [];
            obj.map(function(value) {
                if (isFlat(value)) {
                    newObj.push(value);
                } else {
                    newObj.push(truncate(value, maxDepth, newDepth));
                }
            });
            return newObj;
        } else {
            let newObj = {};
            for (let key in obj) {
                if (isFlat(obj[key])) {
                    newObj[key] = obj[key];
                } else {
                    newObj[key] = truncate(obj[key], maxDepth, newDepth)
                }
            }
            return newObj;
        }
    }
}

module.exports = function(obj, maxDepth) {
    try {
        return truncate(obj, maxDepth || 10);
    } catch (e) {
        console.log(e);
        return {};
    }
};
