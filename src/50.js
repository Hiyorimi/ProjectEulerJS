'use strict'

let Problem = require('./problem').Problem

/**
 * Sets Problem50
 * @class Class for solviong projecteuler 50th problem
 * @param {String} problem_text - Task as text
 * @param {Object} arguments - Arguments array 
 */
function Problem50 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
  this._primes = this.sieveOfEratosthenes(1000000);
}

Problem50.prototype = Object.create(Problem.prototype);
Problem50.prototype.constructor = Problem50;


Problem50.prototype.getSolution = function () {
  let target_prime = 953;
  let current_length = 0;
  let primes_sum = [];

  console.time("Bruteforce");

  primes_sum[0] = 0;

  // We can search only for primes in the cumulative sum
  // Primes: 2, 3,  5,  7, 11, 13
  // Sums:   2, 5, 10, 17, 28, 41
  // Since  sum(from 5 to 13) = sum(13) – sum(3) = 41 - 5 = 
  // = 36 = 5 + 7 + 11 + 13
  for (let i = 0; i < this._primes.length; i++) {
      primes_sum[i+1] = primes_sum[i] + this._primes[i];
  }
   
  for (let i = current_length; i < primes_sum.length; i++) {
      for (let j = i - (current_length+1); j >= 0; j--) {
          if (primes_sum[i] - primes_sum[j] > 1000000) 
            break;
   
          if (this._primes.indexOf(primes_sum[i] - primes_sum[j]) >= 0) {
              current_length = i - j;
              target_prime = primes_sum[i] - primes_sum[j];
          }
      }
  }

  console.timeEnd("Bruteforce");

  return target_prime;
}

let problem_text = `
The prime 41, can be written as the sum of six consecutive primes:
\n
41 = 2 + 3 + 5 + 7 + 11 + 13
This is the longest sum of consecutive primes that adds to a prime below one-hundred.
\n
The longest sum of consecutive primes below one-thousand that adds to a prime, contains 21 terms, and is equal to 953.
\n
Which prime, below one-million, can be written as the sum of the most consecutive primes?`;


let problem = new Problem50(problem_text, process.argv.splice(2,process.argv.length-1));

problem.solve();
