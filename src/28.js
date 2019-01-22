'use strict'

const Problem = require('./problem').Problem;

function Problem28 (problem_text) {
  this._problem_text = problem_text;
}

Problem28.prototype = Object.create(Problem.prototype);
Problem28.prototype.constructor = Problem28;

Problem28.prototype.getSolution = function () {

  var result = 101, square = 0, p = 0;
  for (var i=7; i<1002;i+=2){
    square = (i-2)*(i-2);
    p = i-1; // square - 1 size
    //(square+i-1) + ((square+i-1) + (i-1)) + ((square+i-1) + (i-1) + (i-1)) + (square+4*(i-1)) =  4 * sqaure + 10 * (i-1)
    result += 4 * square + 10 * p;
  }

  return result;
}

var problem_text = `
Starting with the number 1 and moving to the right in a clockwise direction a 5 by 5 spiral is formed as follows:
\n
21 22 23 24 25
20  7  8  9 10
19  6  1  2 11
18  5  4  3 12
17 16 15 14 13
\n
It can be verified that the sum of the numbers on the diagonals is 101.
\n
What is the sum of the numbers on the diagonals in a 1001 by 1001 spiral formed in the same way?`;

var problem = new Problem28(problem_text);

console.log (problem.solve());
