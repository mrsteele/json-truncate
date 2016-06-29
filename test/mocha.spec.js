/* global describe, it */

'use strict'

// Tests suite
var chai = require('chai')
chai.should()
var expect = chai.expect

// The star of the show
JSON.truncate = require('../src/json-truncate')

// Helper
var createDeep = function (levels) {
  var createALevel = function (obj, level) {
    obj.bool = true
    obj.num = 10
    obj.str = 'You are on level ' + level
    obj.arr = [true, 1, 'hi']
    obj.sub = {}
    return obj
  }

  var rootobj = {}
  var levelsCopy = levels

  var refobj = rootobj
  while (levelsCopy > 0) {
    levelsCopy--
    createALevel(refobj, levels - levelsCopy)
    if (levelsCopy > 0) {
      refobj = refobj.sub
    } else {
      refobj.sub = undefined
      refobj.arr = undefined
    }
  }

  return rootobj
}

describe('JSONtruncate', function () {
  describe('defaults', function () {
    it('should truncate to 1', function () {
      JSON.truncate(createDeep(3), 1).should.deep.equal(createDeep(1))
    })

    it('should truncate to default (10)', function () {
      JSON.truncate(createDeep(15)).should.deep.equal(createDeep(10))
    })

    it('should truncate arrays and nested objects', function () {
      JSON.truncate([createDeep(3)], 2).should.deep.equal([createDeep(1)])
    })

    it('should return flat objects', function () {
      ;[5, true, false, 'hello'].map(function (val) {
        JSON.truncate(val, 5).should.equal(val)
      })
    })

    it('should return an empty with anything not jsonable', function () {
      JSON.truncate(function () {}, 5).should.deep.equal({})
    })

    it('should return an empty object with a bad maxDepth value', function () {
      expect(JSON.truncate({
        test: true
      }, {
        bad: true
      })).to.be.undefied
    })

    it('should resolve recursive objects', function () {
      // setting up a recursive object
      var recursive = {
        test: true
      }
      Object.defineProperty(recursive, 'sub', {
        value: recursive,
        enumerable: true
      })

      JSON.truncate(recursive, 2).should.deep.equal({
        test: true,
        sub: {
          test: true,
          sub: undefined
        }
      })
    })
  })
})
