'use strict'

let Problem = require('./problem').Problem;
//big-integer is better than BigInt 
let bigInt = require("big-integer");

function Problem104 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem104.prototype = Object.create(Problem.prototype);
Problem104.prototype.constructor = Problem104;


Problem104.prototype.checkDigits = function (number) {
    let digits = number.toString().split('').map((elem) => {return +elem});
    let first_9_digits_are_pandigital = this.isPandigital(digits.slice(0,9));
    let last_9_digits_are_pandigital = this.isPandigital(digits.slice(-9));
    return (first_9_digits_are_pandigital && last_9_digits_are_pandigital);
}

/**
 * getSolution() returns solution of problem
 *
 * @return {Int} denominator
 */
Problem104.prototype.getSolution = function () {

  console.time("Bruteforce");

  let F_n_2 = bigInt(1),
        F_n_1 = bigInt(1),
        temp = 0,
        F_n = 0;
  let result = 2;

  while (true) {
      F_n = F_n_2.add(F_n_1);
      F_n_1 = F_n_2;
      F_n_2 = F_n;
      console.log(result);
      result++;
      if (this.checkDigits(F_n))
        break;
  }

  console.timeEnd("Bruteforce");



  return result;
}

var problem_text = ``;


var problem = new Problem104(problem_text, process.argv.splice(
  2,process.argv.length-1));


problem.solve();
