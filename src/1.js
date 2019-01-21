'use strict'

const Problem = require('./problem').Problem;

function Problem1 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem1.prototype = Object.create(Problem.prototype);
Problem1.prototype.constructor = Problem1;

const problem_text = 'If we list all the natural numbers below 10 that are multiples of \
3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.\
\n\
Find the sum of all the multiples of 3 or 5 below 1000.';


/**
 * getSolution() returns solution of problem
 *
 * @return {Int} sum
 */
Problem1.prototype.getSolution = function () {
  let sum = 0;
  for (let i = 3; i < 1000; i++) {
    if (((i % 3) === 0) || ((i % 5) === 0)) {
      sum += i;
    }
  }
  return sum;
};


if (require.main === module) {
  const problem = new Problem1(problem_text, process.argv.splice(2, process.argv.length - 1));
  problem.solve();
} else {
  module.exports.SolvedProblem = Problem1;
}