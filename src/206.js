'use strict'

const Problem = require('./problem').Problem;
const bigInt = require("big-integer");

function Problem206 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem206.prototype = Object.create(Problem.prototype);
Problem206.prototype.constructor = Problem206;

function doesntComplyWithMask(number, mask) {
  return !mask.test(number.toString());
}

/**
 * getSolution() returns solution of problem
 *
 * @return {Int} denominator
 */
Problem206.prototype.getSolution = function () {
  let mask = /1.2.3.4.5.6.7.8.9/;
  let maximalNumber = bigInt('19293949596979899');
  let n = bigInt('138902663'); // Math.floor(Math.sqrt(maximalNumber)) + 1;
  while (doesntComplyWithMask(n.square(), mask)) {
    console.log(n);
    n = n.subtract(2);
  }
  return n.multiply(10);
}

var problem_text = `https://projecteuler.net/problem=206`;


var problem = new Problem206(problem_text, process.argv.splice(
  2,process.argv.length-1));

if (require.main === module) {
    problem.solve();
} else {
    module.exports.SolvedProblem = Problem206;
}
