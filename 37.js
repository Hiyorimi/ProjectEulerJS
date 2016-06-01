'use strict'

let Problem = require('./problem').Problem

/**
 * Sets Problem37
 * @class Class for solviong projecteuler 37th problem
 * @param {String} problem_text - Task as text
 * @param {Object} arguments - Arguments array 
 */
function Problem37 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
  this._primes = this.sieveOfEratosthenes(1000000);
}

Problem37.prototype = Object.create(Problem.prototype);
Problem37.prototype.constructor = Problem37;

/**
 * sieveOfEratosthenes(max) returns primes below max
 * From http://stackoverflow.com/questions/15471291/sieve-of-eratosthenes-algorithm-in-javascript-running-endless-for-large-number
 *
 * @param {Int} max
 * @return {Array} output
 */
Problem37.prototype.sieveOfEratosthenes = function (max) {
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
 * isPrime(n) checks if number is in this._primes
 *
 * @param {Int} num
 * @return {Bool} result
 */
Problem37.prototype.isPrime = function (num) {
  return (this._primes.indexOf(num) > -1) ? true : false;
}



/**
 * getDigits(n) returns digits of input parameter
 *
 * @param {Int} n
 * @return {Array} digits
 */
Problem37.prototype.getDigits = function (n) {
  return n.toString().split('').map(function (elem) {
    return +elem;
  });
}


/**
 * isInteresting(n) returns digits of input parameter
 *
 * @param {Int} n - number of prime
 * @return {Array} digits
 */
Problem37.prototype.isInteresting = function (n) {
    let digits = this.getDigits(this._primes[n]);
    let reverse_digits = this.getDigits(this._primes[n]).reverse();

    if (digits.indexOf(0)>-1)
        return false;

    let is_interesting = true;
    let number = 0, reversed_number = 0;
    for (let i = 1; i < digits.length; i++) {
        number = +digits.slice(i).join('');
        reversed_number = +reverse_digits.slice(i).reverse().join('');
        if ( (! this.isPrime(number)) || (! this.isPrime(reversed_number))) {
            is_interesting = false;
            break;
        }
    }
    return is_interesting;
}


Problem37.prototype.getSolution = function () {
    let sum = 0;
    let counter = 0;

    console.time("Bruteforce");
    for (let i = 4; (i < this._primes.length) && (counter < 12); i++){
        if (this.isInteresting(i)) {
            sum += this._primes[i];
            counter++;
            console.log(this._primes[i]);
        }
    }
    console.timeEnd("Bruteforce");

    return sum;
}

let problem_text = `
The number 3797 has an interesting property. Being prime itself, it is possible to continuously remove digits from left to right, and remain prime at each stage: 3797, 797, 97, and 7. Similarly we can work from right to left: 3797, 379, 37, and 3.
\n
Find the sum of the only eleven primes that are both truncatable from left to right and right to left.
\n
NOTE: 2, 3, 5, and 7 are not considered to be truncatable primes.`;


let problem = new Problem37(problem_text, process.argv.splice(2,process.argv.length-1));

problem.solve();
