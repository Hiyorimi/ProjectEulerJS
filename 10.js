'use strict'
var problem = `The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.
\n
Find the sum of all the primes below two million.`
console.log(problem);



function solution (max) {
	var sieve = [], i, j, primes = [];
    for (i = 2; i <= max; ++i) {
        if (!sieve[i]) {
            // i has not been marked -- it is prime
            primes.push(i);
            for (j = i << 1; j <= max; j += i) {
                sieve[j] = true;
            }
        }
    }

    return primes.reduce(function (sum,current) {
    	return sum+current;
    })
}

function solve () {
  return "Answer: " + solution(2000000);
}

console.log (solve());
