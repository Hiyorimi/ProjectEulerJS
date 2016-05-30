'use strict'

/**
     * Sets Problem
     * @class Class for projecteuler problem
     * @param {String} problem_text Task as text
     * @param {Object} arguments Arguments array 
     */
function Problem (problem_text, input_arguments) {
  this._problem_text = problem_text;
  this._arguments = input_arguments; 
}

/**
 * getProblemText() returns text of the problem
 *
 * @return {String} this._problem_text
 */
Problem.prototype.getProblemText = function () {
  return this._problem_text;
}

/**
 * getSolution() is an abstract function for calculating the answer
 *
 * @return {Int} 0
 */
Problem.prototype.getSolution = function () {
  return 0;
}

/**
 * solve() prints _problem_text and answer, for which calls this.getSolution()
 * as String
 *
 * @return Nan
 */
Problem.prototype.solve = function () {
  console.log(this.getProblemText() + "\nAnswer: " + this.getSolution());
}


function Problem33 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
  this._delta = 1e-15;
}

Problem33.prototype = Object.create(Problem.prototype);
Problem33.prototype.constructor = Problem33;

/**
 * removeCommonDigits(num) returns numbers without common digits
 *
 * @param {Int} num
 * @param {Int} num2
 * @return {Object} result array with 2 numbers or empty if there are no common digits
 */
Problem33.prototype.removeCommonDigits = function (num, num2) {

  var s1 = num.toString();
  var s2 = num2.toString();
  var char = '', result = [];

  if ((s1[0]==s2[0]) || s1[0]==s2[1]) 
    char = s1[0];
  if (s1[1]==s2[0] || s1[1]==s2[1])
    char = s1[1];

  if (char!='')
    result = [+(s1.replace(char,'')),+(s2.replace(char,''))];

  return result;
}

/**
 * isCurious(numerator, denominator) checks if fraction is curious
 *
 * @param {Int} numerator
 * @param {Int} denominator
 * @return {Object} result array with 2 numerator and denomiator or false if fration is not curious
 */
Problem33.prototype.isCurious = function (numerator, denominator) {
  var removed = this.removeCommonDigits(numerator, denominator);
  if ((removed.length > 0) && (numerator % 10 != 0) && (denominator % 10 != 0)) {
    if (Math.abs(numerator / denominator - removed[0] / removed[1]) < this._delta) {
      return [ removed[0], removed[1] ];
    }
  }
  return false;
}



/**
 * gcd(a, b) returns greatest commond divisor
 *
 * @param {Int} a
 * @parma {Int} b
 * @return {Int} gcd
 */
Problem33.prototype.gcd = function (a, b) {
  if (!b) {
    return a;
  }

  return this.gcd(b, a % b);
}

/**
 * getSolution() returns solution of problem
 *
 * @return {Int} denominator
 */
Problem33.prototype.getSolution = function () {

  var fractions = [];
  var numerator =1, denominator = 1;

   
  //BruteForse approach

  //measuring time
  console.time("Bruteforce");
  for (var a = 10; a < 100; a += 1) {
      for (var b = a + 1; b < 100; b += 1) {
        var fraction = this.isCurious(a,b);
        if (fraction)
          fractions.push(fraction);
      }
  }   
  console.timeEnd("Bruteforce");

  for (var i = 0; i < fractions.length; i++){
    numerator *= fractions[i][0];
    denominator *= fractions[i][1];
  }

  return denominator/this.gcd(numerator,denominator);
}

var problem_text = `
The fraction 49/98 is a curious fraction, as an inexperienced mathematician in attempting to simplify it may incorrectly believe that 49/98 = 4/8, which is correct, is obtained by cancelling the 9s.
\n
We shall consider fractions like, 30/50 = 3/5, to be trivial examples.
\n
There are exactly four non-trivial examples of this type of fraction, less than one in value, and containing two digits in the numerator and denominator.
\n
If the product of these four fractions is given in its lowest common terms, find the value of the denominator.`;


var problem = new Problem33(problem_text, process.argv.splice(2,process.argv.length-1));


problem.solve();
