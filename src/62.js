'use strict'

let Problem = require('./problem').Problem;
//big-integer is better than BigInt 
let bigInt = require("big-integer");
let fs = require('fs');

function Problem62 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
  this.chains_initials = [2, 145, 169, 871, 872, 40585];
  this.cached_lengths_of_chains = {};
}

Problem62.prototype = Object.create(Problem.prototype);
Problem62.prototype.constructor = Problem62;

/**
 * getHighestPermutation(initial_number) returns highest permuted
 * form of initial_number
 *
 * @param {Int} initial_number
 * @return {Int} highest_avalialble_permutation
 */
Problem62.prototype.getHighestPermutation = function (initial_number) {
    return +this.getDigits(initial_number).sort().reverse().join('');
}


/**
 * checkProblemConditionFullfills(counter) checks if any value greater than 5
 *
 * @param {Array} counter
 * @return {Bool} result
 */
Problem62.prototype.checkProblemConditionFullfills = function (counter_obj) {
    var result = false;
    for (var property in counter_obj) {
        if (counter_obj[property].counter == 5) {
            result = property;
            break;
        }
    }

    return result;
}

/**
 * getSolution() returns solution of problem
 *
 * @return {Int} denominator
 */
Problem62.prototype.getSolution = function () {

  console.time("Bruteforce");

  let permutation_cubes_counter = {};

  let n = 345, 
        cube = 0,
        highest_permutation = 0;

  let result = false;

  while ((!result)) {
        cube = n * n * n;
        highest_permutation = this.getHighestPermutation(cube);
        if (highest_permutation in permutation_cubes_counter) {
            permutation_cubes_counter[highest_permutation].counter ++;
            permutation_cubes_counter[highest_permutation].cubes.push(n);
        }
        else 
            permutation_cubes_counter[highest_permutation] = {
                counter: 1,
                cubes: [n]
            };
        n++;
        result = this.checkProblemConditionFullfills(
      permutation_cubes_counter);
  }
  

  console.timeEnd("Bruteforce");

  return permutation_cubes_counter[result].cubes.map(
      function (element, index, array) {
        return Math.pow(element,3);
      }).sort()[0];
}

var problem_text = `
The cube, 41063625 (3453), can be permuted to produce two other cubes: \
56623104 (3843) and 66430125 (4053). In fact, 41063625 is the smallest \
cube which has exactly three permutations of its digits which are also \
cube.
\n
Find the smallest cube for which exactly five permutations of its digits \
are cube.`;


var problem = new Problem62(problem_text, process.argv.splice(
  2,process.argv.length-1));


problem.solve();
