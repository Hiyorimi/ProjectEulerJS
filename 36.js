'use strict'

/**
 * Sets Problem36
 * @class Class for solviong projecteuler 36th problem
 * @param {String} problem_text - Task as text
 * @param {Object} arguments - Arguments array 
 */
function Problem36 (problem_text, input_arguments) {
  require("./problem").Problem.apply(this, arguments);
}

Problem36.prototype = Object.create(require("./problem").Problem.prototype);
Problem36.prototype.constructor = Problem36;

/**
 * isPalindrom() is a function for checking if input string is palindrom
 *
 * @param {String} str - input string
 * @return {Bool} 
 */
Problem36.prototype.isPalindrom = function (str) {
    return str == str.split('').reverse().join('');
}

Problem36.prototype.getSolution = function () {
    var sum = 0;

    console.time("Bruteforce");
    for (var i = 1; i < 1000000; i++){
        if (this.isPalindrom(i.toString()) && (this.isPalindrom(i.toString(2))))
            sum += i;
    }
    console.timeEnd("Bruteforce");

    return sum;
}

var problem_text = `
The decimal number, 585 = 10010010012 (binary), is palindromic in both bases.
\n
Find the sum of all numbers, less than one million, which are palindromic in base 10 and base 2.
\n
(Please note that the palindromic number, in either base, may not include leading zeros.)`;


var problem = new Problem36(problem_text, process.argv.splice(2,process.argv.length-1));

problem.solve();
