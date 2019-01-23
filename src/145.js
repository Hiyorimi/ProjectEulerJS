'use strict'

let Problem = require('./problem').Problem;

function Problem145 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem145.prototype = Object.create(Problem.prototype);
Problem145.prototype.constructor = Problem145;


function intDiv(a,b) {
  var result = a / b;
  if (result >= 0)
    return Math.floor(result);
  else
    return Math.ceil(result);
}

Problem145.prototype.reverseInt = function (number) {
  let reversed = 0;
  while (number > 0) {
      reversed = 10 * reversed + number % 10;
      number = intDiv(number, 10);
  }
  return reversed;
}


Problem145.prototype.allDigitsAreOddInt = function (number) {
  while (number > 0) {
    if ((number % 10) % 2 == 0) return false;
    number = intDiv(number, 10);
  }
  return true
}

/**
 * getSolution() returns solution of problem
 *
 * @return {BigInt} a_30
 */
Problem145.prototype.getSolution = function () {

  if (require.main === module) {
    console.time("Bruteforce");
  }
  let limit = 1e9+1;
  let count = 0;
  let found = {};

  for (let i = 11; i < limit; i+= 2) {
    if ((i % 10 != 0) && !(i in found)) {
      let number = i;
      let reversed_number = this.reverseInt(number);
      if (this.allDigitsAreOddInt(number+reversed_number)) {
        found[number] = true;
        found[reversed_number] = true;
        count += 1;
      }
    }
  }

  if (require.main === module) {
    console.timeEnd("Bruteforce");
  }

  return 2*count;
}

var problem_text = `
Some positive integers n have the property that the sum [ n + reverse(n) ] consists entirely of
 odd (decimal) digits. For instance, 36 + 63 = 99 and 409 + 904 = 1313. We will call such 
 numbers reversible; so 36, 63, 409, and 904 are reversible. Leading zeroes are not 
 allowed in either n or reverse(n).
\n
There are 120 reversible numbers below one-thousand.
\n
How many reversible numbers are there below one-billion (10^9)?`;


var problem = new Problem145(problem_text, process.argv.splice(
  2,process.argv.length-1));


if (require.main === module) {
    problem.solve();
  } else {
    module.exports.Problem145 = Problem145;
}
