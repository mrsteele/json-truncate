/* global describe, it */

'use strict'

// Tests suite
import chai from 'chai'
const expect = chai.expect
chai.should()

// The stars of the show
import src from '../src/json-truncate'
import dist from '../dist/json-truncate'
const entry = require('../')

// Helper
const createDeep = (levels, replace) => {
  const createALevel = (obj, level) => {
    obj.bool = true
    obj.num = 10
    obj.str = 'You are on level ' + level
    obj.arr = [true, 1, 'hi']
    obj.sub = {}
    obj.null = null
    obj.undefined = undefined
    return obj
  }

  const rootobj = {}
  let levelsCopy = levels

  let refobj = rootobj
  while (levelsCopy > 0) {
    levelsCopy--
    createALevel(refobj, levels - levelsCopy)
    if (levelsCopy > 0) {
      refobj = refobj.sub
    } else {
      refobj.sub = replace
      refobj.arr = replace
    }
  }

  return rootobj
}

const createTestsFor = (m, name) => {
  describe(name, () => {
    it('should truncate to 1', () => {
      m(createDeep(3), 1).should.deep.equal(createDeep(1))
    })

    it('should truncate to default (10)', () => {
      m(createDeep(15)).should.deep.equal(createDeep(10))
    })

    it('should truncate arrays and nested objects', () => {
      m([createDeep(3)], 2).should.deep.equal([createDeep(1)])
    })

    it('should truncate arrays and nested objects with replacement string', () => {
      const replacement = '[replaced]';
      m([createDeep(3, replacement)], 2, {replace: replacement}).should.deep.equal([createDeep(1, replacement)])
    })

    it('should replace truncated values with undefined when replace prop is not a string', () => {
      const replacement = 3;
      m([createDeep(3)], 2, {replace: replacement}).should.deep.equal([createDeep(1)])
    })

    it('should return flat objects', () => {
      ;[5, true, false, 'hello'].map(val => {
        m(val, 5).should.equal(val)
      })
    })

    it('should return an empty with anything not jsonable', () => {
      m(() => {}, 5).should.deep.equal({})
    })

    it('should return an empty object with a bad maxDepth value', () => {
      expect(m({
        test: true
      }, {
        bad: true
      })).to.be.undefied
    })

    it('should resolve recursive objects', () => {
      // setting up a recursive object
      const recursive = {
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

describe('entry', () => {
  it('should load either the source or the dist', () => {
    entry.should.be.oneOf([src, dist])
  })
})

describe('JSONtruncate', () => {
  createTestsFor(src, 'source')
  createTestsFor(dist, 'distributed')
})
