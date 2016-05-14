'use strict'
var problem = `2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.
\n
What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?`
console.log(problem);


function solution() {
  var result = 1000;
  var exit = true;
  var divisible = true;
  while (exit) {

    divisible = true;
	for (var i=20; i>1; i--){
	  if (result%i != 0) {
         divisible = false;
         break;
      }
	} 
    if (divisible) return result
    result ++;
  }
}

function solve () {
  return "Answer: " + solution();
}

console.log (solve());
