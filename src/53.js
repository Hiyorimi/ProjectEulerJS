'use strict'

let Problem = require('./problem').Problem    
//big-integer is better than BigInt 
let bigInt = require("big-integer");

/**
 * Sets Problem53
 * @class Class for solviong projecteuler 51th problem
 * @param {String} problem_text - Task as text
 * @param {Object} arguments - Arguments array 
 */
function Problem53 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem53.prototype = Object.create(Problem.prototype);
Problem53.prototype.constructor = Problem53;

/**
 * factorial(n) returns factorial of a number
 *
 * @param {Int} n
 * @return {bigInt} factorial
 */
Problem53.prototype.factorial = function (n) {
    let result = bigInt(1);
    for (let i=2; i <=n; i++) {
        result = result.multiply(i);
    }
    return result;
}

/**
 * selection(r,n) returns selection of r from n
 *
 * @param {Int} r
 * @param {Int} n
 * @return {bigInt} n!/(r!(n-k)!)
 */
Problem53.prototype.selection = function (r,n) {
    let fac = this.factorial;
    return fac(n).divide( (fac(r).multiply(fac (n-r) )  ));
}

/**
 * selection_cached(r,n,factorials) returns selection of r from n
 *  with cached factorials
 *
 * @param {Int} r
 * @param {Int} n
 * @return {bigInt} n!/(r!(n-k)!)
 */
Problem53.prototype.selection_cached = function (r,n,factorials) {
    return (factorials[n]).divide( (factorials[r].multiply(factorials[n-r] )  ));
}

Problem53.prototype.getSolution = function () {
    

    console.time("Bruteforce");

    let result = bigInt(0);
    let limit = bigInt('1000000');
    let result_counter = 0;

    for (let n = 1; n <= 100; n++){
        for (let r = 1; r <= n; r++) {
            result = this.selection(r,n);
            if (result.compare(limit) > 0 )
                result_counter++;
        }
    }


    console.timeEnd("Bruteforce");

    console.time("Cached factorials");

    result = bigInt(0);
    let factorials = [];
    result_counter = 0;

    factorials.push(bigInt(1));
    for (let n = 1; n <= 100; n++) {
        factorials.push(this.factorial(n));
    }

    for (let n = 1; n <= 100; n++){
        for (let r = 1; r <= n; r++) {
            result = this.selection_cached(r,n,factorials);
            if (result.compare(limit) > 0 )
                result_counter++;
        }
    }


    console.timeEnd("Cached factorials");

    return result_counter;
}

let problem_text = `
There are exactly ten ways of selecting three from five, 12345:
\n
123, 124, 125, 134, 135, 145, 234, 235, 245, and 345
\n
In combinatorics, we use the notation, 5C3 = 10.
\n
In general,
\n
nCr =	
n!
r!(n−r)!
,where r ≤ n, n! = n×(n−1)×...×3×2×1, and 0! = 1.\n
It is not until n = 23, that a value exceeds one-million: 23C10 = 1144066.
\n
How many, not necessarily distinct, values of  nCr, for 1 ≤ n ≤ 100, are greater than one-million?`;


let problem = new Problem53(problem_text, process.argv.splice(2,process.argv.length-1));

problem.solve();
