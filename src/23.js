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

function Problem23 (problem_text) {
  this._problem_text = problem_text;
  this.abundantNumbers = this.getAbundantNumbers();
}

Problem23.prototype = Object.create(Problem.prototype);
Problem23.prototype.constructor = Problem23;

//from http://jsfiddle.net/r8wh715t/
Problem23.prototype.getDivisors = function (num, exclude_self) {
    var exclude_self = typeof exclude_self !== 'undefined' ? exclude_self : false;
    var divisors = [1] // 1 will be a part of every solution.
    var half = Math.floor(num / 2), // Ensures a whole number <= num.
        i, j;

    // Determine out increment value for the loop and starting point.
    num % 2 === 0 ? (i = 2, j = 1) : (i = 3, j = 2);

    for (i; i <= half; i += j) {
        num % i === 0 ? divisors.push(i) : false;
    }

    if (!exclude_self)
      divisors.push(num); // 
    return divisors;
}

Problem23.prototype.getAbundantNumbers = function () {
  var abundantNumbers = [12];
  var sum_function = function (sum, current) {
    return sum + current;
  }
  for (var i=13; i<28123-12; i++) {
    if (this.getDivisors(i, true).reduce(sum_function)>i)
      abundantNumbers.push(i);
  }
  return abundantNumbers;
}

Problem23.prototype.canBeWrittenAsSumOfTwoAbundant = function (num) {
  for (var i=0; (i<this.abundantNumbers.length) && (this.abundantNumbers[i]<num); i++) {
    for (var j=0; j<this.abundantNumbers.length; j++) 
      if (num - this.abundantNumbers[i] == this.abundantNumbers[j])
        return true;
      if (this.abundantNumbers[i]+this.abundantNumbers[j]>num)
        continue;
  }
}

Problem23.prototype.getSolution = function () {
    
  var sum = 0;
  for (var i=0; i<28123; i++) {
    if (!this.canBeWrittenAsSumOfTwoAbundant(i)) {
      sum += i;
    }
  }

  return sum;
}

var problem_text = `
A perfect number is a number for which the sum of its proper divisors is exactly equal to the number. For example, the sum of the proper divisors of 28 would be 1 + 2 + 4 + 7 + 14 = 28, which means that 28 is a perfect number.
\n
A number n is called deficient if the sum of its proper divisors is less than n and it is called abundant if this sum exceeds n.
\n
As 12 is the smallest abundant number, 1 + 2 + 3 + 4 + 6 = 16, the smallest number that can be written as the sum of two abundant numbers is 24. By mathematical analysis, it can be shown that all integers greater than 28123 can be written as the sum of two abundant numbers. However, this upper limit cannot be reduced any further by analysis even though it is known that the greatest number that cannot be expressed as the sum of two abundant numbers is less than this limit.
\n
Find the sum of all the positive integers which cannot be written as the sum of two abundant numbers.`;

var problem = new Problem23(problem_text);

console.log (problem.solve());
