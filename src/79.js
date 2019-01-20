'use strict'

let Problem = require('./problem').Problem;
//big-integer is better than BigInt 
let bigInt = require("big-integer");
let fs = require('fs');

function Problem79 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem79.prototype = Object.create(Problem.prototype);
Problem79.prototype.constructor = Problem79;



/**
 * check_order(result, digits) checks if the order is ok
 * 
 * @param {Array} result
 * @param {Array} digits
 * @return {Array} result
 */
Problem79.prototype.check_order = function (result,digits) {
  for (let i = 0; i < digits.length; i++)
    if (result.indexOf(digits[i])==-1)
      result.push(digits[i]);
     
  for (let i = 0; i < digits.length; i++)
    for (let j = i+1; j < digits.length; j++) {
      let a = digits[i];
      let b = digits[j];
      if ( Math.sign (result.indexOf(a) - result.indexOf(b)) != 
            Math.sign (digits.indexOf(a) - digits.indexOf(b)) ) {
        // Swap digits
        let temp = a;
        result[result.indexOf(a)] = b;
        result[result.indexOf(b)] = temp;
      }
    }

  return result;
}

/**
 * getSolution() returns solution of problem
 *
 * @return {Int} denominator
 */
Problem79.prototype.getSolution = function () {

  if (require.main === module) {
    console.time("Bruteforce");
  }

  let file_contents = fs.readFileSync(__dirname + '/p079_keylog.txt');
  let strings = file_contents.toString().split('\n');
  let result = [];
  for (let i = 0; i < strings.length; i++) {
    let digits = this.getDigits(strings[i]);
    result = this.check_order(result,digits);
  }

  if (require.main === module) {
    console.timeEnd("Bruteforce");
  }


  return result.join('');
}

var problem_text = `
A common security method used for online banking is to ask the user for
 three random characters from a passcode. For example, if the passcode 
 was 531278, they may ask for the 2nd, 3rd, and 5th characters; the 
 expected reply would be: 317.
\n
The text file, keylog.txt, contains fifty successful login attempts.
\n
Given that the three characters are always asked for in order, analyse 
the file so as to determine the shortest possible secret passcode of 
unknown length.`;


var problem = new Problem79(problem_text, process.argv.splice(
  2,process.argv.length-1));


if (require.main === module) {
    problem.solve();
} else {
    module.exports.SolvedProblem = Problem79;
}