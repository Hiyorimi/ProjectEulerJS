'use strict'

const Problem = require('./problem').Problem;

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
