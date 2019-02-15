'use strict'

let Problem = require('./problem').Problem;

function Problem179 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem179.prototype = Object.create(Problem.prototype);
Problem179.prototype.constructor = Problem179;


/**
 * getSolution() returns solution of problem
 *
 * @return {BigInt} a_30
 */
Problem179.prototype.getSolution = function () {
  if (require.main === module) {
    console.time('Bruteforce');
  }
  let count = 0;
  const limit = 1e7;
  const numberOfDivisors = [];
  for (let i = 0; i < limit + 1; i++) {
    numberOfDivisors[i] = 0;
  }

  for (let i = 2; i < limit + 1; i++) {
    for (let j = 2; i * j <= limit; j++) {
      numberOfDivisors[i * j]++;
    }
  }

  for (let n = 2; n < limit; n++) {
    if (numberOfDivisors[n] === numberOfDivisors[n + 1]) {
      count++;
    }
  }

  if (require.main === module) {
    console.timeEnd('Bruteforce');
  }

  return count;
};

var problem_text = `
Find the number of integers 1 < n < 107, for which n and n + 1 have the same number of positive 
divisors. For example, 14 has the positive divisors 1, 2, 7, 14 while 15 has 1, 3, 5, 15.`;


var problem = new Problem179(problem_text, process.argv.splice(
  2,process.argv.length-1));


if (require.main === module) {
    problem.solve();
  } else {
    module.exports.Problem179 = Problem179;
}
