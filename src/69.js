'use strict'

let Problem = require('./problem').Problem;
let Fraction = require('fraction.js');

function Problem69 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
  this._primes = this.sieveOfEratosthenes(1000000);
}

Problem69.prototype = Object.create(Problem.prototype);
Problem69.prototype.constructor = Problem69;


/**
 * totient(n) returns phi(n)
 * 
 * @param {Int} phi(n)
 * @return {Float} value
 */
Problem69.prototype.totient = function (n) {
  if (this.isPrime(n)) 
    return n-1;

  let phi = 1;
  let primes_under_n = this._primes.filter(function(number) {
    if (number < n) 
      return ((n % number) == 0);
    else 
      return false;
  });
  for (let i = 0; i < primes_under_n.length; i++) {
    phi *= 1-Fraction(1).div(primes_under_n[i]);
  }
  return parseInt(n*phi);
}



/**
 * getSolution() returns solution of problem
 *
 * @return {Int} denominator
 */
Problem69.prototype.getSolution = function () {

  console.time("Bruteforce");

  let limit = 1000000;
  let result = 1;
  let i = 0;
  while (result * this._primes[i] < limit) {
    result *= this._primes[i];
    i++;
  }

  console.timeEnd("Bruteforce");

  return result;
}

var problem_text = `
Euler's Totient function, φ(n) [sometimes called the phi function], is 
used to determine the number of numbers less than n which are relatively 
prime to n. For example, as 1, 2, 4, 5, 7, and 8, are all less than nine 
and relatively prime to nine, φ(9)=6.
\n
n	Relatively Prime	φ(n)	n/φ(n)
2	1	1	2
3	1,2	2	1.5
4	1,3	2	2
5	1,2,3,4	4	1.25
6	1,5	2	3
7	1,2,3,4,5,6	6	1.1666...
8	1,3,5,7	4	2
9	1,2,4,5,7,8	6	1.5
10	1,3,7,9	4	2.5
It can be seen that n=6 produces a maximum n/φ(n) for n ≤ 10.
\n
Find the value of n ≤ 1,000,000 for which n/φ(n) is a maximum.`;


var problem = new Problem69(problem_text, process.argv.splice(2,process.argv.length-1));


problem.solve();
