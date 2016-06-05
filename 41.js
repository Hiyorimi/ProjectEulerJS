'use strict'

let Problem = require('./problem').Problem

/**
 * Sets Problem41
 * @class Class for solviong projecteuler 41th problem
 * @param {String} problem_text - Task as text
 * @param {Object} arguments - Arguments array 
 */
function Problem41 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
  //Since 8 and 9-th digit pandigitals are disible by 3 (sum of diigts is divisible by 3)
  this._primes = this.sieveOfEratosthenes(7654321);
}

Problem41.prototype = Object.create(Problem.prototype);
Problem41.prototype.constructor = Problem41;


/**
 * sieveOfEratosthenes(max) returns primes below max
 * From http://stackoverflow.com/questions/15471291/sieve-of-eratosthenes-algorithm-in-javascript-running-endless-for-large-number
 *
 * @param {Int} max
 * @return {Array} output
 */
Problem41.prototype.sieveOfEratosthenes = function (max) {
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
 * isPandigital(arr) returns true if all digits are different and are in range 1-arr.length
 *
 * @param {Object} arr 
 * @return {Bool} result
 */
Problem41.prototype.isPandigital = function (arr) {

  let result = true;
  let s = '';
  let chars = {};

  for (let i = 0; i < arr.length; i++) {
    s = arr[i].toString();
    for (let j = 0; j < s.length; j++) {
      if (s[j]=='0') {
        result = false;
        break;
      }
      if (!(s[j] in chars)) {
        chars[s[j]] = 1;
      }
      else {
        result = false;
        break;
      }
    }
  }

  for (let i = 0; i < arr.length; i++) {
    if (arr.indexOf(i+1) < 0)
        result = false;
  }


  return result;
}


/**
 * getDigits(n) returns digits of input parameter
 *
 * @param {Int} n
 * @return {Array} digits
 */
Problem41.prototype.getDigits = function (n) {
  return n.toString().split('').map(function (elem) {
    return +elem;
  });
}




Problem41.prototype.getSolution = function () {

    let result = 1;

    console.time("Bruteforce");
    
    for (let i = this._primes.length-1; result < 2; i--){
        if (this.isPandigital(this.getDigits(this._primes[i])))
            result = this._primes[i];
    }

    console.timeEnd("Bruteforce");

    return result;
}

let problem_text = `
We shall say that an n-digit number is pandigital if it makes use of all the digits 1 to n exactly once. For example, 2143 is a 4-digit pandigital and is also prime.
\n
What is the largest n-digit pandigital prime that exists?`;


let problem = new Problem41(problem_text, process.argv.splice(2,process.argv.length-1));

problem.solve();
