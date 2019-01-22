'use strict'

const Problem = require('./problem').Problem;


function Problem34 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
  this.factorials = [1,1,2];
  for (var i=3; i < 10; i++)
    this.factorials.push(this.factorial(i));
}

Problem34.prototype = Object.create(Problem.prototype);
Problem34.prototype.constructor = Problem34;


Problem34.prototype.factorial = function (n) {
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
 * getDigits(n) returns digits of input parameter
 *
 * @param {Int} n
 * @return {Array} digits
 */
Problem34.prototype.getDigits = function (n) {
  return n.toString().split('').map(function (elem) {
    return +elem;
  });
}



/**
 * getDigitsFactorialSum(digits) sum of factorials of digits
 *
 * @param {Array} digits
 * @return {Int} sum
 */
Problem34.prototype.getDigitsFactorialSum = function (digits) {
  var sum = 0;
  for (var i in digits) {
    sum += this.factorial(digits[i]);
  }

  return sum;
}

/**
 * getCachedFactorialSum(digits) sum of factorials of digits
 *
 * @param {Array} digits
 * @return {Int} sum
 */
Problem34.prototype.getCachedFactorialSum = function (digits) {
  var sum = 0;
  for (var i in digits) {
    sum += this.factorials[digits[i]];
  }

  return sum;
}

/**
 * getSolution() returns solution of problem
 *
 * @return {Int} sum
 */
Problem34.prototype.getSolution = function () {

  var digits = [];
  var factorial = 0;
  var results = [];

   
  //BruteForse approach

  //measuring time
  console.time("Bruteforce");
  //2540161 is 9!*7
  for (var i = 10; i < 2540161; i++) {
    digits = this.getDigits(i);
    factorial = this.getDigitsFactorialSum(digits);
    if (factorial == i)
      results.push(i);
  }   
  console.timeEnd("Bruteforce");
  
  //cached factorials
  results = [];
  console.time("Cached factorials");
  for (var i = 10; i < 2540161; i++) {
    digits = this.getDigits(i);
    factorial = this.getCachedFactorialSum(digits);
    if (factorial == i)
      results.push(i);
  }   
  console.timeEnd("Cached factorials");


  return results.reduce(function (sum, elem) {
    return sum+elem;
  });
}

var problem_text = `
145 is a curious number, as 1! + 4! + 5! = 1 + 24 + 120 = 145.
\n
Find the sum of all numbers which are equal to the sum of the factorial of their digits.
\n
Note: as 1! = 1 and 2! = 2 are not sums they are not included.`;


var problem = new Problem34(problem_text, process.argv.splice(2,process.argv.length-1));


problem.solve();
