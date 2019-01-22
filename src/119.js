'use strict'

let Problem = require('./problem').Problem;
// big-integer is better than BigInt 
let bigInt = require("big-integer");

function Problem119 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem119.prototype = Object.create(Problem.prototype);
Problem119.prototype.constructor = Problem119;

/**
 * sortBigIntsArray() sorts array of arrays, having bigInts as 0 element
 * 
 * @return {Array} sorted
 */
function sortBigIntsArray(arr) {
  function compare(a,b) {
    if (a[0].lesser(b[0]))
      return -1;
    if (a[0].greater(b[0]))
      return 1;
    return 0;
  }

  return arr.sort(compare)
}

/**
 * getSolution() returns solution of problem
 *
 * @return {BigInt} a_30
 */
Problem119.prototype.getSolution = function () {

  if (require.main === module) {
    console.time("Bruteforce");
  }
  let sequence = []
  let result = 0

  for (let base = 2; base < 80; base++) {
    let powered = bigInt(base)
    for (let power = 2; power < 10; power++) {
      powered = powered.multiply(base)
      if (this.sumDigits(powered) == base) {
        sequence.push([powered, base, power])
      }
      if (sequence.length > 50)
        break;
    }
    if (sequence.length > 50)
      break;
  }

  sequence = sortBigIntsArray(sequence)

  if (require.main === module) {
    console.timeEnd("Bruteforce");
  }

  return sequence[29][0];
}

var problem_text = `
The number 512 is interesting because it is equal to the sum of its digits 
raised to some power: 5 + 1 + 2 = 8, and 83 = 512. Another example of a 
number with this property is 614656 = 284.
\n
We shall define an to be the nth term of this sequence and insist that a 
number must contain at least two digits to have a sum.
\n
You are given that a2 = 512 and a10 = 614656.
\n
Find a30.`;


var problem = new Problem119(problem_text, process.argv.splice(
  2,process.argv.length-1));


if (require.main === module) {
    problem.solve();
  } else {
    module.exports.Problem119 = Problem119;
}
