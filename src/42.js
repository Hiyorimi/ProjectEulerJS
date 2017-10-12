'use strict'

let Problem = require('./problem').Problem

/**
 * Sets Problem42
 * @class Class for solviong projecteuler 42th problem
 * @param {String} problem_text - Task as text
 * @param {Object} arguments - Arguments array 
 */
function Problem42 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
  this._triangles = this.getTriangleNumbers(330);
}

Problem42.prototype = Object.create(Problem.prototype);
Problem42.prototype.constructor = Problem42;


/**
 * getTriangleNumbers(max) returns max triangle numbers array
 *
 * @param {Int} max - Maximum number of triangle numbers
 * @return {Object} array
 */
Problem42.prototype.getTriangleNumbers = function (max) {
    // Eratosthenes algorithm to find all primes under max
    let array = [];

    for (let i = 0; i < 330; i++){
      array.push(this.getNthTriangleNumber(i));
    }
    
    return array;
}

/**
 * getNthTriangleNumber(n) returns nth triangle number
 *
 * @param {Int} n
 * @return {Int} 0.5*(n+1)*n
 */
Problem42.prototype.getNthTriangleNumber = function (n) {
  return (n+1)*n/2;
}


/**
 * getCharNumber(n) returns number of a char
 *
 * @param {str} char
 * @return {Int} charCodeAt(char)
 */
Problem42.prototype.getCharNumber = function (char) {
  return char.charCodeAt(0)-64;
}


/**
 * getCharsSum(str) calculates sum of characters represented as ints
 *
 * @param {Int} str
 * @return {Int} sum
 */
Problem42.prototype.getCharsSum = function (str) {
  var sum = 0;
  for (var i in str) {
    sum += this.getCharNumber(str[i]);
  }
  return sum;
}


/**
 * isTriangle(n) checks if input number is in this._triangles
 *
 * @param {Int} n
 * @return {Bool} 
 */
Problem42.prototype.isTriangle = function (n) {
  return (this._triangles.indexOf(n) > -1) ? true : false;
}


Problem42.prototype.getSolution = function () {

    let result = 0;
    let fs = require('fs');
    let words = fs.readFileSync(__dirname + '/p042_words.txt');
    let words_arr = words.toString().split(',').map(function (elem) {
      return elem.replace(/"/g,'');
    }).sort();

    console.time("Bruteforce");

    for (let i=0; i < words_arr.length; i++) {
      if (this.isTriangle(this.getCharsSum(words_arr[i])))
        result++;
    }

    console.timeEnd("Bruteforce");

    return result;
}

let problem_text = `
The nth term of the sequence of triangle numbers is given by, tn = ½n(n+1); so the first ten triangle numbers are:
\n
1, 3, 6, 10, 15, 21, 28, 36, 45, 55, ...
\n
By converting each letter in a word to a number corresponding to its alphabetical position and adding these values we form a word value. For example, the word value for SKY is 19 + 11 + 25 = 55 = t10. If the word value is a triangle number then we shall call the word a triangle word.
\n
Using words.txt (right click and 'Save Link/Target As...'), a 16K text file containing nearly two-thousand common English words, how many are triangle words?`;


let problem = new Problem42(problem_text, process.argv.splice(2,process.argv.length-1));

problem.solve();
