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

function Problem24 (problem_text) {
  this._problem_text = problem_text;
}

Problem24.prototype = Object.create(Problem.prototype);
Problem24.prototype.constructor = Problem24;


Problem24.prototype.factorial = function (n) {
    var result = 1

    if ( n<=1 ) { 
        return 1; 
    }
    else { 
      while ( n != 1 )
      {
         result = result * n;
         n--;
      }
    }
    return result;
}


Problem24.prototype.getSolution = function () {
    
  var digits = [0,1,2,3,4,5,6,7,8,9];
  var result = [];
  var permutations = 0;
  var current_number = 0;
  var magnitude = 1;
  for (var i=0; i<9; i++) {
    permutations = this.factorial(9-i);
    console.log('Per: '+permutations);

    for (var j=0; j<1000000-current_number; j+=permutations) {
      //x
    }
    var magnitude = j / permutations - 1;
    current_number += magnitude*permutations;
    result.push(digits[magnitude]);
    digits.splice(magnitude,1);
    console.log(magnitude, current_number );
  }
  result.push(digits[0]);

  return result.join('');
}

var problem_text = `
A permutation is an ordered arrangement of objects. For example, 3124 is one possible permutation of the digits 1, 2, 3 and 4. If all of the permutations are listed numerically or alphabetically, we call it lexicographic order. The lexicographic permutations of 0, 1 and 2 are:
\n
012   021   102   120   201   210
\n
What is the millionth lexicographic permutation of the digits 0, 1, 2, 3, 4, 5, 6, 7, 8 and 9?`;

var problem = new Problem24(problem_text);

console.log (problem.solve());
