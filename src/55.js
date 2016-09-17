'use strict'

let Problem = require('./problem').Problem
//big-integer is better than BigInt 
let bigInt = require("big-integer");

/**
 * Sets Problem55
 * @class Class for solviong projecteuler 51th problem
 * @param {String} problem_text - Task as text
 * @param {Object} arguments - Arguments array 
 */
function Problem55 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem55.prototype = Object.create(Problem.prototype);
Problem55.prototype.constructor = Problem55;

/**
 * getDigits(n) returns digits of input parameter
 *
 * @param {Int} n
 * @return {Array} digits
 */
Problem55.prototype.getDigits = function (n) {
  return n.toString().split('').map( (elem) => {
    return +elem;
  });
}

/**
 * reverseDigits(number_as_array) returns reverse
 *
 * @param {Array} number_as_array
 * @return {BigInt} result
 */
Problem55.prototype.reverseDigits = function(number_as_array) {
    return bigInt(number_as_array.reverse().join(''));
}

/**
 * isPalindromic (number) checks if number is palindromic
 *
 * @param {BigInt} number
 * @return {Boolean} result
 */
Problem55.prototype.isPalindromic = function(number) {
    let number_as_array = this.getDigits(number);
    let number_length = number_as_array.length-1;
    let result = true;
    for (let i = 0; i <= Math.ceil(number_length/2); i++) {
        if (number_as_array[i]!=number_as_array[number_length-i]) {
            result = false;
            break;
        }
    }
    
    return result;
}


/**
 * addReversed (number) adds reversed number to itself
 *
 * @param {BigInt} number
 * @return {Boolean} result
 */
Problem55.prototype.addReversed = function(number) {
    let reversed_number = this.reverseDigits(this.getDigits(number));
    return number.add(reversed_number);
}

/**
 * isLychrel(number) checks if number is Lychrel numbers
 * meaning that it doesn't become palindromic in 50 iterations 
 *
 * @param {BigInt} number
 * @return {Boolean} result
 */
Problem55.prototype.isLychrel = function(number) {
    let result = true;
    let current_number = bigInt(number);
    for (let i = 0; i < 50; i++) {
        current_number = this.addReversed(current_number);
        if (this.isPalindromic(current_number)) {
            result = false;
            break;
        }
    }

    return result;
}

Problem55.prototype.getSolution = function () {
    

    console.time("Bruteforce");

    let counter = 0;
    for (let i = 10; i < 10000; i++) {
        // NOTE: palindromic numbers can also be Lychrel.
        if (this.isLychrel(i)) 
            counter++;
    }


    console.timeEnd("Bruteforce");

    return counter;
}

let problem_text = `
If we take 47, reverse and add, 47 + 74 = 121, which is palindromic.
\n
Not all numbers produce palindromes so quickly. For example,
\n
349 + 943 = 1292,
1292 + 2921 = 4213
4213 + 3124 = 7337
\n
That is, 349 took three iterations to arrive at a palindrome.
\n
Although no one has proved it yet, it is thought that some numbers, like 196, never produce a palindrome. A number that never forms a palindrome through the reverse and add process is called a Lychrel number. Due to the theoretical nature of these numbers, and for the purpose of this problem, we shall assume that a number is Lychrel until proven otherwise. In addition you are given that for every number below ten-thousand, it will either (i) become a palindrome in less than fifty iterations, or, (ii) no one, with all the computing power that exists, has managed so far to map it to a palindrome. In fact, 10677 is the first number to be shown to require over fifty iterations before producing a palindrome: 4668731596684224866951378664 (53 iterations, 28-digits).
\n
Surprisingly, there are palindromic numbers that are themselves Lychrel numbers; the first example is 4994.
\n
How many Lychrel numbers are there below ten-thousand?
\n
NOTE: Wording was modified slightly on 24 April 2007 to emphasise the theoretical nature of Lychrel numbers.`;


let problem = new Problem55(problem_text, process.argv.splice(2,process.argv.length-1));

problem.solve();
