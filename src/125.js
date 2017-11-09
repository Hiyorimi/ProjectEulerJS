'use strict'

let Problem = require('./problem').Problem;

function Problem125 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem125.prototype = Object.create(Problem.prototype);
Problem125.prototype.constructor = Problem125;



/**
 * getSolution() returns solution of problem
 *
 * @return {Int} denominator
 */
Problem125.prototype.getSolution = function () {

  console.time("Bruteforce");
  let result = 0,
      i = 0,
      j = 0,
      limit = 1e8,
      list = {};

  for (i = 1; i <= 10000; i++) {
    let number = i*i;
    for (j = i+1; j <= 10000; j++) {
      number += j*j
      if (number > limit)
        break;
      if (this.isPalindrom(number.toString()) && !(number in list)) {
        result += number;
        list[number] = 0;
      }
    }
  }

  console.timeEnd("Bruteforce");

  return result;
}

var problem_text = `https://projecteuler.net/problem=125`;


var problem = new Problem125(problem_text, process.argv.splice(
  2,process.argv.length-1));


problem.solve();
