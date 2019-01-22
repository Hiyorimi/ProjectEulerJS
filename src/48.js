'use strict'

let Problem = require('./problem').Problem

/**
 * Sets Problem48
 * @class Class for solviong projecteuler 48th problem
 * @param {String} problem_text - Task as text
 * @param {Object} arguments - Arguments array 
 */
function Problem48 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
  this._primes = this.sieveOfEratosthenes(100000);
}

Problem48.prototype = Object.create(Problem.prototype);
Problem48.prototype.constructor = Problem48;


/**
 * getAllPrimeFactors(target) returns array of prime factors of a number
 * Based on https://jsfiddle.net/JamesOR/RC7SY/
 *
 * @param {Int} target
 * @return {Array} factors
 */
Problem48.prototype.getAllPrimeFactors = function (target) {
  var factors = [], i;
        
  for (i = 2; i <= target; i++) {
      while ((target % i) === 0) {
          factors.push(i);
          target /= i;
      }
  }
  
  return factors;
}

/**
 * hasNDistinctPrimeFactors(number) returns true if number can be represented as multiplication of 4 primes
 *
 * @param {Int} n
 * @return {Bool} 
 */
Problem48.prototype.hasNDistinctPrimeFactors = function (number, n) {
  n = typeof n !== 'undefined' ? n : 2;

  let factors = this.getAllPrimeFactors(number);
  let primes = []
  
  for (let i = 0; i < factors.length; i++) {
    if (primes.indexOf(factors[i]) < 0)
        primes.push(factors[i])
  }

  return primes.length == n;
}


Problem48.prototype.getSolution = function () {

  console.time("Bruteforce");

  for (let i = 648; i < 1000000; i++) {
    let result = true;
    for (let j = 0; j < 4; j++) {
      if (!this.hasNDistinctPrimeFactors(i+j,4))
        result = false;
    }
    if (result)
      return i;
  }

  console.timeEnd("Bruteforce");

  return 0;
}

let problem_text = `
The series, 11 + 22 + 33 + ... + 1010 = 10405071317.
\n
Find the last ten digits of the series, 11 + 22 + 33 + ... + 10001000.`;


let problem = new Problem48(problem_text, process.argv.splice(2,process.argv.length-1));

problem.solve();
