'use strict'

function Problem (problem_text) {
  this._problem_text = problem_text;
}

Problem.prototype.getProblemText = function () {
  return this._problem_text;
}

Problem.prototype.getSolution = function () {
  return 0;
}

Problem.prototype.solve = function () {
  return this.getProblemText() + "\nAnswer: " + this.getSolution();
}

//big-integer is better than BigInt 
var bigInt = require("big-integer");

function Problem25 (problem_text) {
  this._problem_text = problem_text;
}

Problem25.prototype = Object.create(Problem.prototype);
Problem25.prototype.constructor = Problem25;

Problem25.prototype.getSolution = function () {
    
  var number = bigInt(1);
  var previous = bigInt(1);
  var temp = bigInt(0);
  var counter = 2;
  while (number.toString().length<1000) {
    var temp = number;
    number = previous.add(number);
    previous = temp;
    counter++;
  }

  return counter;
}

var problem_text = `
The Fibonacci sequence is defined by the recurrence relation:
\n
Fn = Fn−1 + Fn−2, where F1 = 1 and F2 = 1.
Hence the first 12 terms will be:
\n
F1 = 1
F2 = 1
F3 = 2
F4 = 3
F5 = 5
F6 = 8
F7 = 13
F8 = 21
F9 = 34
F10 = 55
F11 = 89
F12 = 144
The 12th term, F12, is the first term to contain three digits.
\n
What is the index of the first term in the Fibonacci sequence to contain 1000 digits?`;

var problem = new Problem25(problem_text);

console.log (problem.solve());
