'use strict'

const Problem = require('./problem').Problem;

function Problem7 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem7.prototype = Object.create(Problem.prototype);
Problem7.prototype.constructor = Problem7;

var problem_text = `By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13,
 we can see that the 6th prime is 13.
\n
What is the 10 001st prime number?`

function nThPrime (n) {
    var primes = new Array(n + 1);
    primes[1] = 2;
    Find: for (var i = 2, test = 3; i <= n; test += 1) {
        // see if test is prime and if so, it will be the ith prime.
        for (var j = 1; j < i; j += 1) {
            if (test % primes[j] === 0) {
                continue Find;
            }
        }
        primes[i] = test;
        i += 1;
    }
    return primes[n];
}


Problem7.prototype.getSolution = function () {
    const num = 10001;
    return nThPrime(num);
}

if (require.main === module) {
    const problem = new Problem7(problem_text, process.argv.splice(2, process.argv.length - 1));
    problem.solve();
} else {
    module.exports.SolvedProblem = Problem7;
}

