'use strict'

let Problem = require('./problem').Problem;
let bigInt = require('big-integer');
let fs = require('fs');

function Problem72 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
  this._primes = this.sieveOfEratosthenes(1000000);
}

Problem72.prototype = Object.create(Problem.prototype);
Problem72.prototype.constructor = Problem72;



/**
 * getSolution() returns solution of problem
 *
 * @return {Int} denominator
 */
Problem72.prototype.getSolution = function () {

  console.time("Bruteforce");

  let n = 10,
      phi = [],
      result = bigInt(0),
      best_ratio = Number.MAX_SAFE_INTEGER,
      limit = 1e6;

  for (let i = 0; i <= limit + 1; i++) phi[i] = i;
  
  for (let i = 2; i <= limit; i++) {
    if (phi[i] == i) {
      for (let j = i; j <= limit; j += i) {
          phi[j] = phi[j] / i * (i - 1);
      }
    }
    result =  result.add(phi[i]);
  }

  console.timeEnd("Bruteforce");

  return result;
}

var problem_text = `
Consider the fraction, n/d, where n and d are positive integers. 
If n<d and HCF(n,d)=1, it is called a reduced proper fraction.
\n
If we list the set of reduced proper fractions for d ≤ 8 in ascending 
order of size, we get:
\n
1/8, 1/7, 1/6, 1/5, 1/4, 2/7, 1/3, 3/8, 2/5, 3/7, 1/2, 4/7, 3/5, 5/8, 
2/3, 5/7, 3/4, 4/5, 5/6, 6/7, 7/8
\n
It can be seen that there are 21 elements in this set.
\n
How many elements would be contained in the set of reduced proper 
fractions for d ≤ 1,000,000?`;


var problem = new Problem72(problem_text, process.argv.splice(
  2,process.argv.length-1));


problem.solve();
