'use strict'

let Problem = require('./problem').Problem
//big-integer is better than BigInt 
let bigInt = require("big-integer");

/**
 * Sets Problem56
 * @class Class for solviong projecteuler 51th problem
 * @param {String} problem_text - Task as text
 * @param {Object} arguments - Arguments array 
 */
function Problem56 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem56.prototype = Object.create(Problem.prototype);
Problem56.prototype.constructor = Problem56;



/**
 * power(number) returns base taken to the power
 *
 * @param {Int} base
 * @param {Int} power
 * @return {BigInt} result
 */
bigInt.power = function (base, power) {
    let result = bigInt(base);
    for (let i = 0; i < power; i++) {
        result = result.multiply(base);
    }

    return result;
}

Problem56.prototype.getSolution = function () {

    if (require.main === module) {
        console.time("Bruteforce");
      }

    let powered_number = bigInt(0);
    let digits_sum = 0, powered_number_digits_sum = 0;

    for (let a = 100; a > 0; a--) {
        for (let b = 100; b > 0; b--) {
            powered_number = bigInt.power(a,b);
            powered_number_digits_sum = this.sumDigits(powered_number);
            if (powered_number_digits_sum > digits_sum) 
                digits_sum = powered_number_digits_sum;
            if (powered_number.toString().length*9 < digits_sum)
                break;
        }
    }


    if (require.main === module) {
        console.timeEnd("Bruteforce");
      }

    return digits_sum;
}

let problem_text = `
A googol (10^100) is a massive number: one followed by one-hundred zeros; 
\n
100^100 is almost unimaginably large: one followed by two-hundred zeros. Despite their size, the sum of the digits in each number is only 1.
\n
Considering natural numbers of the form, ab, where a, b < 100, what is the maximum digital sum?`;

let problem = new Problem56(problem_text, process.argv.splice(2,process.argv.length-1));

if (require.main === module) {
    problem.solve();
  } else {
    module.exports.Problem56 = Problem56;
}