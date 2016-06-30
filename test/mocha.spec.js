/* global describe, it */

'use strict'

// Tests suite
var chai = require('chai')
chai.should()
var expect = chai.expect

// The stars of the show
var src = require('../src/json-truncate')
var dist = require('../dist/json-truncate')

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
  createTestsFor(src, 'source')
  createTestsFor(dist, 'distributed')
})

function createTestsFor (m, name) {
  describe(name, function () {
    it('should truncate to 1', function () {
      m(createDeep(3), 1).should.deep.equal(createDeep(1))
    })

    it('should truncate to default (10)', function () {
      m(createDeep(15)).should.deep.equal(createDeep(10))
    })

    it('should truncate arrays and nested objects', function () {
      m([createDeep(3)], 2).should.deep.equal([createDeep(1)])
    })

    it('should return flat objects', function () {
      ;[5, true, false, 'hello'].map(function (val) {
        m(val, 5).should.equal(val)
      })
    })

    it('should return an empty with anything not jsonable', function () {
      m(function () {}, 5).should.deep.equal({})
    })

    it('should return an empty object with a bad maxDepth value', function () {
      expect(m({
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

      m(recursive, 2).should.deep.equal({
        test: true,
        sub: {
          test: true,
          sub: undefined
        }
      })
    })
  })
}
