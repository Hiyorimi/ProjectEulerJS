'use strict'

const Problem = require('./problem').Problem;

function Problem35 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem35.prototype = Object.create(Problem.prototype);
Problem35.prototype.constructor = Problem35;


/**
 * getCircularNumbers(max) returns all circular numbers based on digits
 *
 * @param {Array} arr
 * @return {Array} output
 */
Problem35.prototype.getCircularNumbers = function (arr) {
    var output = [];

    for (var i = 1; i < arr.length; i++){
      output.push(+arr.slice(i).concat(arr.slice(0,i)).join(''));
    }

    return output;
}

/**
 * getSolution() returns solution of problem
 *
 * @return {Int} sum
 */
Problem35.prototype.getSolution = function () {

  var primes = this.sieveOfEratosthenes(1000000);
  var circular_primes = [], circulars = [], digits = [];
  var is_circular = true;
   
  //BruteForse approach

  //measuring time
  console.time("Bruteforce");
  for (var i = 0; i < primes.length; i++) {
    digits = this.getDigits(primes[i]);
    circulars = this.getCircularNumbers(digits);
    is_circular = true;
    for (var j = 0; j < circulars.length; j++) {
      if (primes.indexOf(circulars[j]) == -1) {
        is_circular = false;
      }
    }
    if (is_circular)
      circular_primes.push(i);
  }   
  console.timeEnd("Bruteforce");

  return circular_primes.length;
}

var problem_text = `
The number, 197, is called a circular prime because all rotations of the digits: 197, 971, and 719, are themselves prime.
\n
There are thirteen such primes below 100: 2, 3, 5, 7, 11, 13, 17, 31, 37, 71, 73, 79, and 97.
\n
How many circular primes are there below one million?`;



if (require.main === module) {
  const problem = new Problem35(problem_text, process.argv.splice(2, process.argv.length - 1));
  problem.solve();
} else {
  module.exports.SolvedProblem = Problem35;
}
