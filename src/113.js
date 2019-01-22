'use strict'

let Problem = require('./problem').Problem;
//big-integer is better than BigInt 
let bigInt = require("big-integer");

function Problem113 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem113.prototype = Object.create(Problem.prototype);
Problem113.prototype.constructor = Problem113;


/**
 * getSolution() returns solution of problem
 *
 * @return {Int} denominator
 */
Problem113.prototype.getSolution = function () {

  return bigInt(this.bigIntBinomialCoefficient(100 + 10, 10))
      .add(
          this.bigIntBinomialCoefficient(100 + 9, 9)
              .subtract(bigInt(10 * 100))
          )
      .subtract(2);
}

var problem_text = `Working from left-to-right if no digit is exceeded by the digit to its left 
it is called an increasing number; for example, 134468.
\n
Similarly if no digit is exceeded by the digit to its right it is called a decreasing number; 
for example, 66420.
\n
We shall call a positive integer that is neither increasing nor decreasing a "bouncy" number; 
for example, 155349.
\n
As n increases, the proportion of bouncy numbers below n increases such that there are only 
12951 numbers below one-million that are not bouncy and only 277032 non-bouncy numbers below 1010.
\n
How many numbers below a googol (10^100) are not bouncy?`;


var problem = new Problem113(problem_text, process.argv.splice(
  2,process.argv.length-1));

console.log(problem.getSolution());
