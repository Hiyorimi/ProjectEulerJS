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


function Problem32 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem32.prototype = Object.create(Problem.prototype);
Problem32.prototype.constructor = Problem32;


/**
 * areDigitsDifferent(num) returns true if all digits are different
 *
 * @param {Int} num
 * @return {Bool} result
 */
Problem32.prototype.areDigitsDifferent = function (num) {

  var result = true;
  var s = num.toString();
  var chars = {}, rv = '';

  for (var i = 0; i < s.length; i++) {
    if (!(s[i] in chars)) {
      chars[s[i]] = 1;
    }
    else {
      result = false;
    }
  }

  return result;
}

/**
 * isPandigital(arr) returns true if all digits are different and are in range 1-9
 *
 * @param {Int} arr of three or more numbers
 * @return {Bool} result
 */
Problem32.prototype.isPandigital = function (arr) {

  var result = true;
  var s = '';
  var chars = {};

  for (var i = 0; i < arr.length; i++) {
    s = arr[i].toString();
    for (var j = 0; j < s.length; j++) {
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


  return result;
}



/**
 * getSolution() calculates in how many different ways can target in pences
 * be represented using any number of coins.
 * target is included as a parameter to demostrate speed up by using 
 * dynamic programming
 *
 * @param {Int} target
 * @return {Int} ways
 */
Problem32.prototype.getSolution = function () {

  var products = {};
  var sum = 0;
  var product = 0;
   
  //BruteForse approach

  //measuring time
  console.time("Bruteforce");
  for (var a = 1; a < 9876; a += 1) {
    if (this.areDigitsDifferent(a)){
      for (var b = 1; b < 9876; b += 1) {
        product = a*b;
        if ((product % 10 == 0) 
          || (product.toString().length + a.toString().length + b.toString().length != 9)){
          continue;
        }
        if (this.isPandigital([a,b,product])) {
          if (!(product in products)) {
            sum += product;
            products[product]=1;
          }
        }
      }
    }
  }
  console.timeEnd("Bruteforce");


  return sum;
}

var problem_text = `
We shall say that an n-digit number is pandigital if it makes use of all the digits 1 to n exactly once; for example, the 5-digit number, 15234, is 1 through 5 pandigital.
\n
The product 7254 is unusual, as the identity, 39 × 186 = 7254, containing multiplicand, multiplier, and product is 1 through 9 pandigital.
\n
Find the sum of all products whose multiplicand/multiplier/product identity can be written as a 1 through 9 pandigital.
\n
HINT: Some products can be obtained in more than one way so be sure to only include it once in your sum.`;


var problem = new Problem32(problem_text, process.argv.splice(2,process.argv.length-1));


problem.solve();
