'use strict'

const Problem = require('./problem').Problem;

function Problem5 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem5.prototype = Object.create(Problem.prototype);
Problem5.prototype.constructor = Problem5;


const problem_text = `2520 is the smallest number that can be divided by each of the 
numbers from 1 to 10 without any remainder.
\n
What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?`;


Problem5.prototype.getSolution = function () {
  let result = 1000;
  const exit = true;
  let divisible = true;
  while (exit) {
    divisible = true;
    for (let i = 20; i > 1; i--) {
      if (result % i !== 0) {
        divisible = false;
        break;
      }
    }
    if (divisible) return result
    result ++;
  }
}

if (require.main === module) {
  const problem = new Problem5(problem_text, process.argv.splice(2, process.argv.length - 1));
  problem.solve();
} else {
  module.exports.SolvedProblem = Problem5;
}
