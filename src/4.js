'use strict'
var problem = `A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.
\n
Find the largest palindrome made from the product of two 3-digit numbers.`
console.log(problem);

function checkIfPalindrom(number) {
  var str = number + '';
  return str == str.split('').reverse().join('');
}

function solution() {
  var result = 0;
  var palindroms = [];
  for (var i=999; i>100; i--) {
    for (var j=i; j>100; j--) {
      result = i*j;
      if (checkIfPalindrom(result)) {
        palindroms.push(result);
	break;
      }
    }
  } 

  return Math.max.apply(null, palindroms);
}

function solve () {
  return "Answer: " + solution();
}

console.log (solve());
