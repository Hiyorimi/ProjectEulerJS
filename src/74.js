'use strict'

let Problem = require('./problem').Problem;
//big-integer is better than BigInt 
let bigInt = require("big-integer");
let fs = require('fs');

function Problem74 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
  this.chains_initials = [2, 145, 169, 871, 872, 40585];
  this.cached_lengths_of_chains = {};
}

Problem74.prototype = Object.create(Problem.prototype);
Problem74.prototype.constructor = Problem74;


/**
 * countFactorialChainLength() returns length of the chain of
 * repeateadly summed factorials of digits
 *
 * @return {Int} length
 */
Problem74.prototype.chainEnds = function (element, index, array) {
    return (this.chains_initials.indexOf(element) >= 0);
}

/**
 * countFactorialChainLength(initial_number) returns length of the chain of
 * repeateadly summed factorials of digits
 *
 * @return {Int} length
 */
Problem74.prototype.countFactorialChainLength = function (initial_number) {
    let length = 0;
    let next_number = initial_number;
    let previous_number = initial_number;
    while (this.chains_initials.indexOf(next_number) < 0) {
        previous_number = next_number;
        next_number = this.getCachedFactorialSum(
            this.getDigits(previous_number));
        length++;
    }
    return length;
}

/**
 * countCachedFactorialChainLength(initial_number) returns length of the chain of
 * repeateadly summed factorials of digits, but uses cache
 *
 * @return {Int} length
 */
Problem74.prototype.countCachedFactorialChainLength = function (initial_number) {
    let length = 0,
        next_number = initial_number,
        previous_number = initial_number,
        chain_length = 0;
    while (this.chains_initials.indexOf(next_number) < 0) {
        previous_number = next_number;
        next_number = this.getCachedFactorialSum(
            this.getDigits(previous_number));
        if (this.cached_lengths_of_chains[next_number]) {
            return length + 1 + this.cached_lengths_of_chains[next_number];
        }
        else { 
            length++;
        }
    }
    if (!(this.cached_lengths_of_chains[previous_number])) 
        this.cached_lengths_of_chains[previous_number] = length;
    return length;
}

/**
 * getSolution() returns solution of problem
 *
 * @return {Int} denominator
 */
Problem74.prototype.getSolution = function () {

  console.time("Bruteforce");

  let chains_counter = 0,
      chain_length = 0;

  for (let i = 11; i < 1000001; i++) {
    chain_length = this.countFactorialChainLength(i);
    if ( chain_length >=57 ) {
        chains_counter++;
    }
  }

  console.timeEnd("Bruteforce");

  console.time("Cached");

  let chains_counter_cached = 0;

  for (let i = 11; i < 1000000; i++) {
      if ( i < 10000) {
          chain_length = this.countFactorialChainLength(i);
          this.cached_lengths_of_chains[i] = chain_length;
      }
      else 
          chain_length = this.countCachedFactorialChainLength(i)
      if (chain_length >= 57) {
        chains_counter_cached++;
      }
  }
  

  console.timeEnd("Cached");

  console.log(chains_counter_cached == chains_counter)

  return chains_counter_cached;
}

var problem_text = `
The number 145 is well known for the property that the sum of the factorial of\
 its digits is equal to 145:\n
1! + 4! + 5! = 1 + 24 + 120 = 145\n
Perhaps less well known is 169, in that it produces the longest chain of \
numbers that link back to 169; it turns out that there are only three such \
loops that exist:\n
169 → 363601 → 1454 → 169
871 → 45361 → 871
872 → 45362 → 872\n
It is not difficult to prove that EVERY starting number will eventually get\
 stuck in a loop. For example,\n
69 → 363600 → 1454 → 169 → 363601 (→ 1454)
78 → 45360 → 871 → 45361 (→ 871)
540 → 145 (→ 145)\n
Starting with 69 produces a chain of five non-repeating terms, but the longest\
 non-repeating chain with a starting number below one million is sixty terms.
How many chains, with a starting number below one million, contain exactly \
sixty non-repeating terms?`;


var problem = new Problem74(problem_text, process.argv.splice(
  2,process.argv.length-1));


problem.solve();
