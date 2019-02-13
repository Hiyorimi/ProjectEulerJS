'use strict'

let Problem = require('./problem').Problem;

function Problem124 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem124.prototype = Object.create(Problem.prototype);
Problem124.prototype.constructor = Problem124;



/**
 * getSolution() returns solution of problem
 *
 * @return {Int} denominator
 */
Problem124.prototype.getSolution = function () {

  console.time("Bruteforce");
  let result = 0,
      i = 0,
      j = 0,
      radical = 0,
      limit = 1e5,
      radicals= [];

  for (i = 0; i <  limit + 1; i++) {
    radical = this.getRadical(i);
    radicals.push([i, radical]);
  }

  radicals.sort( (a, b) => {
    if (a[1] === b[1]) {
      return a[0] - b[0];
    }
    return a[1] - b[1];
  });

  console.timeEnd("Bruteforce");

  return radicals[10000];
}

var problem_text = `https://projecteuler.net/problem=124`;


var problem = new Problem124(problem_text, process.argv.splice(
  2,process.argv.length-1));

if (require.main === module) {
    problem.solve();
} else {
    module.exports.SolvedProblem = Problem124;
}
