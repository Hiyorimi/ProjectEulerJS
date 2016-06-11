'use strict'

let Problem = require('./problem').Problem

/**
 * Sets Problem44
 * @class Class for solviong projecteuler 44th problem
 * @param {String} problem_text - Task as text
 * @param {Object} arguments - Arguments array 
 */
function Problem44 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem44.prototype = Object.create(Problem.prototype);
Problem44.prototype.constructor = Problem44;


/**
 * getNthPentagonal(n) returns Nth pentagonal number
 *
 * @param {Int} n
 * @return {Int} 
 */
Problem44.prototype.getNthPentagonal = function (n) {
  return n*(3*n-1)/2;
}

/**
 * isInt(value) returns true if value is of Int type
 *
 * @param {Int} n
 * @return {Bool} 
 */
Problem44.prototype.isInt = function(value) {
  var x = parseFloat(value);
  return !isNaN(value) && (x | 0) === x;
}

/**
 * isPentagonal(n) return true if x is a pentagonal number
 *
 * @param {Int} n
 * @return {Bool} 
 */
Problem44.prototype.isPentagonal = function (n) {
  let x = (Math.sqrt(24*n+1)+1) / 6

  if (x == parseInt(x,10))
    return true;

  return false;
}
Problem44.prototype.getSolution = function () {

    let pentagonal_numbers = [];
    let first, difference = 0;
    let solution_found = false;
    let top = 0;

    console.time("Bruteforce");

    //increment top boundary iteratevely
    while (!solution_found) {
      top += 1000
      for (let i = 1; i < top; i++) {
        first = this.getNthPentagonal(i);
        for (let j = i; j < top; j++) {
          difference = this.getNthPentagonal(j);
          if (this.isPentagonal(first+difference) && this.isPentagonal(first + first + difference))
            return difference;
        }
      }
    }

    console.timeEnd("Bruteforce");

    return 0;
}

let problem_text = `
Pentagonal numbers are generated by the formula, Pn=n(3n−1)/2. The first ten pentagonal numbers are:
\n
1, 5, 12, 22, 35, 51, 70, 92, 117, 145, ...
\n
It can be seen that P4 + P7 = 22 + 70 = 92 = P8. However, their difference, 70 − 22 = 48, is not pentagonal.
\n
Find the pair of pentagonal numbers, Pj and Pk, for which their sum and difference are pentagonal and D = |Pk − Pj| is minimised; what is the value of D?`;


let problem = new Problem44(problem_text, process.argv.splice(2,process.argv.length-1));

problem.solve();
