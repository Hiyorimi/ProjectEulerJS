'use strict'

const Problem = require('./problem').Problem;

function Problem27 (problem_text) {
  this._problem_text = problem_text;
  this.primes = this.sieveOfEratosthenes(87400);
  this.possible_b = this.sieveOfEratosthenes(1000);
}

Problem27.prototype = Object.create(Problem.prototype);
Problem27.prototype.constructor = Problem27;

Problem27.prototype.getSolution = function () {

  var n_max = 0, sign = 0;
  var result = 0;

  for (var a = -1000; a < 1001; a++) {
    //With n = 0: n2 + an + b  = b
    //b has to be a prime.
    for (var b_index = 0; b_index<this.possible_b.length; b_index++) {
      for (var j = 0; j < 2; j++){
        sign = (j==0) ? -1 : 1;
        var b = sign*this.possible_b[b_index];
        //for n=1 we have a+b+1 and a+b has to be even
        //abs, because and b can be negative
        if (Math.abs(a+b) % 2 == 0) {
          var n = 0
          while (this.isPrime(n*n + a*n + b)) {
            n++;
          }
          if (n > n_max) {
            n_max = n;
            result = a*b;
          }
        }
      }
    }
  }

  return result;
}

var problem_text = `
Euler discovered the remarkable quadratic formula:
\n
n² + n + 41
\n
It turns out that the formula will produce 40 primes for the consecutive values n = 0 to 39. However, when n = 40, 402 + 40 + 41 = 40(40 + 1) + 41 is divisible by 41, and certainly when n = 41, 41² + 41 + 41 is clearly divisible by 41.
\n
The incredible formula  n² − 79n + 1601 was discovered, which produces 80 primes for the consecutive values n = 0 to 79. The product of the coefficients, −79 and 1601, is −126479.
\n
Considering quadratics of the form:
\n
n² + an + b, where |a| < 1000 and |b| < 1000
\n
where |n| is the modulus/absolute value of n
e.g. |11| = 11 and |−4| = 4
Find the product of the coefficients, a and b, for the quadratic expression that produces the maximum number of primes for consecutive values of n, starting with n = 0.`;

var problem = new Problem27(problem_text);

console.log (problem.solve());
