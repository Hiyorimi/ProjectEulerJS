'use strict'

let Problem = require('./problem').Problem;
//big-integer is better than BigInt 
let bigInt = require("big-integer");

function Problem97 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem97.prototype = Object.create(Problem.prototype);
Problem97.prototype.constructor = Problem97;


/**
 * getSolution() returns solution of problem
 *
 * @return {Int} denominator
 */
Problem97.prototype.getSolution = function () {

  console.time("Bruteforce");

  let mod = 10000000000;
  let power = 7830457;
  let result = (28433 * bigInt(2).modPow(power,mod)+1) % (mod);

  console.timeEnd("Bruteforce");

  return result;
}

var problem_text = `
The first known prime found to exceed one million digits was discovered in 
1999, and is a Mersenne prime of the form 2^6972593−1; it contains exactly
 2,098,960  digits. Subsequently other Mersenne primes, of the form 2p−1, 
 have been found which contain more digits.
\n
However, in 2004 there was found a massive non-Mersenne prime which contains 
2,357,207 digits: 28433×2^7830457+1.
\n
Find the last ten digits of this prime number.`;


var problem = new Problem97(problem_text, process.argv.splice(
  2,process.argv.length-1));


problem.solve();
