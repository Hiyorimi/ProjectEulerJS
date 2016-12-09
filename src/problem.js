'use strict'

/**
 * Sets Problem
 * @class Class for projecteuler problem. input_arguments 
 * 
 * @param {String} problem_text - Task as text
 * @param {Object} input_arguments - have default value for backward compatibility
 * @param {Object} arguments - Arguments array 
 */
function Problem (problem_text, input_arguments) {
  input_arguments = typeof input_arguments !== 'undefined' ? input_arguments : NaN;
  this._problem_text = problem_text;
  this._arguments = input_arguments; 
  this.cached_factorials = [1,1,2];
  for (var i=3; i < 10; i++)
    this.cached_factorials.push(this.Factorial(i));
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
 * as String. It also return 0 for backward compatibility
 *
 * @return {Int} 0
 */
Problem.prototype.solve = function () {
  console.log(this.getProblemText() + "\nAnswer: " + this.getSolution());
  return 0; 
}


/**
 * Factorial(n) returns n!
 *
 * @param {Int} n
 * @return {Int} n!
 */
Problem.prototype.Factorial = function (n) {
    var result = 1

    if ( n<=1 ) { 
        return 1; 
    }
    else { 
      while ( n != 1 )
      {
         result = result * n;
         n--;
      }
    }
    return result;
}


/**
 * getDigitsFactorialSum(digits) sum of factorials of digits
 *
 * @param {Array} digits
 * @return {Int} sum
 */
Problem.prototype.getDigitsFactorialSum = function (digits) {
  var sum = 0;
  for (var i in digits) {
    sum += this.Factorial(digits[i]);
  }

  return sum;
}

/**
 * getCachedFactorialSum(digits) sum of factorials of digits
 *
 * @param {Array} digits
 * @return {Int} sum
 */
Problem.prototype.getCachedFactorialSum = function (digits) {
  var sum = 0;
  for (var i in digits) {
    sum += this.cached_factorials[digits[i]];
  }

  return sum;
}


/**
 * getDigits(n) returns digits of input number
 *
 * @param {Int} n
 * @return {Array} digits
 */
Problem.prototype.getDigits = function (n) {
  return n.toString().split('').map(function (elem) {
    return +elem;
  });
}


module.exports = new Problem();
module.exports.Problem = Problem;