'use strict'

var assert = require('assert');
let Problem = require('../src/problem').Problem;

describe('Problem', function() {
  describe('#prototype()', function() {
    it('should create new instance without error', function() {
      var problem = new Problem("test problem");
      assert.equal(0,problem.solve());
    });
  });

  describe('#getSolution() override', function() {
    it('should override getSolution without error', function() {
      function TestProblem (problem_text, input_arguments) {
          Problem.apply(this, arguments);
        }

        TestProblem.prototype = Object.create(Problem.prototype);
        TestProblem.prototype.constructor = TestProblem;
        
        TestProblem.prototype.getSolution = function () {
            return 1;
        };

      var problem = new TestProblem("test problem");
      assert.equal(1,problem.getSolution());
    });
  });

  describe('#isPrime()', function() {
    it('should return true for 3,5,13,17', function() {
      var problem = new Problem("test problem");
      assert.equal(true,problem.isPrime(3));
      assert.equal(true,problem.isPrime(5));
      assert.equal(true,problem.isPrime(13));
      assert.equal(true,problem.isPrime(17));
    });

    it('should return fale for 4,6,100', function() {
      var problem = new Problem("test problem");
      assert.equal(false,problem.isPrime(4));
      assert.equal(false,problem.isPrime(6));
      assert.equal(false,problem.isPrime(100));
    });
  });

  describe('#factorial()', function () {
    it('should return 6 for 3, 3628800 for 10, 1 for n<=1', function () {
      var problem = new Problem("test problem");
      assert.equal(6,problem.factorial(3));
      assert.equal(3628800,problem.factorial(10));
      assert.equal(1,problem.factorial(1));
      assert.equal(1,problem.factorial(-1));
    });
  });

});
