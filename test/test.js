'use strict'

var assert = require('assert');
let bigInt = require("big-integer");
let Problem = require('../src/problem').Problem;

function ProjectEulerProblemTestCase (number, expected, timeout = 2000) {
  this.problem_number = number
  this.expected = expected
  this.case_timeout = timeout
}

function itShouldTestSingleCase(testCase) {
  let problem_number = testCase.problem_number
  let expected = testCase.expected
  let timeout = testCase.case_timeout
  it('should return ' + expected + ' for ' + problem_number, function (done) {
    this.timeout(timeout)
    let Problem = require('../src/' + problem_number).SolvedProblem;
    var problem = new Problem;
    assert.equal(expected ,problem.getSolution());
    done();
  })
}

describe('Problem', function() {
  describe('#prototype()', function() {
    it('should create new instance without error', function() {
      var problem = new Problem("test problem");
      assert.equal(0, problem.solve());
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
    it('should return true for 3, 5, 13, 1000000007', function() {
      var problem = new Problem("test problem");
      assert.equal(true,problem.isPrime(3));
      assert.equal(true,problem.isPrime(5));
      assert.equal(true,problem.isPrime(13));
      assert.equal(true,problem.isPrime(1000000007));
    });

    it('should return false for 4,6,100', function() {
      var problem = new Problem("test problem");
      assert.equal(false,problem.isPrime(4));
      assert.equal(false,problem.isPrime(6));
      assert.equal(false,problem.isPrime(100));
    });

    it('should return false for negative', function() {
      var problem = new Problem("test problem");
      assert.equal(false,problem.isPrime(-1));
      assert.equal(false,problem.isPrime(-5));
      assert.equal(false,problem.isPrime(-4));
    });
  });

  describe('#factorial()', function () {
    it('should return 6 for 3, 3628800 for 10', function () {
      var problem = new Problem("test problem");
      assert.equal(6,problem.factorial(3));
      assert.equal(3628800,problem.factorial(10));
      assert.equal(1,problem.factorial(1));
    });

    it('should return 1 for n<=1', function () {
      var problem = new Problem("test problem");
      assert.equal(1,problem.factorial(-1));
      assert.equal(1,problem.factorial(-100));
    });
  });

  describe('#getDigits()', function () {
    it('should return digits of the correct number', function () {
      var problem = new Problem("test problem");
      assert.deepStrictEqual([6], problem.getDigits(6));
      assert.deepStrictEqual([1,2],problem.getDigits(12));
      assert.deepStrictEqual([1,2,3,4,5,6,7,8,9],problem.getDigits(123456789));
    });
    it('should should work on numbers represented as strings', function () {
      var problem = new Problem("test problem");
      assert.deepStrictEqual([6], problem.getDigits('6'));
      assert.deepStrictEqual([1,2],problem.getDigits('12'));
      assert.deepStrictEqual([1,2,3,4,5,6,7,8,9],problem.getDigits('123456789'));
    }); 
    it('should should work on bigInt numbers', function () {
      var problem = new Problem("test problem");
      assert.deepStrictEqual([6], problem.getDigits(bigInt('6')));
      assert.deepStrictEqual([1,2],problem.getDigits(bigInt('12')));
      assert.deepStrictEqual([9,0,0,7,1,9,9,2,5,4,7,4,0,9,9,1,9],
        problem.getDigits(bigInt('90071992547409919')));
    });
    it('should handle negative numbers as well', function () {
      var problem = new Problem("test problem");
      assert.deepStrictEqual([6], problem.getDigits(-6));
      assert.deepStrictEqual([1,2],problem.getDigits(-12));
      assert.deepStrictEqual([1,2,3,4,5,6,7,8,9],problem.getDigits(-123456789));
    });
  });

  describe('#sumDigits()', function () {
    it('should return digits of the correct number', function () {
      var problem = new Problem("test problem");
      assert.equal(6, problem.sumDigits(6));
      assert.equal(3,problem.sumDigits(102));
      assert.equal(1,problem.sumDigits(10000));
    });
    it('should should work on numbers represented as strings', function () {
      var problem = new Problem("test problem");
      assert.equal(6, problem.sumDigits('6'));
      assert.equal(3,problem.sumDigits('102'));
      assert.equal(1,problem.sumDigits('00010000'));
    }); 
    it('should should work on bigInt numbers', function () {
      var problem = new Problem("test problem");
      assert.equal(6, problem.sumDigits(bigInt('6')));
      assert.equal(3,problem.sumDigits(bigInt('12')));
      assert.equal(1,problem.sumDigits(bigInt('10000000000000000000')));
    });
    it('should handle negative numbers', function () {
      var problem = new Problem("test problem");
      assert.equal(6, problem.sumDigits(-6));
      assert.equal(3,problem.sumDigits(-102));
      assert.equal(1,problem.sumDigits(-10000));
    });
    it('should handle negative numbers written as strings', function () {
      var problem = new Problem("test problem");
      assert.equal(6, problem.sumDigits('-6'));
      assert.equal(3,problem.sumDigits('-102'));
      assert.equal(1,problem.sumDigits('-00010000'));
    });
  });
});

// Tests for solutions

describe('Problem solutions', function() {

  describe('#Testing solutions of problems from 1 to 9', function () {
    let test_cases = [
      new ProjectEulerProblemTestCase(1, 233168),
      new ProjectEulerProblemTestCase(2, 4613732),
      new ProjectEulerProblemTestCase(3, 6857),
      new ProjectEulerProblemTestCase(4, 906609),
      new ProjectEulerProblemTestCase(5, 232792560),
      new ProjectEulerProblemTestCase(6, 25164150),
      new ProjectEulerProblemTestCase(7, 104743),
      new ProjectEulerProblemTestCase(8, 23514624000),
      new ProjectEulerProblemTestCase(9, 31875000),
    ]
    for (var i in test_cases) {
      itShouldTestSingleCase(test_cases[i])      
    }
  });

  describe('#Testing solution of 119th problem', function () {
    it('should return 248155780267521 for 119th problem', function () {
        let Problem119 = require('../src/119').Problem119;
        var problem = new Problem119;
        assert.equal(bigInt('248155780267521').toString(),problem.getSolution().toString());
    });
  });

  describe('#Testing solution of 56th problem', function () {
    it('should return 972 for 56 problem', function () {
        let Problem = require('../src/56').Problem56;
        var problem = new Problem;
        assert.equal(972 ,problem.getSolution());
    });
  });

  describe('#Testing solutions of problems from 79 to 94 and from 98 to 100', function () {
    let test_cases = [
      new ProjectEulerProblemTestCase(79, 73162890),
      new ProjectEulerProblemTestCase(80, 40886),
      new ProjectEulerProblemTestCase(81, 427337),
      new ProjectEulerProblemTestCase(82, 260324),
      //new ProjectEulerProblemTestCase(83, 425185),
      new ProjectEulerProblemTestCase(84, 101524),
      new ProjectEulerProblemTestCase(85, 2772, 10000),
      new ProjectEulerProblemTestCase(86, 1818),
      new ProjectEulerProblemTestCase(87, 1097343),
      new ProjectEulerProblemTestCase(88, 7587457),
      new ProjectEulerProblemTestCase(89, 743),
      new ProjectEulerProblemTestCase(91, 14234),
      new ProjectEulerProblemTestCase(92, 8581146, 10000),
      new ProjectEulerProblemTestCase(93, 1258),
      new ProjectEulerProblemTestCase(94, 518408346),
      //new ProjectEulerProblemTestCase(95, 14316, 10000),
      //new ProjectEulerProblemTestCase(96, 24702),
      new ProjectEulerProblemTestCase(97, 8739992577),
      new ProjectEulerProblemTestCase(98, 18769, 10000),
      new ProjectEulerProblemTestCase(99, 709),
      new ProjectEulerProblemTestCase(100, 756872327473),
    ]
    for (var i in test_cases) {
      itShouldTestSingleCase(test_cases[i])      
    }
  });

  describe('#Testing solution of 119th problem', function () {
    it('should return 248155780267521 for 119th problem', function () {
        let Problem119 = require('../src/119').Problem119;
        var problem = new Problem119;
        assert.equal(bigInt('248155780267521').toString(),problem.getSolution().toString());
    });
  });

});
