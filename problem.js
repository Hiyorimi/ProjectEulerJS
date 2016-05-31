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



module.exports = new Problem();
module.exports.Problem = Problem;