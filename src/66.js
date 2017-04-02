'use strict'

let Problem = require('./problem').Problem;
//big-integer is better than BigInt 
let bigInt = require("big-integer");

function Problem66 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem66.prototype = Object.create(Problem.prototype);
Problem66.prototype.constructor = Problem66;

/**
 * solver(x) finds root
 * for more info: https://en.wikipedia.org/wiki/Pell%27s_equation
 *
 * @return {Int} p[n]
 */
Problem66.prototype.solver = function (x) {
    var a, b, c, d, e, f, k, n;
    var p, q;

    k = Math.floor(Math.sqrt(x));
    if (k * k == x) return 0;

    a = k, e = k, f = 1, n = 1;
    p = [1, k], q = [0, 1];

    for (;;) {
      b = (x - e * e) / f;
      c = Math.floor((k + e) / b);
      d = c * b - e;
      a = c, e = d, f = b;
      if (a == 2 * k && n % 2 == 0) break;
      n += 1;
      p[n] = a * p[n - 1] + p[n - 2];
      q[n] = a * q[n - 1] + q[n - 2];
    }

    return p[n];
}

/**
 * getSolution() returns solution of problem
 *
 * @return {Int} denominator
 */
Problem66.prototype.getSolution = function () {

  console.time("Bruteforce");

  let ans = 0;
  let max = 0;
  for (let D = 2; D <= 1000; D++) {
    let x = this.solver(D);
    if (x > max) {
      max = x;
      ans = D;
    }
  }

  let result = ans

  console.timeEnd("Bruteforce");

  return result;
}

var problem_text = `
Consider quadratic Diophantine equations of the form:

x^2 – D*y^2 = 1

For example, when D=13, the minimal solution in x is 6492 – 13×1802 = 1.

It can be assumed that there are no solutions in positive integers when D is square.

By finding minimal solutions in x for D = {2, 3, 5, 6, 7}, we obtain the following:

3^2 – 2×2^2 = 1
2^2 – 3×1^2 = 1
9^2 – 5×4^2 = 1
5^2 – 6×2^2 = 1
8^2 – 7×3^2 = 1

Hence, by considering minimal solutions in x for D ≤ 7, the largest x is obtained when D=5.

Find the value of D ≤ 1000 in minimal solutions of x for which the largest value of x is obtained.`;


var problem = new Problem66(problem_text, process.argv.splice(
  2,process.argv.length-1));


problem.solve();
