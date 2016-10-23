'use strict'

let Problem = require('./problem').Problem;
//big-integer is better than BigInt 
let bigInt = require("big-integer");

/**
 * Sets Problem57
 * @class Class for solviong projecteuler 51th problem
 * @param {String} problem_text - Task as text
 * @param {Object} arguments - Arguments array 
 */
function Problem57 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem57.prototype = Object.create(Problem.prototype);
Problem57.prototype.constructor = Problem57;


Problem57.prototype.getSolution = function () {

    console.time("Bruteforce");

    let numerator = bigInt(3);
    let denominator = bigInt(2);
    let result = 0;

    for (let i=2; i < 1000; i++) {
        //important to use .functions
        numerator = numerator.add(denominator.multiply(2));
        denominator = numerator.subtract(denominator);
        if (numerator.toString().length > denominator.toString().length)
            result++;
    }

    console.timeEnd("Bruteforce");

    return result;
}


let problem_text = `
It is possible to show that the square root of two can be expressed as 
an infinite continued fraction.
\n
√ 2 = 1 + 1/(2 + 1/(2 + 1/(2 + ... ))) = 1.414213...
\n
By expanding this for the first four iterations, we get:
\n
1 + 1/2 = 3/2 = 1.5
1 + 1/(2 + 1/2) = 7/5 = 1.4
1 + 1/(2 + 1/(2 + 1/2)) = 17/12 = 1.41666...
1 + 1/(2 + 1/(2 + 1/(2 + 1/2))) = 41/29 = 1.41379...
\n
The next three expansions are 99/70, 239/169, and 577/408, but the eighth 
expansion, 1393/985, is the first example where the number of digits in 
the numerator exceeds the number of digits in the denominator.
\n
In the first one-thousand expansions, how many fractions contain a 
numerator with more 
digits than denominator?`;

let problem = new Problem57(problem_text, process.argv.splice(
    2,process.argv.length-1));

problem.solve();
