'use strict'

let Problem = require('./problem').Problem;
let regression = require('regression');

function Problem101 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem101.prototype = Object.create(Problem.prototype);
Problem101.prototype.constructor = Problem101;



/**
 * getSolution() returns solution of problem
 *
 * @return {Int} denominator
 */
Problem101.prototype.getSolution = function () {

  console.time("Bruteforce");
  let coefficients = [1, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1];
  let points = [];
  let result = 1;
  
  // Generate 11 points 
  for (let x = 1; x <= 11; x += 1) {
    let y = 0;
    let str = '';
    for (let i = 0; i <= 10; i++) {
      y += coefficients[i] * Math.pow(x, i);
      str += (coefficients[i] == 1) ? " +" : " -";
      str += x.toString() + "^" + i;
    }
    points.push([x,y]);
  }

  for (let i = 1; i < 10; i++) {
    let solution = regression.polynomial(points.slice(0,i+1), { order: i });
    result += solution.predict(i+2)[1];
  }

  console.timeEnd("Bruteforce");

  // Answer will be different from Project Euler expected, 
  // since regression module errors
  return result;
}

var problem_text = `https://projecteuler.net/problem=101`;


var problem = new Problem101(problem_text, process.argv.splice(
  2,process.argv.length-1));


problem.solve();
