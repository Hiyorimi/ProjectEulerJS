'use strict'

let Problem = require('./problem').Problem;
//big-integer is better than BigInt 
let bigInt = require("big-integer");

function Problem63 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem63.prototype = Object.create(Problem.prototype);
Problem63.prototype.constructor = Problem63;


/**
 * getSolution() returns solution of problem
 *
 * @return {Int} denominator
 */
Problem63.prototype.getSolution = function () {

  console.time("Bruteforce");

  let base = 1;
  let exponent = 1;
  let result = 0;
  let raised_number = bigInt(0);
  for (; base < 10; base++) {
    for (exponent = 1; exponent < 1000; exponent++) {
      raised_number = bigInt(base).pow(exponent);
      if (raised_number.toString().length == exponent) {
        result++;
      }
    }
  }

  console.timeEnd("Bruteforce");

  return result;
}

var problem_text = `
The 5-digit number, 16807=7^5, is also a fifth power. Similarly, the 9-digit 
number, 134217728=8^9, is a ninth power.
\n
How many n-digit positive integers exist which are also an n-th power?`;


var problem = new Problem63(problem_text, process.argv.splice(
  2,process.argv.length-1));


problem.solve();
