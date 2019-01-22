'use strict'

const Problem = require('./problem').Problem;

function Problem12 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem12.prototype = Object.create(Problem.prototype);
Problem12.prototype.constructor = Problem12;

var problem_text = `The sequence of triangle numbers is generated by adding the natural numbers. 
So the 7th triangle number would be 1 + 2 + 3 + 4 + 5 + 6 + 7 = 28. The first ten terms would be:
\n
1, 3, 6, 10, 15, 21, 28, 36, 45, 55, ...
\n
Let us list the factors of the first seven triangle numbers:
\n
 1: 1
 3: 1,3
 6: 1,2,3,6
10: 1,2,5,10
15: 1,3,5,15
21: 1,3,7,21
28: 1,2,4,7,14,28
We can see that 28 is the first triangle number to have over five divisors.
\n
What is the value of the first triangle number to have over five hundred divisors?`

//from http://stackoverflow.com/questions/22130043/trying-to-find-factors-of-a-number-in-js
Problem12.prototype.getNumberOfFactors = function (num) {
    var factors = this.getDivisors(num, false) // Always include the original number.
    return factors.length;
}


Problem12.prototype.getSolution = function () {
    var answerNotFound = true;
    var i = 11114;
    var triangular_number = 0;
    for (var _i=0;_i<=i;_i++) triangular_number+=_i;
    var factors_number = this.getNumberOfFactors(triangular_number);
    i++;
	while (factors_number < 500) {
        if (triangular_number % 10 == 0) {
            factors_number = this.getNumberOfFactors(triangular_number);
        }
        triangular_number += i;
        i++;
    }
    return triangular_number-i+1;
}


if (require.main === module) {
    const problem = new Problem12(problem_text, process.argv.splice(2, process.argv.length - 1));
    console.log(problem.getSolution());
} else {
    module.exports.SolvedProblem = Problem12;
}