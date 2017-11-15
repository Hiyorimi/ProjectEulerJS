'use strict'

let Problem = require('./problem').Problem;

function Problem112 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem112.prototype = Object.create(Problem.prototype);
Problem112.prototype.constructor = Problem112;




/**
 * isBouncy(n) checks if number is bouncy
 * 
 * @param {Int} i
 * @return {Array} result
 */
Problem112.prototype.isBouncy = function (i) {
  let digits = this.getDigits(i);
  let is_increasing = true,
        is_decreasing = true;

  for (let i = 0; i < digits.length-1; i++) {
      if (digits[i+1] < digits[i])
        is_increasing = false;
  }

  if (!is_increasing) {
    for (let i = 0; i < digits.length-1; i++) {
      if (digits[i+1] > digits[i])
        is_decreasing = false;
    }
  }

  return (!(is_decreasing || is_increasing));
}

/**
 * getSolution() returns solution of problem
 *
 * @return {Int} denominator
 */
Problem112.prototype.getSolution = function () {

  console.time("Bruteforce");
  let number = 100,
      bouncy_counter = 0;

  while (true) {
      if (this.isBouncy(number)) 
        bouncy_counter++;
      if (bouncy_counter / number > 0.99)
        break;
      number++;
  }

  console.timeEnd("Bruteforce");

  return --number;
}

var problem_text = `
Working from left-to-right if no digit is exceeded by the digit to its
 left it is called an increasing number; for example, 134468.
\n
Similarly if no digit is exceeded by the digit to its right it is called 
a decreasing number; for example, 66420.
\n
We shall call a positive integer that is neither increasing nor decreasing
 a "bouncy" number; for example, 155349.
\n
Clearly there cannot be any bouncy numbers below one-hundred, but just over
 half of the numbers below one-thousand (525) are bouncy. In fact, the least 
 number for which the proportion of bouncy numbers first reaches 50% is 538.
\n
Surprisingly, bouncy numbers become more and more common and by the time we 
reach 21780 the proportion of bouncy numbers is equal to 90%.
\n
Find the least number for which the proportion of bouncy numbers is exactly 
99%.`;


var problem = new Problem112(problem_text, process.argv.splice(
  2,process.argv.length-1));


problem.solve();
