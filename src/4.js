'use strict'

const Problem = require('./problem').Problem;

function Problem4 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem4.prototype = Object.create(Problem.prototype);
Problem4.prototype.constructor = Problem4;

const problem_text = `A palindromic number reads the same both ways. The largest 
palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.
\n
Find the largest palindrome made from the product of two 3-digit numbers.`;


Problem4.prototype.getSolution = function () {
  let result = 0;
  let palindroms = [];
  for (let i = 999; i > 100; i--) {
    for (let j = i; j > 100; j--) {
      result = i * j;
      if (this.isPalindrom(result.toString())) {
        palindroms.push(result);
	      break;
      }
    }
  } 

  return Math.max.apply(null, palindroms);
}

if (require.main === module) {
  const problem = new Problem4(problem_text, process.argv.splice(2, process.argv.length - 1));
  problem.solve();
} else {
  module.exports.SolvedProblem = Problem4;
}
