'use strict'

let Problem = require('./problem').Problem;
//big-integer is better than BigInt 
let bigInt = require("big-integer");

function Problem65 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem65.prototype = Object.create(Problem.prototype);
Problem65.prototype.constructor = Problem65;


/**
 * getSolution() returns solution of problem
 *
 * @return {Int} denominator
 */
Problem65.prototype.getSolution = function () {

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
Problem text is better to be viewed at: https://projecteuler.net/problem=65`;


var problem = new Problem65(problem_text, process.argv.splice(
  2,process.argv.length-1));


problem.solve();
