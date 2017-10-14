'use strict'

let Problem = require('./problem').Problem;
//big-integer is better than BigInt 
let bigInt = require("big-integer");
let fs = require('fs');

function Problem94 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem94.prototype = Object.create(Problem.prototype);
Problem94.prototype.constructor = Problem94;


/**
 * getSolution() returns solution of problem
 *
 * @return {Int} denominator
 */
Problem94.prototype.getSolution = function () {

  console.time("Bruteforce");

  let side0 = bigInt(1),
      side = bigInt(1),
      side_t = bigInt(1),
      s = bigInt(0),
      p = bigInt(0),
      m = bigInt(1),
      target = bigInt('1e9'),
      result = bigInt(0);

  // while perimeter < target
  while (p.compare(target) < 0) {
    side_t = (side.multiply(4)).subtract(side0).add(m.multiply(2));
    side0 = side;
    side = side_t
    m = m.multiply(-1);
    s = s.add(p);
    p = side.multiply(3).subtract(m);
  }

  console.timeEnd("Bruteforce");

  return s;
}

var problem_text = `
It is easily proved that no equilateral triangle exists with integral length 
sides and integral area. However, the almost equilateral triangle 5-5-6 has 
an area of 12 square units.
\n
We shall define an almost equilateral triangle to be a triangle for which two 
sides are equal and the third differs by no more than one unit.
\n
Find the sum of the perimeters of all almost equilateral triangles 
with integral side lengths and area and whose perimeters do not 
exceed one billion (1,000,000,000).`;


var problem = new Problem94(problem_text, process.argv.splice(
  2,process.argv.length-1));


problem.solve();
