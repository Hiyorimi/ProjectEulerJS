'use strict'

let Problem = require('./problem').Problem

/**
 * Sets Problem46
 * @class Class for solviong projecteuler 46th problem
 * @param {String} problem_text - Task as text
 * @param {Object} arguments - Arguments array 
 */
function Problem46 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
  this._primes = this.sieveOfEratosthenes(100000);
}

Problem46.prototype = Object.create(Problem.prototype);
Problem46.prototype.constructor = Problem46;


/**
 * isTwiceSquared(n) return true if x = sqrt(n/2) is an
 *
 * @param {Int} n
 * @return {Bool} 
 */
Problem46.prototype.isTwiceSquared = function (n) {
  let x = Math.sqrt(n/2);

  return (x == parseInt(x,10));
}


Problem46.prototype.getSolution = function () {
    let result = 33;
    let i = 0;

    console.time("Bruteforce");
    
    for ( ; result < 1000000; result += 2) {
      //if "is composite"
      if (this._primes.indexOf(result) < 0){
        let canBeWritten = false;
        for (i=0; result > this._primes[i]; i++) { 
            if (this.isTwiceSquared(result - this._primes[i])) {
              canBeWritten = true;
              break;
            }
        }
        if (!canBeWritten) {
          return result;
        }
      }
    }

    console.timeEnd("Bruteforce");

    return result;
}

let problem_text = `
It was proposed by Christian Goldbach that every odd composite number can be written as the sum of a prime and twice a square.
\n
9 = 7 + 2×12
15 = 7 + 2×22
21 = 3 + 2×32
25 = 7 + 2×32
27 = 19 + 2×22
33 = 31 + 2×12
\n
It turns out that the conjecture was false.
\n
What is the smallest odd composite that cannot be written as the sum of a prime and twice a square?`;


let problem = new Problem46(problem_text, process.argv.splice(2,process.argv.length-1));

problem.solve();
