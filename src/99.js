'use strict'

let Problem = require('./problem').Problem;
//big-integer is better than BigInt 
let bigInt = require("big-integer");
let fs = require('fs');

function Problem99 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem99.prototype = Object.create(Problem.prototype);
Problem99.prototype.constructor = Problem99;


/**
 * getSolution() returns solution of problem
 *
 * @return {Int} denominator
 */
Problem99.prototype.getSolution = function () {

  console.time("Bruteforce");

  let file_contents = fs.readFileSync(__dirname + '/p099_base_exp.txt');
  let strings = file_contents.toString().split('\n');
  let base = 1;
  let exponent = 1;
  let line_content = [];
  let number = 0;
  let greatest_number = 0;
  let greatest_line_number = 0;

  for (let i = 1; i < strings.length; i++) {
    line_content = strings[i].split(',');
    base = +line_content[0];
    exponent = +line_content[1];
    number = exponent * Math.log(base);

    if (number > greatest_number) {
      greatest_line_number = i+1;
      greatest_number = number;
    }
  }

  console.timeEnd("Bruteforce");

  return greatest_line_number;
}

var problem_text = `
Comparing two numbers written in index form like 2^11 and 3^7 is not difficult,
 as any calculator would confirm that 2^11 = 2048 < 3^7 = 2187.
\n
However, confirming that 632382^518061 > 519432^525806 would be much more 
difficult, as both numbers contain over three million digits.
\n
Using base_exp.txt (right click and 'Save Link/Target As...'), a 22K text 
file containing one thousand lines with a base/exponent pair on each line, 
determine which line number has the greatest numerical value.
\n
NOTE: The first two lines in the file represent the numbers in the example 
given above.`;


var problem = new Problem99(problem_text, process.argv.splice(
  2,process.argv.length-1));


problem.solve();
