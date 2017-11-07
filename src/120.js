'use strict'

let Problem = require('./problem').Problem;

function Problem120 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem120.prototype = Object.create(Problem.prototype);
Problem120.prototype.constructor = Problem120;



/**
 * getSolution() returns solution of problem
 *
 * @return {Int} denominator
 */
Problem120.prototype.getSolution = function () {

  console.time("Bruteforce");
  let result = 0;
  for (let a = 3; a <= 1000; a++)
    result += 2 * a * parseInt((a-1) / 2);

  console.timeEnd("Bruteforce");

  return result;
}

var problem_text = `https://projecteuler.net/problem=120`;


var problem = new Problem120(problem_text, process.argv.splice(
  2,process.argv.length-1));


problem.solve();
