'use strict'

const Problem = require('./problem').Problem;

function Problem6 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem6.prototype = Object.create(Problem.prototype);
Problem6.prototype.constructor = Problem6;

const problem_text = `The sum of the squares of the first ten natural numbers is,
\n
12 + 22 + ... + 102 = 385
The square of the sum of the first ten natural numbers is,
\n
(1 + 2 + ... + 10)2 = 552 = 3025
Hence the difference between the sum of the squares of the first ten natural numbers 
and the square of the sum is 3025 − 385 = 2640.
\n
Find the difference between the sum of the squares of the first one hundred natural 
numbers and the square of the sum.`


Problem6.prototype.getSolution = function() {
  var result = 0;
  var squares = [];
  var numbers = [];
  for (var i=1; i<101; i++) {
    squares.push(i*i);
    numbers.push(i); 
  } 

  var a = numbers.reduce(function(sum, current) {
    return sum + current;
  });

  return a*a - squares.reduce(function(sum, current) {
    return sum + current;
  });
}

if (require.main === module) {
  const problem = new Problem6(problem_text, process.argv.splice(2, process.argv.length - 1));
  problem.solve();
} else {
  module.exports.SolvedProblem = Problem6;
}

