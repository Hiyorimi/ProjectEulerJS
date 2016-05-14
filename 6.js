'use strict'
var problem = `The sum of the squares of the first ten natural numbers is,
\n
12 + 22 + ... + 102 = 385
The square of the sum of the first ten natural numbers is,
\n
(1 + 2 + ... + 10)2 = 552 = 3025
Hence the difference between the sum of the squares of the first ten natural numbers and the square of the sum is 3025 − 385 = 2640.
\n
Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum.`

console.log(problem);


function solution() {
  var result = 0;
  var squares = [];
  var numbers = [];
  for (var i=1; i<101; i++) {
    squares.push(i*i);
    numbers.push(i); 
  } 

  var a = numbers.reduce(function(sum, current) {
    return sum + current;
  });

  return a*a - squares.reduce(function(sum, current) {
    return sum + current;
  });
}

function solve () {
  return "Answer: " + solution();
}

console.log (solve());
