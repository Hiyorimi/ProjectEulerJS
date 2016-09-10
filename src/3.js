'use strict'
var problem = `The prime factors of 13195 are 5, 7, 13 and 29.
\n
What is the largest prime factor of the number 600851475143 ?`
console.log(problem);


function solution() {
  var result = 0;

  var number = 600851475143;
 
  var primes_less_than_number = findAllPrimesLessThan(8000);

  var factors = [];

  var d = 2;

  while (number>1) {
    while (number % d ==0) {
      factors.push(d);
      number /= d;
    }
    d = d + 1;
    if (d*d > number){ 
      if (number>1) factors.push(number);
      break;
    }
  }

  return factors;
}

function solve () {
  return "Answer: " + solution();
}

console.log (solve());
