'use strict'

const Problem = require('./problem').Problem;

function Problem3 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem3.prototype = Object.create(Problem.prototype);
Problem3.prototype.constructor = Problem3;

const problem_text = `The prime factors of 13195 are 5, 7, 13 and 29.
\n
What is the largest prime factor of the number 600851475143 ?`


Problem3.prototype.getSolution = function () {
  let result = 0;
  let number = 600851475143;
  const primes_less_than_number = this.sieveOfEratosthenes(8000);
  const factors = [];
  let d = 2;

  while (number > 1) {
    while (number % d === 0) {
      factors.push(d);
      number /= d;
    }
    d = d + 1;
    if (d * d > number) { 
      if (number > 1) factors.push(number);
      break;
    }
  }

  result = factors[factors.length - 1];
  return result;
}


if (require.main === module) {
  const problem = new Problem3(problem_text, process.argv.splice(2, process.argv.length - 1));
  problem.solve();
} else {
  module.exports.SolvedProblem = Problem3;
}
