'use strict'

/**
     * Sets Problem
     * @class Class for projecteuler problem
     * @param {String} problem_text Task as text
     * @param {Object} arguments Arguments array 
     */
function Problem (problem_text, input_arguments) {
  this._problem_text = problem_text;
  this._arguments = input_arguments; 
}

/**
 * getProblemText() returns text of the problem
 *
 * @return {String} this._problem_text
 */
Problem.prototype.getProblemText = function () {
  return this._problem_text;
}

/**
 * getSolution() is an abstract function for calculating the answer
 *
 * @return {Int} 0
 */
Problem.prototype.getSolution = function () {
  return 0;
}

/**
 * solve() prints _problem_text and answer, for which calls this.getSolution()
 * as String
 *
 * @return Nan
 */
Problem.prototype.solve = function () {
  console.log(this.getProblemText() + "\nAnswer: " + this.getSolution());
}


function Problem243 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
  this._primes = this.sieveOfEratosthenes(1000);
}

Problem243.prototype = Object.create(Problem.prototype);
Problem243.prototype.constructor = Problem243;

Problem243.prototype.isPrime = function (a) {
  return (this._primes.indexOf(a) > 0);
}

/**
 * getSolution() returns solution of problem
 *
 * @return {Int} denominator
 */
Problem243.prototype.getSolution = function () {

  let Fraction = require('fraction.js');

  //From https://github.com/nayuki/Project-Euler-solutions/blob/master/python/p243.py
  let TARGET = Fraction(15499).div(94744);
  let totient = 1;
  let denominator = 1;
  let p = 2, numer = 0, denom = 0;

  while (true) {
    totient *= p - 1;
    denominator *= p;

    while (true) {
      p += 1
      if (this.isPrime(p))
        break
    }
    
    if (Fraction(totient).div(denominator) < TARGET)
      for (let i = 1; 1 < p; i++) {
        numer = i * totient;
        denom = i * denominator;
        if (Fraction(numer).div(denom - 1) < TARGET)
          return denom
      }
  }
}

var problem_text = `
A positive fraction whose numerator is less than its denominator is called a proper fraction.
For any denominator, d, there will be d−1 proper fractions; for example, with d = 12:
1/12 , 2/12 , 3/12 , 4/12 , 5/12 , 6/12 , 7/12 , 8/12 , 9/12 , 10/12 , 11/12 .
\n
We shall call a fraction that cannot be cancelled down a resilient fraction.
Furthermore we shall define the resilience of a denominator, R(d), to be the ratio of its proper fractions that are resilient; for example, R(12) = 4/11 .
In fact, d = 12 is the smallest denominator having a resilience R(d) < 4/10 .
\n
Find the smallest denominator d, having a resilience R(d) < 15499/94744 .`;


var problem = new Problem243(problem_text, process.argv.splice(2,process.argv.length-1));


problem.solve();
