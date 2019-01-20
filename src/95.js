'use strict'

let Problem = require('./problem').Problem;
//big-integer is better than BigInt 
let bigInt = require("big-integer");
let fs = require('fs');

function Problem95 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
  this.primes = this.sieveOfEratosthenes(1000000);
}

Problem95.prototype = Object.create(Problem.prototype);
Problem95.prototype.constructor = Problem95;


/**
 * sumProperFactors(initial_number) returns sum of proper factors starting with
 * initial_number
 *
 * @param {Int} initial_number
 * @return {Object} [chain_length, smallest_number]
 */
Problem95.prototype.sumProperFactors = function (initial_number) {
    if (this.primes.indexOf(initial_number) > 0) 
        return 1;
    let rRoot = Math.sqrt(initial_number);
    let sqrtOfNumber = Math.floor(rRoot);
    let sum = 1;

    let range = Array.from({length: (sqrtOfNumber-1)} , (v,k) => k+1);
    let lows = range.filter(function (x) {
                    return (initial_number % x) === 0;
                });

    lows = lows.concat(lows.slice(1).map(function (x) {
                return initial_number / x;
            }).reverse().slice((rRoot === sqrtOfNumber) | 0));
 

    return lows.reduce( (prev, cur) => {
        return prev + cur;
    }, 0);
}



/**
 * getSolution() returns solution of problem
 *
 * @return {Int} denominator
 */
Problem95.prototype.getSolution = function () {

  if (require.main === module) {
    console.time("Bruteforce");
  }

  let chains = {};
  let longest_chain_length = 0,
      limit = 1000000,
      smallest_number = 0;


  for (let i = 2; i < limit+1; i++) {
        if (chains[i]) {
            continue;
        }
        let chain = [];
        let next_number = i, 
            exciding = false;

        while (!(next_number in chain))  {
            chain.push(next_number);
            next_number = this.sumProperFactors(i); 
            if ((next_number > limit) || (chains[next_number])) {
                exciding = true;
                break;
            }
        }
        if (!exciding) {
            let smallest = limit;
            let first = chain.indexOf(next_number);

            if (chain.length - first > longest_chain_length) {
                // We start with 'first' since chain can start in the middle
                // of sequence
                for (let j = first; j < chain.length; j++) {
                    if (chain[j] < smallest)
                        smallest = chain[j];
                }
                longest_chain_length = chain.length - first;
                smallest_number = smallest;
            }
        }
        

        for (let j = 0; j < chain.length; j++) {
            chains[chain[j]] = true;
        }
  }
  
  if (require.main === module) {
    console.timeEnd("Bruteforce");
  }
  return smallest_number;
}

var problem_text = `
The proper divisors of a number are all the divisors excluding the number \
itself. For example, the proper divisors of 28 are 1, 2, 4, 7, and 14. As\
 the sum of these divisors is equal to 28, we call it a perfect number.
\n
Interestingly the sum of the proper divisors of 220 is 284 and the sum of the\
 proper divisors of 284 is 220, forming a chain of two numbers. For this\
  reason, 220 and 284 are called an amicable pair.
\n
Perhaps less well known are longer chains. For example, starting with \
12496, we form a chain of five numbers:
\n
12496 → 14288 → 15472 → 14536 → 14264 (→ 12496 → ...)
\n
Since this chain returns to its starting point, it is called an amicable \
chain.
\n
Find the smallest member of the longest amicable chain with no element\
 exceeding one million.`;


var problem = new Problem95(problem_text, process.argv.splice(
  2,process.argv.length-1));


if (require.main === module) {
    problem.solve();
  } else {
    module.exports.SolvedProblem = Problem95;
}