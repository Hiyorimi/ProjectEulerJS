'use strict'

let Problem = require('./problem').Problem;
//big-integer is better than BigInt 
let bigInt = require("big-integer");
let fs = require('fs');

function Problem71 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem71.prototype = Object.create(Problem.prototype);
Problem71.prototype.constructor = Problem71;


/**
 * getSolution() returns solution of problem
 *
 * @return {Int} denominator
 */
Problem71.prototype.getSolution = function () {

  console.time("Bruteforce");

  let limit = 1000000;
  let a = 3;
  let b = 7;
  let r = 0;
  let s = 1;
  let p = 0;
  for (let q = limit; q > 2; q--) {
    p = (a * q - 1) / b;
    if (p * s > r * q) {
      s = q;
      r = p;
    }
  }

  console.timeEnd("Bruteforce");

  return parseInt(r)-1;
}

var problem_text = `
Consider the fraction, n/d, where n and d are positive integers. If n<d 
and HCF(n,d)=1, it is called a reduced proper fraction.
\n
If we list the set of reduced proper fractions for d ≤ 8 in ascending 
order of size, we get:
\n
1/8, 1/7, 1/6, 1/5, 1/4, 2/7, 1/3, 3/8, 2/5, 3/7, 1/2, 4/7, 3/5, 5/8, 
2/3, 5/7, 3/4, 4/5, 5/6, 6/7, 7/8
\n
It can be seen that 2/5 is the fraction immediately to the left of 3/7.
\n
By listing the set of reduced proper fractions for d ≤ 1,000,000 in 
ascending order of size, find the numerator of the fraction immediately to the left of 3/7.`;


var problem = new Problem71(problem_text, process.argv.splice(
  2,process.argv.length-1));


problem.solve();
