'use strict'

let Problem = require('./problem').Problem;

function Problem77 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
  this._primes = this.sieveOfEratosthenes(1000);
}

Problem77.prototype = Object.create(Problem.prototype);
Problem77.prototype.constructor = Problem77;



/**
 * getSolution() returns solution of problem
 *
 * @return {Int} denominator
 */
Problem77.prototype.getSolution = function () {

  console.time("Bruteforce");

  let target = 2;
  
  while (true) {
    let ways = [];
    for (let i = 0; i <= target; i++) {
      ways[i] = 0;
    }
    ways[0] = 1;

    for (let i = 0; i < this._primes.length; i++) 
      for (let j = this._primes[i]; j <= target; j++) 
        ways[j] += ways[j - this._primes[i]];
    if (ways[target] > 5000)
      break;
    target++;
  }

  console.timeEnd("Bruteforce");

  return target;
}

var problem_text = `
It is possible to write ten as the sum of primes in exactly five different 
ways:
\n
7 + 3
5 + 5
5 + 3 + 2
3 + 3 + 2 + 2
2 + 2 + 2 + 2 + 2
\n
What is the first value which can be written as the sum of primes in over 
five thousand different ways?`;


var problem = new Problem77(problem_text, process.argv.splice(
  2,process.argv.length-1));


problem.solve();
