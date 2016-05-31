'use strict'

/**
     * Sets Problem
     * @class Class for projecteuler problem
     * @param {String} problem_text Task as text
     * @param {Object} arguments Arguments array 
     */
function Problem (problem_text, input_arguments) {
  this._problem_text = problem_text;
  this._arguments = input_arguments; 
}

/**
 * getProblemText() returns text of the problem
 *
 * @return {String} this._problem_text
 */
Problem.prototype.getProblemText = function () {
  return this._problem_text;
}

/**
 * getSolution() is an abstract function for calculating the answer
 *
 * @return {Int} 0
 */
Problem.prototype.getSolution = function () {
  return 0;
}

/**
 * solve() prints _problem_text and answer, for which calls this.getSolution()
 * as String
 *
 * @return Nan
 */
Problem.prototype.solve = function () {
  console.log(this.getProblemText() + "\nAnswer: " + this.getSolution());
}


function Problem35 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem35.prototype = Object.create(Problem.prototype);
Problem35.prototype.constructor = Problem35;


/**
 * getDigits(n) returns digits of input parameter
 *
 * @param {Int} n
 * @return {Array} digits
 */
Problem35.prototype.getDigits = function (n) {
  return n.toString().split('').map(function (elem) {
    return +elem;
  });
}


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
 * sieveOfEratosthenes(max) returns primes below max
 * From http://stackoverflow.com/questions/15471291/sieve-of-eratosthenes-algorithm-in-javascript-running-endless-for-large-number
 *
 * @param {Int} max
 * @return {Array} output
 */
Problem35.prototype.sieveOfEratosthenes = function (max) {
    // Eratosthenes algorithm to find all primes under max
    var array = [], upperLimit = Math.sqrt(max), output = [];

    // Make an array from 2 to (n - 1)
    for (var i = 0; i < max; i++) {
        array.push(true);
    }

    // Remove multiples of primes starting from 2, 3, 5,...
    for (var i = 2; i <= upperLimit; i++) {
        if (array[i]) {
            for (var j = i * i; j < max; j += i) {
                array[j] = false;
            }
        }
    }

    // All array[i] set to true are primes
    for (var i = 2; i < max; i++) {
        if(array[i]) {
            output.push(i);
        }
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


var problem = new Problem35(problem_text, process.argv.splice(2,process.argv.length-1));


problem.solve();
