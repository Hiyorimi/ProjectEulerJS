'use strict'

let Problem = require('./problem').Problem

/**
 * Sets Problem40
 * @class Class for solviong projecteuler 40th problem
 * @param {String} problem_text - Task as text
 * @param {Object} arguments - Arguments array 
 */
function Problem40 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem40.prototype = Object.create(Problem.prototype);
Problem40.prototype.constructor = Problem40;



Problem40.prototype.getSolution = function () {

    let ds = [1,10,100,1000,10000,100000,1000000]
    let result = 1;
    let break_condition = true;
    let fraction = '0.1';
    let i = 2;

    console.time("Bruteforce");
    while (break_condition) {
        fraction += i.toString();
        if (fraction.length > 1000001)
            break_condition = false;
      i++;
    }

    for (let i = 0; i < ds.length; i++){
        result *= +fraction[ds[i]+1];  
    }

    console.timeEnd("Bruteforce");

    return result;
}

let problem_text = `
An irrational decimal fraction is created by concatenating the positive integers:
\n
0.123456789101112131415161718192021...
\n
It can be seen that the 12th digit of the fractional part is 1.
\n
If dn represents the nth digit of the fractional part, find the value of the following expression.
\n
d1 × d10 × d100 × d1000 × d10000 × d100000 × d1000000`;


let problem = new Problem40(problem_text, process.argv.splice(2,process.argv.length-1));

problem.solve();
