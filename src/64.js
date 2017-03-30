'use strict'

let Problem = require('./problem').Problem;
//big-integer is better than BigInt 
let bigInt = require("big-integer");

function Problem64 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem64.prototype = Object.create(Problem.prototype);
Problem64.prototype.constructor = Problem64;


/**
 * checkIfThereIsPeriod(arr) returns a sequence period or false
 *
 * @param {Array} arr — arity of polygonal number to generate
 * @return {Bool} result
 */
Problem.prototype.checkIfThereIsPeriod = function (arr) {
  if ((arr.length % 2 != 0) || (arr.length < 7))
    return false;
  else {
    let half_length = arr.length / 2;
    for (let i = 0; i < half_length; i++){
      if (arr[i] != arr[half_length + i])
        return false;
    }
    return true;
  }
}

/**
 * getPeriod(N) returns the sequence with period
 * According to: https://en.wikipedia.org/wiki/Methods_of_computing_square_roots#Continued_fraction_expansion
 *
 * @param {Int} S to calculate root for
 * @return {Array} Sequence
 */
Problem64.prototype.getPeriodLength = function (S) {
    let period_length = 0,
        m = 0,
        d = 1,
        a_0 = Math.floor(Math.sqrt(S)),
        a = a_0;
    
    if (a_0 * a_0 == S)
        return 0;

    // Condition from Wikipedia
    while (a != 2 * a_0) {
        m = d * a - m;
        d = (S - m * m) / d;
        a = Math.floor( (a_0 + m) / d );
        period_length++;
    }

    return period_length;
}


/**
 * getSolution() returns solution of problem
 *
 * @return {Int} denominator
 */
Problem64.prototype.getSolution = function () {

  console.time("Bruteforce");

  let result = 0,
      period_length = 0;
  for (let i = 2; i <= 10000; i++) {
      period_length = this.getPeriodLength(i);
      if (period_length % 2 != 0)
          result++;
  }

  console.timeEnd("Bruteforce");

  return result;
}

var problem_text = `
Problem text includes some complicated fractions, so it is better viewed at:
https://projecteuler.net/problem=64`;


var problem = new Problem64(problem_text, process.argv.splice(
  2,process.argv.length-1));


problem.solve();
