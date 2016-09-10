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

function Problem30 (problem_text) {
  this._problem_text = problem_text;
}

Problem30.prototype = Object.create(Problem.prototype);
Problem30.prototype.constructor = Problem30;

Problem30.prototype.getSolution = function () {

  var numbers = [];
  var a_string = '';
  var power, sum, a, b = 0;
  for (var a=10; a<1000000; a++){
      a_string = a.toString();
      sum = 0;
      for (var i=0; i<a_string.length;i++) {
        power = +a_string[i];
        sum += Math.pow(power,5);
      }
      if (sum==a) {
        numbers.push(a);
      }
  }

  return numbers.reduce(function (sum,elem) {
    return sum + elem;
  });
}

var problem_text = `
Surprisingly there are only three numbers that can be written as the sum of fourth powers of their digits:
\n
1634 = 14 + 64 + 34 + 44
8208 = 84 + 24 + 04 + 84
9474 = 94 + 44 + 74 + 44
As 1 = 14 is not a sum it is not included.
\n
The sum of these numbers is 1634 + 8208 + 9474 = 19316.
\n
Find the sum of all the numbers that can be written as the sum of fifth powers of their digits.`;

var problem = new Problem30(problem_text);

console.log (problem.solve());
