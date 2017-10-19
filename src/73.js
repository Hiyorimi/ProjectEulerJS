'use strict'

let Problem = require('./problem').Problem;

function Problem73 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem73.prototype = Object.create(Problem.prototype);
Problem73.prototype.constructor = Problem73;



/**
 * getSolution() returns solution of problem
 *
 * @return {Int} denominator
 */
Problem73.prototype.getSolution = function () {

  console.time("Bruteforce");

  let a = 3,
      b = 2,
      limit = 12000,
      result = 0;
  
  for (let d = 5; d <= limit; d++) {
    for (let i = parseInt(d / a) + 1; i < parseInt((d - 1) / b) + 1; i++) {
      if (this.gcd(i,d) == 1) result ++;
    }
  }

  console.timeEnd("Bruteforce");

  return result;
}

var problem_text = `
Consider the fraction, n/d, where n and d are positive integers. 
If n<d and HCF(n,d)=1, it is called a reduced proper fraction.
\n
If we list the set of reduced proper fractions for d ≤ 8 in ascending 
order of size, we get:
\n
1/8, 1/7, 1/6, 1/5, 1/4, 2/7, 1/3, 3/8, 2/5, 3/7, 1/2, 4/7, 3/5, 5/8, 
2/3, 5/7, 3/4, 4/5, 5/6, 6/7, 7/8
\n
It can be seen that there are 21 elements in this set.
\n
How many elements would be contained in the set of reduced proper 
fractions for d ≤ 1,000,000?`;


var problem = new Problem73(problem_text, process.argv.splice(
  2,process.argv.length-1));


problem.solve();
