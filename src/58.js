'use strict'

let Problem = require('./problem').Problem;
//big-integer is better than BigInt 
let bigInt = require("big-integer");

function Problem58 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem58.prototype = Object.create(Problem.prototype);
Problem58.prototype.constructor = Problem58;


/**
 * isPrime(number) checks if number is a prime
 *
 * @param {Int} number
 * @return {Int} denominator
 */
Problem58.prototype.isPrime = function (number) {
    var start = 2;
    while (start <= Math.sqrt(number)) {
        if (number % start++ < 1) return false;
    }
    return number > 1;
}

/**
 * getSolution() returns solution of problem
 *
 * @return {Int} denominator
 */
Problem58.prototype.getSolution = function () {

  console.time("Bruteforce");
  let number_of_primes = 3;
  let side_length = 2;
  let prime = bigInt(9);
  
  while( (number_of_primes.toFixed(2))/ ( 2 * side_length + 1) > 0.10){
      side_length += 2;
      for(let i = 0; i < 3; i++){
          prime = prime.add(side_length);
          // We can only count number of primes, there is no need of 
          // storing any of them
          if(this.isPrime(prime)) number_of_primes++;
      }
      prime = prime.add(side_length);
  }

  console.timeEnd("Bruteforce");

  return side_length+1;
}

var problem_text = `
Starting with 1 and spiralling anticlockwise in the following way, a square 
spiral with side length 7 is formed.
\n
37 36 35 34 33 32 31
38 17 16 15 14 13 30
39 18  5  4  3 12 29
40 19  6  1  2 11 28
41 20  7  8  9 10 27
42 21 22 23 24 25 26
43 44 45 46 47 48 49
\n
It is interesting to note that the odd squares lie along the bottom right 
diagonal, but what is more interesting is that 8 out of the 13 numbers 
lying along both diagonals are prime; that is, a ratio of 8/13 ≈ 62%.
\n
If one complete new layer is wrapped around the spiral above, a square 
spiral with side length 9 will be formed. If this process is continued, 
what is the side length of the square spiral for which the ratio of primes 
along both diagonals first falls below 10%?`;


var problem = new Problem58(problem_text, process.argv.splice(
  2,process.argv.length-1));


problem.solve();
