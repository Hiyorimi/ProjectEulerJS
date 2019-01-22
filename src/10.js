'use strict'

const Problem = require('./problem').Problem;

function Problem10 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem10.prototype = Object.create(Problem.prototype);
Problem10.prototype.constructor = Problem10;

var problem_text = `The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.
\n
Find the sum of all the primes below two million.`



function solution (max) {
	var sieve = [], i, j, primes = [];
    for (i = 2; i <= max; ++i) {
        if (!sieve[i]) {
            // i has not been marked -- it is prime
            primes.push(i);
            for (j = i << 1; j <= max; j += i) {
                sieve[j] = true;
            }
        }
    }

    return primes.reduce(function (sum,current) {
    	return sum+current;
    })
}

Problem10.prototype.getSolution = function () {
  return solution(2000000);
}

if (require.main === module) {
    const problem = new Problem10(problem_text, process.argv.splice(2, process.argv.length - 1));
    console.log(problem.getSolution());
} else {
    module.exports.SolvedProblem = Problem10;
}