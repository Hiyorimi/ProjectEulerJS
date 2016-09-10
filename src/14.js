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

function Problem14 (problem_text) {
  this._problem_text = problem_text;
}
Problem14.prototype = Object.create(Problem.prototype);
Problem14.prototype.constructor = Problem14;

Problem14.prototype.generateCollatzSequence = function (n) {
    if (n>1) {
        var sequence = [];
        while (n!=1) {
            sequence.push(n);
            if (n % 2 == 0) {
                n /= 2;
            }
            else {
                n = 3*n +1;
            }
        }
        sequence.push(1);
        return sequence;
    }
    else return [1];
}

Problem14.prototype.solve = function () {
    var limit = 1000000;
    var n = 1;
    var longest_sequence_length = 1;
    for (var i = 2; i<limit; i++) {
        var i_sequence_length = this.generateCollatzSequence(i).length;
        if (i_sequence_length > longest_sequence_length) {
            longest_sequence_length = i_sequence_length;
            n = i;
        }
    }
    return n;
}

var problem_text = `
The following iterative sequence is defined for the set of positive integers:
\n
n → n/2 (n is even)
n → 3n + 1 (n is odd)
\n
Using the rule above and starting with 13, we generate the following sequence:
\n
13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1
It can be seen that this sequence (starting at 13 and finishing at 1) contains 10 terms. Although it has not been proved yet (Collatz Problem), it is thought that all starting numbers finish at 1.
\n
Which starting number, under one million, produces the longest chain?
\n
NOTE: Once the chain starts the terms are allowed to go above one million.`;

var problem = new Problem14(problem_text);

console.log (problem.solve());
