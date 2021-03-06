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

function Problem29 (problem_text) {
  this._problem_text = problem_text;
}

Problem29.prototype = Object.create(Problem.prototype);
Problem29.prototype.constructor = Problem29;

Problem29.prototype.getSolution = function () {

  var powers = [];
  var BigNumber = require('bignumber.js');
  var power = new BigNumber(0);
  var a = new BigNumber(0);
  var b = new BigNumber(0);
  for (var a_i=2; a_i<101; a_i++){
    for (var b_i=2; b_i<101; b_i++){
      a = new BigNumber(a_i);
      b = new BigNumber(b_i);
      power = a.pow(b).toString(10); //Should use toString, to store number as string
      if (powers.indexOf(power)==-1)
        powers.push(power);
    }
  }

  return powers.length;
}

var problem_text = `
Consider all integer combinations of ab for 2 ≤ a ≤ 5 and 2 ≤ b ≤ 5:
\n
22=4, 23=8, 24=16, 25=32
32=9, 33=27, 34=81, 35=243
42=16, 43=64, 44=256, 45=1024
52=25, 53=125, 54=625, 55=3125
If they are then placed in numerical order, with any repeats removed, we get the following sequence of 15 distinct terms:
\n
4, 8, 9, 16, 25, 27, 32, 64, 81, 125, 243, 256, 625, 1024, 3125
\n
How many distinct terms are in the sequence generated by ab for 2 ≤ a ≤ 100 and 2 ≤ b ≤ 100?`;

var problem = new Problem29(problem_text);

console.log (problem.solve());
