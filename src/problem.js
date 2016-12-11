'use strict'

/**
 * Sets Problem
 * @class Class for projecteuler problem. input_arguments 
 * 
 * @param {String} problem_text - Task as text
 * @param {Object} input_arguments - have default value for backward compatibility
 * @param {Object} arguments - Arguments array 
 */
function Problem (problem_text, input_arguments) {
  input_arguments = typeof input_arguments !== 'undefined' ? input_arguments : NaN;
  this._problem_text = problem_text;
  this._arguments = input_arguments; 
  this.cached_factorials = [1,1,2];
  for (var i=3; i < 10; i++)
    this.cached_factorials.push(this.Factorial(i));
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
 * as String. It also return 0 for backward compatibility
 *
 * @return {Int} 0
 */
Problem.prototype.solve = function () {
  console.log(this.getProblemText() + "\nAnswer: " + this.getSolution());
  return 0; 
}


/**
 * is_prime(number) checks if number is a prime
 *
 * @param {Int} number
 * @return {Int} denominator or false
 */
Problem.prototype.is_prime = function (number) {
    var start = 2;
    while (start <= Math.sqrt(number)) {
        if (number % start++ < 1) return false;
    }
    return number > 1;
}

/**
 * Factorial(n) returns n!
 *
 * @param {Int} n
 * @return {Int} n!
 */
Problem.prototype.Factorial = function (n) {
    var result = 1

    if ( n<=1 ) { 
        return 1; 
    }
    else { 
      while ( n != 1 )
      {
         result = result * n;
         n--;
      }
    }
    return result;
}


/**
 * getDigitsFactorialSum(digits) sum of factorials of digits
 *
 * @param {Array} digits
 * @return {Int} sum
 */
Problem.prototype.getDigitsFactorialSum = function (digits) {
  var sum = 0;
  for (var i in digits) {
    sum += this.Factorial(digits[i]);
  }

  return sum;
}

/**
 * getCachedFactorialSum(digits) sum of factorials of digits
 *
 * @param {Array} digits
 * @return {Int} sum
 */
Problem.prototype.getCachedFactorialSum = function (digits) {
  var sum = 0;
  for (var i in digits) {
    sum += this.cached_factorials[digits[i]];
  }

  return sum;
}


/**
 * getDigits(n) returns digits of input number
 *
 * @param {Int} n
 * @return {Array} digits
 */
Problem.prototype.getDigits = function (n) {
  return n.toString().split('').map(function (elem) {
    return +elem;
  });
}


/**
 * getPermutations(input_arr) returns all permutations of input_arr elements
 * From: http://stackoverflow.com/questions/9960908/permutations-in-javascript
 * 
 * @param {Int} input_arr - array to permutate
 * @return {Array} permutated
 */
Problem.prototype.getPermutations = function (input_arr) {
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



/**
 * sieveOfEratosthenes(max) returns primes below max
 * From http://stackoverflow.com/questions/15491291/sieve-of-eratosthenes-algorithm-in-javascript-running-endless-for-large-number
 *
 * @param {Int} max
 * @return {Array} output
 */
Problem.prototype.sieveOfEratosthenes = function (max) {
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
 * getSortedKeys(onj) returns dictionary sorted by values
 *
 * @param {Dict} obj
 * @return {Array} sorted array of keys (desc)
 */
Problem.prototype.getSortedKeys = function (obj) {
    var keys = []; for(var key in obj) keys.push(key);
    return keys.sort(function(a,b){return obj[a]-obj[b]});
}


/**
 * getDivisors(number) returns number divisors
 * from http://jsfiddle.net/r8wh715t/
 * 
 * @param {Int} number
 * @return {Array} divisors
 */
Problem.prototype.getDivisors = function (num, exclude_self) {
    var exclude_self = typeof exclude_self !== 'undefined' ? exclude_self : false;
    var divisors = [1] // 1 will be a part of every solution.
    var half = Math.floor(num / 2), // Ensures a whole number <= num.
        i, j;

    // Determine out increment value for the loop and starting point.
    num % 2 === 0 ? (i = 2, j = 1) : (i = 3, j = 2);

    for (i; i <= half; i += j) {
        num % i === 0 ? divisors.push(i) : false;
    }

    if (!exclude_self)
      divisors.push(num); // 
    return divisors;
}


/**
 * getProperDivisors(number) returns number proper divisors.
 * The proper divisors of a number are all the divisors 
 * excluding the number itself.
 * from http://jsfiddle.net/r8wh715t/
 * 
 * @param {Int} number
 * @return {Array} proper_divisors
 */
Problem.prototype.getProperDivisors = function (num) {
    return this.getDivisors(num, true);
}


/**
 * isPalindrom() is a function for checking if input string is palindrom
 *
 * @param {String} str - input string
 * @return {Bool} 
 */
Problem.prototype.isPalindrom = function (str) {
    return str == str.split('').reverse().join('');
}

module.exports = new Problem();
module.exports.Problem = Problem;