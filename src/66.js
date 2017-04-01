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
 * getSolution() returns solution of problem
 *
 * @return {Int} denominator
 */
Problem66.prototype.getSolution = function () {

  console.time("Bruteforce");

  let maximum = 100,
      result = 0,
      d = bigInt(1),
      n = bigInt(2),
      t = bigInt(0);

  for (let i = 2; i <= maximum; i++) {
      t = d;
      let c = (i % 3 == 0) ? 2 * (i / 3) : 1;
      d = n; 
      n = d.multiply(c).add(t);
  }

  let divider = bigInt(10);
  result = n.toString().split('').reduce ( (p,v) => {
      return parseInt(p)+parseInt(v); 
  }, 0);

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
