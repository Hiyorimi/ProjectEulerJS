'use strict'

let Problem = require('./problem').Problem;
let Fraction = require('fraction.js');
let fs = require('fs');

function Problem70 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
  this._primes = this.sieveOfEratosthenes(5000);
}

Problem70.prototype = Object.create(Problem.prototype);
Problem70.prototype.constructor = Problem70;


Problem70.prototype.getHash = function (number) {
  return parseInt(number.toString().split("").sort().join(""));
}

Problem70.prototype.isPermutation = function (number1, number2) {
  if (this.getHash(number1) == this.getHash(number2))
    return true;
  else 
    return false;
}



/**
 * getSolution() returns solution of problem
 *
 * @return {Int} denominator
 */
Problem70.prototype.getSolution = function () {

  console.time("Bruteforce");

  let n = 10,
      phi = 0,
      ratio = 1.,
      index_of_2000 = 0,
      result = 0,
      best_ratio = Number.MAX_SAFE_INTEGER,
      target = 1e7;

  while (this._primes[index_of_2000] < 2000) 
    index_of_2000++;

  for (let i = index_of_2000; i < this._primes.length; i++) {
    for (let j = i + 1; i < this._primes.length - 1; j++) {
        n = this._primes[i] * this._primes[j];
        if ((n > target) || (isNaN(n))) 
          break;
  
        phi = (this._primes[i] - 1) * (this._primes[j] - 1);
        ratio = (n * 1. / phi);
  
        if (this.isPermutation(n, phi) && best_ratio > ratio) {
            result = n;
            best_ratio = ratio;
        }
    }
  }

  console.timeEnd("Bruteforce");

  return result;
}

var problem_text = `
Euler's Totient function, φ(n) [sometimes called the phi function], is used to
 determine the number of positive numbers less than or equal to n which are 
 relatively prime to n. For example, as 1, 2, 4, 5, 7, and 8, are all less 
 than nine and relatively prime to nine, φ(9)=6.
The number 1 is considered to be relatively prime to every positive number, 
so φ(1)=1.
\n
Interestingly, φ(87109)=79180, and it can be seen that 87109 is a 
permutation of 79180.
\n
Find the value of n, 1 < n < 107, for which φ(n) is a permutation of n 
and the ratio n/φ(n) produces a minimum.`;


var problem = new Problem70(problem_text, process.argv.splice(
  2,process.argv.length-1));


problem.solve();
