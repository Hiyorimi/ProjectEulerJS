'use strict'

function Problem21 (problem_text) {
  this._problem_text = problem_text;
}
Problem21.prototype = Object.create(require("./problem").Problem.prototype);

Problem21.prototype.constructor = Problem21;

Problem21.prototype.getSolution = function () {

  var sum = 0, b = 0, sum_divisors2 = 0;
  var divisors1 = [], divisors2 = [];
  var sum_function = function (sum, current) {
    return sum + current;
  }
  for (var a=1;a<10000;a++) {
    divisors1 = this.getDivisors(a, true);
    b = divisors1.reduce(sum_function);
    divisors2 = this.getDivisors(b, true);
    sum_divisors2 = divisors2.reduce(sum_function); 
    console.log(a,b,divisors1,sum_divisors2)

    if ((a==sum_divisors2) && (b < 10000) && (a!=b)){
      sum += a;
    }
  }

  return sum;
}

var problem_text = `
Let d(n) be defined as the sum of proper divisors of n (numbers less than n which divide evenly into n).
If d(a) = b and d(b) = a, where a ≠ b, then a and b are an amicable pair and each of a and b are called amicable numbers.
\n
For example, the proper divisors of 220 are 1, 2, 4, 5, 10, 11, 20, 22, 44, 55 and 110; therefore d(220) = 284. The proper 
divisors of 284 are 1, 2, 4, 71 and 142; so d(284) = 220.
\n
Evaluate the sum of all the amicable numbers under 10000.`;

var problem = new Problem21(problem_text);

console.log (problem.getSolution());
