'use strict'
var problem = `By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13, we can see that the 6th prime is 13.

What is the 10 001st prime number?`
console.log(problem);

function nThPrime (n) {
    var primes = new Array(n + 1);
    primes[1] = 2;
    Find: for (var i = 2, test = 3; i <= n; test += 1) {
        // see if test is prime and if so, it will be the ith prime.
        for (var j = 1; j < i; j += 1) {
            if (test % primes[j] === 0) {
                continue Find;
            }
        }
        primes[i] = test;
        i += 1;
    }
    return primes[n];
}


function solution (num) {
  return nThPrime(num);
}

function solve () {
  return "Answer: " + solution(10001);
}

console.log (solve());
