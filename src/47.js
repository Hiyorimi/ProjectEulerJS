'use strict'

let Problem = require('./problem').Problem

/**
 * Sets Problem47
 * @class Class for solviong projecteuler 47th problem
 * @param {String} problem_text - Task as text
 * @param {Object} arguments - Arguments array 
 */
function Problem47 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem47.prototype = Object.create(Problem.prototype);
Problem47.prototype.constructor = Problem47;


Problem47.prototype.getSolution = function () {

  console.time("Bruteforce");

  //big-integer is better than BigInt 
  let bigInt = require("big-integer");
  let result = bigInt(0);

  for (let i = 1; i < 1001; i++){
    result = result.add(bigInt(i).pow(i));
  }

  console.timeEnd("Bruteforce");


  console.time("Smart modulo");
  // (a*b) % c = ((a % c) * (b % c) )% c
  // (a+b) % c = ((a % c) + (b % c) )% c.

  let result_2 = 0;
  let modulo = 10000000000;
  let temp = 0;
   
  for (let i = 1; i < 1001; i++) {
      temp = i;
      for (let j = 1; j < i; j++) {
          temp *= i;
          if (temp >= 10000000000) {
              temp %= modulo;
          }
      }
   
      result_2 += temp;
      result_2 %= modulo;
  }

  console.timeEnd("Smart modulo");

  console.log('Results are equal: ', result_2.toString()===result.mod(10000000000).toString());
  return result.mod(10000000000).toString();
}

let problem_text = `
The first two consecutive numbers to have two distinct prime factors are:
\n
14 = 2 × 7
15 = 3 × 5
\n
The first three consecutive numbers to have three distinct prime factors are:
\n
644 = 2² × 7 × 23
645 = 3 × 5 × 43
647 = 2 × 17 × 19.
\n
Find the first four consecutive integers to have four distinct prime factors. What is the first of these numbers?`;


let problem = new Problem47(problem_text, process.argv.splice(2,process.argv.length-1));

problem.solve();
