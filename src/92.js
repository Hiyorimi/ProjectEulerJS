'use strict'

let Problem = require('./problem').Problem;
//big-integer is better than BigInt 
let bigInt = require("big-integer");

function Problem92 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem92.prototype = Object.create(Problem.prototype);
Problem92.prototype.constructor = Problem92;


/**
 * getDigits(n) returns digits of input parameter
 *
 * @param {Int} n
 * @return {Array} digits
 */
Problem92.prototype.getDigits = function (n) {
  return n.toString().split('').map(function (elem) {
    return +elem;
  });
}

/**
 * getNextChainElement(n) returns next chain element
 *
 * @param {Int} n
 * @return {Int} result
 */
Problem92.prototype.getDigitsSquare = function (n) {
  return this.getDigits(n).reduce(function (result, digit) {
      return result + digit*digit;
  },0)
}

/**
 * getSolution() returns solution of problem
 *
 * @return {Int} denominator
 */
Problem92.prototype.getSolution = function () {

  console.time("Caching");

  let limit = 10000000;
  let cache = [];
  let result = 0;
  let chain_ending = 0;
  let next_chain_number = 0;
  // 9^2 * 7 = 587, so we can cache first 587 endings
  for (let i = 1; i < 588; i++) {
      next_chain_number = this.getDigitsSquare(i);

      while ((next_chain_number != 89) && (next_chain_number != 1)) {
        next_chain_number = this.getDigitsSquare(next_chain_number);
      }
      if (next_chain_number==89) 
        result++;
      cache[i] = next_chain_number;
  }
  for (let i = 588; i < limit; i++) {

      next_chain_number = this.getDigitsSquare(i);
      while ((next_chain_number != 89) && (next_chain_number != 1)) {
        next_chain_number = this.getDigitsSquare(next_chain_number);
        if (next_chain_number < 588) {
            next_chain_number = cache[next_chain_number];
        }
      }
      if (next_chain_number==89) 
        result++;
  }

  console.timeEnd("Caching");

  return result;
}

var problem_text = `
A number chain is created by continuously adding the square of the digits in 
a number to form a new number until it has been seen before.
\n
For example,
\n
44 → 32 → 13 → 10 → 1 → 1
85 → 89 → 145 → 42 → 20 → 4 → 16 → 37 → 58 → 89
\n
Therefore any chain that arrives at 1 or 89 will become stuck in an endless 
loop. What is most amazing is that EVERY starting number will eventually 
arrive at 1 or 89.
\n
How many starting numbers below ten million will arrive at 89?`;


var problem = new Problem92(problem_text, process.argv.splice(
  2,process.argv.length-1));


problem.solve();
