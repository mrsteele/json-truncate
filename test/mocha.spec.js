/* global describe, it */
import chai from 'chai'
import src from '../src/json-truncate'

const expect = chai.expect
chai.should()

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

describe('JSONtruncate', () => {
  it('should truncate to 1', () => {
    src(createDeep(3), 1).should.deep.equal(createDeep(1))
  })

  it('should truncate to default (10)', () => {
    src(createDeep(15)).should.deep.equal(createDeep(10))
  })

  it('should truncate arrays and nested objects', () => {
    src([createDeep(3)], 2).should.deep.equal([createDeep(1)])
  })

  it('should truncate arrays and nested objects with replacement string', () => {
    const replacement = '[replaced]'
    src([createDeep(3, replacement)], {maxDepth: 2, replace: replacement}).should.deep.equal([createDeep(1, replacement)])
  })

  it('should replace truncated values with undefined when replace prop is not a string', () => {
    const replacement = 3
    src([createDeep(3)], {maxDepth: 2, replace: replacement}).should.deep.equal([createDeep(1, replacement)])
  })

  it('should return flat objects', () => {
    ;[5, true, false, 'hello'].map(val => {
      src(val, 5).should.equal(val)
    })
  })

  it('should return an empty with anything not jsonable', () => {
    src(() => {}, 5).should.deep.equal({})
  })

  it('should return an empty object with a bad maxDepth value', () => {
    expect(src({
      test: true
    }, {
      maxDepth: {
        bad: true
      }
    })).to.be.equal(undefined)
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

    src(recursive, 2).should.deep.equal({
      test: true,
      sub: {
        test: true,
        sub: undefined
      }
    })
  })

  it('should be configurable globally', () => {
    try {
      const replacement = '[replaced]'
      src.config({
        maxDepth: 2,
        replace: replacement
      })
      src([createDeep(3, replacement)]).should.deep.equal([createDeep(1, replacement)])
    } finally {
      src.reset()
    }
  })
})
