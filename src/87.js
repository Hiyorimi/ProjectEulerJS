'use strict'

let Problem = require('./problem').Problem;

function Problem87 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
  this._primes = this.sieveOfEratosthenes(7081); // sqrt(50M)
}

Problem87.prototype = Object.create(Problem.prototype);
Problem87.prototype.constructor = Problem87;


/**
 * getSolution() returns solution of problem
 *
 * @return {Int} denominator
 */
Problem87.prototype.getSolution = function () {


  if (require.main === module) {
        console.time("Bruteforce");
  }


  let limit = 50000000,
      number = 0,
      result = 0,
      numbers = {};
  for (let i = 0; i < this._primes.length; i++) {
      for (let j = 0; j < this._primes.length; j++) {
        for (let k = 0; k < this._primes.length; k++) {
            number = Math.pow(this._primes[i],2) + 
                Math.pow(this._primes[j],3) + 
                Math.pow(this._primes[k],4);
            if (number > limit)
                break;
            else
                if (!(numbers[number])) {
                    numbers[number] = true;
                    result++;
                }
        }
      }
  }
  
  if (require.main === module) {
    console.timeEnd("Bruteforce");
  }

  return result;
}

var problem_text = `
The smallest number expressible as the sum of a prime square, prime cube, 
and prime fourth power is 28. In fact, there are exactly four numbers below 
fifty that can be expressed in such a way:

28 = 2^2 + 2^3 + 2^4
33 = 3^2 + 2^3 + 2^4
49 = 5^2 + 2^3 + 2^4
47 = 2^2 + 3^3 + 2^4

How many numbers below fifty million can be expressed as the sum of a 
prime square, prime cube, and prime fourth power?`;


var problem = new Problem87(problem_text, process.argv.splice(2,process.argv.length-1));



if (require.main === module) {
    problem.solve();
} else {
    module.exports.SolvedProblem = Problem87;
}