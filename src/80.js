'use strict'

let Problem = require('./problem').Problem;
//big-integer is better than BigInt 
let bigInt = require("big-integer");
let fs = require('fs');

function Problem80 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem80.prototype = Object.create(Problem.prototype);
Problem80.prototype.constructor = Problem80;


/**
 * getDigits(n) returns digits of input parameter
 *
 * @param {Int} n
 * @return {Array} digits
 */
Problem80.prototype.getDigits = function (n) {
  return n.toString().split('').map(function (elem) {
    return +elem;
  });
}

/**
 * squareRoot(n) returns 100 digits of sqaure root of n
 * by http://www.afjarvis.staff.shef.ac.uk/maths/jarvisspec02.pdf
 * 
 * @param {Int} n
 * @return {Array} result
 */
Problem80.prototype.squareRoot = function (n) {
  let result = [];
  let a = bigInt(5 * n),
      b = bigInt(5);
  
  while (b.toString().length <= 101) {
      if (a.geq(b)) {
          a = a.minus(b);
          b = b.plus(10);
      }
      else {
          a = a.multiply(100);
          // add a zero to b just before the final 
          // digit (which will always be ‘5’).
          b = ((b.divide(10)).multiply(100)).plus(5);
      }
  }

  return b.divide(100);
}

/**
 * getSolution() returns solution of problem
 *
 * @return {Int} denominator
 */
Problem80.prototype.getSolution = function () {

  console.time("Bruteforce");
  let j = 1,
      result = 0;
  for (let i = 1; i <= 100; i++) {
      if (j * j == i) {
          j++;
          continue;
      }
      result += this.squareRoot(i).toString().split('')
          .reduce( (p, c) => {
          return p+parseInt(c);
      },0);
  }

  console.timeEnd("Bruteforce");

  return result;
}

var problem_text = `
It is well known that if the square root of a natural number is 
not an integer, then it is irrational. The decimal expansion of 
such square roots is infinite without any repeating pattern at all.

The square root of two is 1.41421356237309504880..., and the 
digital sum of the first one hundred decimal digits is 475.

For the first one hundred natural numbers, find the total of 
the digital sums of the first one hundred decimal digits for all
 the irrational square roots.`;


var problem = new Problem80(problem_text, process.argv.splice(
  2,process.argv.length-1));


problem.solve();
