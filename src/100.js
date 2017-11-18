'use strict'

let Problem = require('./problem').Problem;
//big-integer is better than BigInt 
let bigInt = require("big-integer");
let fs = require('fs');

function Problem100 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem100.prototype = Object.create(Problem.prototype);
Problem100.prototype.constructor = Problem100;


/**
 * getSolution() returns solution of problem
 *
 * @return {Int} denominator
 */
Problem100.prototype.getSolution = function () {

  if (require.main === module) {
      console.time("Bruteforce");
  }

  let b = bigInt('15'),
      n = bigInt('21'),
      n_t = bigInt('0'),
      b_t = bigInt('0');
  let target = bigInt('1e12');

  // while n < target
  while (n.compare(target) < 0) {
    // b_t = b * 3 + n * 2 - 2
    b_t = ((b.multiply(3)).add(n.multiply(2))).subtract(2);
    // n_t = 4 * b + 3 * n - 3
    n_t = (b.multiply(4)).add(n.multiply(3)).subtract(3);

    b = b_t;
    n = n_t;
  }

  if (require.main === module) {
      console.timeEnd("Bruteforce");
  }

  return b_t;
}

var problem_text = `
If a box contains twenty-one coloured discs, composed of fifteen blue discs 
and six red discs, and two discs were taken at random, it can be seen that 
the probability of taking two blue discs, P(BB) = (15/21)×(14/20) = 1/2.
\n
The next such arrangement, for which there is exactly 50% chance of taking 
two blue discs at random, is a box containing eighty-five blue discs and 
thirty-five red discs.
\n
By finding the first arrangement to contain over 1012 = 1,000,000,000,000 
discs in total, determine the number of blue discs that the box would 
contain.`;


var problem = new Problem100(problem_text, process.argv.splice(
  2,process.argv.length-1));

if (require.main === module) {
    problem.solve();
} else {
    module.exports.Problem100 = Problem100;
}


