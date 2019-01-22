'use strict'

const Problem = require('./problem').Problem;

function Problem16 (problem_text, input_arguments) {
    Problem.apply(this, arguments);
  }
Problem16.prototype = Object.create(Problem.prototype);
Problem16.prototype.constructor = Problem16;

Problem16.prototype.getSolution = function () {
    var number = [1],
    sum = 0;

    for(var i = 0; i < 1000; i++) {
        var overflow = 0,
            count = number.length + 1

        for(var j = 0; j < count; j++) {
            var digit = number[j] || 0;

            digit = 2 * digit + overflow;

            if(digit > 9) {
                digit -= 10;
                overflow = 1;
            }
            else {
                overflow = 0;
            }

            number[j] = digit;
        }
    }

    for(var i = 0; i < 1000; i++) {
        sum += number[i];
    }

    return sum
}

var problem_text = `
2^15 = 32768 and the sum of its digits is 3 + 2 + 7 + 6 + 8 = 26.
\n
What is the sum of the digits of the number 2^1000?`;


if (require.main === module) {
    const problem = new Problem16(problem_text, process.argv.splice(2, process.argv.length - 1));
    console.log(problem.getSolution());
} else {
    module.exports.SolvedProblem = Problem16;
}