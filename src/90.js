'use strict'

let Problem = require('./problem').Problem;

function Problem90 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem90.prototype = Object.create(Problem.prototype);
Problem90.prototype.constructor = Problem90;

/**
 * areValidCombinations() checks if combinations are valid in terms of a problem
 *
 * @return {Bool} result
 */
Problem90.prototype.areValidCombinations = function (d1, d2) {
  let combs = [ [0, 1], [0, 4], [0,6], [1,6], [2,5], [3,6], [4,6], [6,4], [8,1] ];

  let valid = true;
  for (let i = 0; i < combs.length; i++) {
      // If we don't have numbers in either of combinations
      if (
        !( d1.indexOf(combs[i][0]) > -1 && d2.indexOf(combs[i][1]) > -1) &&
        !( d2.indexOf(combs[i][0]) > -1 && d1.indexOf(combs[i][1]) > -1)
        ) {
          valid = false;
          break;
        }
  }
  return valid;
}

/**
 * getSolution() returns solution of problem
 *
 * @return {Int} denominator
 */
Problem90.prototype.getSolution = function () {

  console.time("Bruteforce");

  let result = 0;
  let combinations = this.k_combinations([0,1,2,3,4,5,6,7,8,9], 6);
  for (let i = 0; i < combinations.length; i++) {
    let c1 = combinations[i].sort();
    if (c1[c1.length - 1] == 9)
      c1[c1.length - 1] = 6;
    if (c1[0] != 0) 
      break;
    for (let j = i + 1; j < combinations.length; j++) {
      let c2 = combinations[j].sort();
      if (c2[c2.length - 1] == 9) {
        c2[c2.length - 1] = 6;
        console.log(c2);
      }
      if (this.areValidCombinations(c1,c2))
        result++;
    }
  }

  console.timeEnd("Bruteforce");

  return result;
}

var problem_text = `https://projecteuler.net/problem=90`;


var problem = new Problem90(problem_text, process.argv.splice(
  2,process.argv.length-1));


problem.solve();
