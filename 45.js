'use strict'

let Problem = require('./problem').Problem

/**
 * Sets Problem45
 * @class Class for solviong projecteuler 45th problem
 * @param {String} problem_text - Task as text
 * @param {Object} arguments - Arguments array 
 */
function Problem45 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem45.prototype = Object.create(Problem.prototype);
Problem45.prototype.constructor = Problem45;


/**
 * isPentagonal(n) return true if x is a pentagonal number
 *
 * @param {Int} n
 * @return {Bool} 
 */
Problem45.prototype.isPentagonal = function (n) {
  let x = (Math.sqrt(24*n+1)+1) / 6

  if (x == parseInt(x,10))
    return true;

  return false;
}

Problem45.prototype.getSolution = function () {

    let solution_found = false;
    let result = 0;
    //since H_143 = 40755
    let i = 143;

    console.time("Bruteforce");

    //Triangular number based on odd n is a hexagonal number
    while (!solution_found) {
      i++;
      result = i * (2 * i - 1);
      if (this.isPentagonal(result))
          solution_found = true;
    } 

    console.timeEnd("Bruteforce");

    return result;
}

let problem_text = `
Triangle, pentagonal, and hexagonal numbers are generated by the following formulae:
\n
Triangle    Tn=n(n+1)/2   1, 3, 6, 10, 15, ...
Pentagonal    Pn=n(3n−1)/2    1, 5, 12, 22, 35, ...
Hexagonal   Hn=n(2n−1)    1, 6, 15, 28, 45, ...
It can be verified that T285 = P165 = H143 = 40755.
\n
Find the next triangle number that is also pentagonal and hexagonal.`;


let problem = new Problem45(problem_text, process.argv.splice(2,process.argv.length-1));

problem.solve();
