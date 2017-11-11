'use strict'

let Problem = require('./problem').Problem;

function Problem86 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem86.prototype = Object.create(Problem.prototype);
Problem86.prototype.constructor = Problem86;



/**
 * getSolution() returns solution of problem
 *
 * @return {Int} denominator
 */
Problem86.prototype.getSolution = function () {

  console.time("Bruteforce");

  let l = 2;
  let count = 0;
  let wh = 0
  let limit = 1000000;

  while (count < limit) {
    l++;
    for (wh = 3; wh <= 2 * l; wh++) {
        let sqrt = Math.sqrt(wh * wh + l * l);                    
        if (sqrt == parseInt(sqrt)) {
            count += (wh <= l) ? wh / 2 : 1 + (l - (wh+1)/2);
        }
    }
  }

  console.timeEnd("Bruteforce");

  return (wh-1)/2;
}

var problem_text = `https://projecteuler.net/problem=120`;


var problem = new Problem86(problem_text, process.argv.splice(
  2,process.argv.length-1));


problem.solve();
