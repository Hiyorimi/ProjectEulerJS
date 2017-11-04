'use strict'

let Problem = require('./problem').Problem

/**
 * Sets Problem38
 * @class Class for solviong projecteuler 38th problem
 * @param {String} problem_text - Task as text
 * @param {Object} arguments - Arguments array 
 */
function Problem38 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem38.prototype = Object.create(Problem.prototype);
Problem38.prototype.constructor = Problem38;


/**
 * multiplyByXRange(n, maximum) returns array (1 * n, .., maximum * n)
 *
 * @param {Int} n - number to multiply by
 * @param {Int} maximum - upper bound of array
 * @return {Array} digits
 */
Problem38.prototype.multiplyByXRange = function (n, maximum) {
  let arr = [];
  for (let i = 1; i < maximum+1; i++){
    arr.push( n*i );
  }
  return arr;
}



Problem38.prototype.getSolution = function () {
    let sum = 0;
    let counter = 0;
    let concatenated = '';
    let j = 0;
    let maximum = 0;

    console.time("Bruteforce");
    for (let i = 9; i < 9999; i++){
      concatenated = '';

      // j = 2, because n > 1
      for (j = 2; (j < 6) && (concatenated.length < 10) ; j++){
        concatenated = this.multiplyByXRange(i,j).join('');
        if (this.isPandigital(concatenated.split('')))
          if (+concatenated > maximum) 
            maximum = +concatenated;
      }
      if (concatenated.length > 10 && j==2)
        break
    }
    console.timeEnd("Bruteforce");

    return maximum;
}

let problem_text = `
Take the number 192 and multiply it by each of 1, 2, and 3:
\n
192 × 1 = 192
192 × 2 = 384
192 × 3 = 576
By concatenating each product we get the 1 to 9 pandigital, 192384576. We will 
call 192384576 the concatenated product of 192 and (1,2,3)
\n
The same can be achieved by starting with 9 and multiplying by 1, 2, 3, 4, 
and 5, giving the pandigital, 918273645, which is the concatenated product 
of 9 and (1,2,3,4,5).
\n
What is the largest 1 to 9 pandigital 9-digit number that can be formed as 
the concatenated product of an integer with (1,2, ... , n) where n > 1?`;


let problem = new Problem38(problem_text, process.argv.splice(2,process.argv.length-1));

problem.solve();
