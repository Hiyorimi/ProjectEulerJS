'use strict'

let Problem = require('./problem').Problem;
let Fraction = require('fraction.js');

function Problem60 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
  this._primes = this.sieveOfEratosthenes(10000);
}

Problem60.prototype = Object.create(Problem.prototype);
Problem60.prototype.constructor = Problem60;




/**
 * _is_prime(number) checks if number is a prime
 *
 * @param {Int} number
 * @return {Int} denominator or false
 */

Problem60.prototype._is_prime = function (a) {
  return (this._primes.indexOf(a) > 0);
}

/**
 * makePairs(index) creates pairs for all the primes 
 * starting with index 
 *
 * @param {Int} index of prime
 * @return {Array} Array of coressponding primes
 */
Problem60.prototype.makePairs = function (a) {
  let pairs = [];
  for (let b = a + 1; b < this._primes.length; b++) {
    if (this.is_prime(parseInt("" + this._primes[a] + this._primes[b])) && 
        this.is_prime(parseInt("" + this._primes[b] + this._primes[a])) )
      pairs.push(this._primes[b]);
  }
  return pairs;
}

/**
 * satisfies(prime, set) checks if prime satisfies 
 * the condition
 *
 * @param {Int} prime
 * @param {Array} set
 * @return {Bool} If satisfies the condition
 */
Problem60.prototype.satisfies = function (p, set) {
  for (let i = 0; i < set.length; ++i) {
        if (!(this.is_prime(parseInt("" + p + set[i] )) && 
        this.is_prime(parseInt("" + set[i] + p)) ))
            return false;
        
    }
    return true;
}


/**
 * makePairs(index) creates pairs for all the primes 
 * starting with index 
 *
 * @param {Int} index of prime
 * @return {Array} Array of coressponding primes
 */
Problem60.prototype.makeSet = function (set, target, start) {
  if (set.length == 5) {
      let sum  = set.reduce( (prev, cur) => { return prev+cur; }, 0 );
      return sum < target ? sum : target;
  } else {
    for (var i = start; i < this._primes.length; ++i) {
            let p = this._primes[i]
            if (this.satisfies(p,set)) {
                let cset = set.slice(0);
                cset.push(p)
                let test = this.makeSet(cset, target, i)
                if (test < target) {
                    target = test;
                    console.log(cset);
                }
            }
        }
  }
  return target;
}


/**
 * getSolution() returns solution of problem
 *
 * @return {Int} denominator
 */
Problem60.prototype.getSolution = function () {

  console.time("Bruteforce");

  let limit = 1000000;
  let result = this.makeSet(new Array(), 10000000, 0);
  

  console.timeEnd("Bruteforce");

  return result;
}

var problem_text = `
The primes 3, 7, 109, and 673, are quite remarkable. By taking any two 
primes and concatenating them in any order the result will always be 
prime. For example, taking 7 and 109, both 7109 and 1097 are prime. 
The sum of these four primes, 792, represents the lowest sum for a 
set of four primes with this property.\n
\n
Find the lowest sum for a set of five primes for which any two 
primes concatenate to produce another prime.`;


var problem = new Problem60(problem_text, process.argv.splice(2,process.argv.length-1));


problem.solve();
