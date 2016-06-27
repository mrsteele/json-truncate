'use strict'

// Tests suite
const chai = require('chai');
chai.should();
const expect = chai.expect;

// The star of the show
JSON.truncate = require('../');

// Helper
const createDeep = levels => {

    const createALevel = (obj, level) => {
        obj.bool = true;
        obj.num = 10;
        obj.str = `You are on level ${level}`;
        obj.arr = [true, 1, 'hi'];
        obj.sub = {};
        return obj;
    };

    let rootobj = {};
    let levelsCopy = levels;

    let refobj = rootobj;
    while (levelsCopy > 0) {
        levelsCopy--;
        createALevel(refobj, levels - levelsCopy);
        if (levelsCopy > 0) {
            refobj = refobj.sub;
        } else {
            refobj.sub = undefined;
            refobj.arr = undefined;
        }
    }

    //refobj.sub = undefined;
    return rootobj;
};

describe('JSONtruncate', () => {

    describe('defaults', () => {

        it('should truncate to 1', () => {
            JSON.truncate(createDeep(3), 1).should.deep.equal(createDeep(1));
        });

        it('should truncate to default (10)', () => {
            JSON.truncate(createDeep(15)).should.deep.equal(createDeep(10));
        });

        it('should truncate arrays and nested objects', () => {
            JSON.truncate([createDeep(3)], 2).should.deep.equal([createDeep(1)]);
        });

        it('should return flat objects', () => {
            [5, true, false, "hello"].map(val => {
              JSON.truncate(val, 5).should.equal(val);
            });
        });
      
        it('should return an empty with anything not jsonable', () => {
          JSON.truncate(function(){}, 5).should.deep.equal({});
        });
      
        it('should return an empty object with a bad maxDepth value', () => {
          expect(JSON.truncate({test: true}, {bad:true})).to.be.undefied;
        });
      
        it('should resolve recursive objects', () => {
            // setting up a recursive object
            const recursive = {
              test: true
            };
            Object.defineProperty(recursive, 'sub', {
              value: recursive,
              enumerable: true
            });
          
            JSON.truncate(recursive, 2).should.deep.equal({test: true, sub: {test: true, sub: undefined}});
        });

    });

});
