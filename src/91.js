'use strict'

let Problem = require('./problem').Problem;

function Problem91 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem91.prototype = Object.create(Problem.prototype);
Problem91.prototype.constructor = Problem91;



/**
 * getSolution() returns solution of problem
 *
 * @return {Int} denominator
 */
Problem91.prototype.getSolution = function () {

  if (require.main === module) {
    console.time("Bruteforce");
  }

  let size = 50;
  let result = size*size*3;
  for (let x = 1; x <= size; x++) {
      for (let y = 1; y <= size; y++) {
          let fact = this.gcd(x, y);
          result += Math.min(parseInt(y*fact /x), parseInt(parseInt(size - x)*fact /y)) * 2;
      }
  }

  if (require.main === module) {
    console.timeEnd("Bruteforce");
  }

  return result;
}

var problem_text = `https://projecteuler.net/problem=91`;


var problem = new Problem91(problem_text, process.argv.splice(
  2,process.argv.length-1));


if (require.main === module) {
    problem.solve();
  } else {
    module.exports.SolvedProblem = Problem91;
}