'use strict'

let Problem = require('./problem').Problem

/**
 * Sets Problem49
 * @class Class for solviong projecteuler 49th problem
 * @param {String} problem_text - Task as text
 * @param {Object} arguments - Arguments array 
 */
function Problem49 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
  this._primes = this.sieveOfEratosthenes(10000);
}

Problem49.prototype = Object.create(Problem.prototype);
Problem49.prototype.constructor = Problem49;


/**
 * sieveOfEratosthenes(max) returns primes below max
 * From http://stackoverflow.com/questions/15491291/sieve-of-eratosthenes-algorithm-in-javascript-running-endless-for-large-number
 *
 * @param {Int} max
 * @return {Array} output
 */
Problem49.prototype.sieveOfEratosthenes = function (max) {
    // Eratosthenes algorithm to find all primes under max
    let array = [], upperLimit = Math.sqrt(max), output = [];

    // Make an array from 2 to (n - 1)
    for (let i = 0; i < max; i++) {
        array.push(true);
    }

    // Remove multiples of primes starting from 2, 3, 5,...
    for (let i = 2; i <= upperLimit; i++) {
        if (array[i]) {
            for (let j = i * i; j < max; j += i) {
                array[j] = false;
            }
        }
    }

    // All array[i] set to true are primes
    for (let i = 2; i < max; i++) {
        if(array[i]) {
            output.push(i);
        }
    }

    return output;
}


/**
 * getDigits(n) returns digits of input parameter
 *
 * @param {Int} n
 * @return {Array} digits
 */
Problem49.prototype.getDigits = function (n) {
  return n.toString().split('').map(function (elem) {
    return +elem;
  });
}


/**
 * getPermutations(input_arr) returns all permutations of input_arr elements
 * From: http://stackoverflow.com/questions/9960908/permutations-in-javascript
 * 
 * @param {Int} input_arr - array to permutate
 * @return {Bool} result
 */
Problem49.prototype.getPermutations = function (input_arr) {
  var results = [];

  function permute(arr, memo) {
    var cur, memo = memo || [];

    for (var i = 0; i < arr.length; i++) {
      cur = arr.splice(i, 1);
      if (arr.length === 0) {
        results.push(memo.concat(cur));
      }
      permute(arr.slice(), memo.concat(cur));
      arr.splice(i, 0, cur[0]);
    }

    return results;
  }

  return permute(input_arr);
}


Problem49.prototype.getSolution = function () {
  let permutated_primes = [];
  let permutations = [];
  let permutated_prime = 0;

  console.time("Bruteforce");

  for (let i = 1; i < this._primes.length; i++) {
    if (this._primes[i] > 1000) {
      permutated_primes = [];
      permutations = this.getPermutations(this.getDigits(this._primes[i]));
      for (let j = 0; j < permutations.length; j++) {
        permutated_prime = +permutations[j].join('');

        if ((this._primes.indexOf(permutated_prime) > 0) && 
          (permutated_prime != this._primes[i]) && 
          (permutated_prime > 1000) &&
          (permutated_primes.indexOf(permutated_prime) < 0)) {

          permutated_primes.push(permutated_prime);

        }

        if (permutated_primes.length > 2) {
          if (Math.abs(permutated_primes[0] - permutated_primes[1]) == Math.abs(permutated_primes[1] - permutated_primes[2])) {
            console.timeEnd("Bruteforce");
            console.log(permutated_primes.sort (function (a,b) { return a-b }) );
            return permutated_primes.sort (function (a,b) { return a-b}).join('');
          }
          break;
        }
      }
        
    }
  }

  return 0;
}

let problem_text = `
The arithmetic sequence, 1497, 4917, 8147, in which each of the terms increases by 3330, is unusual in two ways: (i) each of the three terms are prime, and, (ii) each of the 4-digit numbers are permutations of one another.
\n
There are no arithmetic sequences made up of three 1-, 2-, or 3-digit primes, exhibiting this property, but there is one other 4-digit increasing sequence.
\n
What 12-digit number do you form by concatenating the three terms in this sequence?`;


let problem = new Problem49(problem_text, process.argv.splice(2,process.argv.length-1));

problem.solve();
