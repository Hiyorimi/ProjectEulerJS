'use strict'

let Problem = require('./problem').Problem

/**
 * Sets Problem43
 * @class Class for solviong projecteuler 43th problem
 * @param {String} problem_text - Task as text
 * @param {Object} arguments - Arguments array 
 */
function Problem43 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
  this.divisors = [2,3,5,7,11,13,17]
}

Problem43.prototype = Object.create(Problem.prototype);
Problem43.prototype.constructor = Problem43;


/**
 * isPandigital(arr) returns true if all digits are different and are in range 0-9
 *
 * @param {Object} arr 
 * @return {Bool} result
 */
Problem43.prototype.isPandigital = function (arr) {

  let result = true;
  let s = '';
  let chars = {};

  for (let i = 0; i < arr.length; i++) {
    s = arr[i].toString();
    for (let j = 0; j < s.length; j++) {
      if (!(s[j] in chars)) {
        chars[s[j]] = 1;
      }
      else {
        result = false;
        break;
      }
    }
  }

  for (let i = 0; i < 10; i++) {
    if (arr.indexOf(i) < 0)
        result = false;
  }


  return result;
}



/**
 * getDigits(n) returns digits of input parameter
 *
 * @param {Int} n
 * @return {Array} digits
 */
Problem43.prototype.getDigits = function (n) {
  return n.toString().split('').map(function (elem) {
    return +elem;
  });
}

/**
 * substringDivisible(n) checks if substrings are divisible
 *
 * @param {Int} digits - Pandigital number as array of digits
 * @return {Bool} result
 */
Problem43.prototype.substringDivisible = function (digits) {
  let result = true;
  let number = 0;

  for (let i = 1; i < digits.length-2; i++){
    number = +( digits[i] * 100 + digits[i+1] * 10 + digits[i+2] );
    if (number % this.divisors[i-1] !=0 ) {
      result = false;
      break;
    }
  }

  return result;
}


/**
 * getPermutations(input_arr) returns all permutations of input_arr elements
 * From: http://stackoverflow.com/questions/9960908/permutations-in-javascript
 * 
 * @param {Int} input_arr - array to permutate
 * @return {Bool} result
 */
Problem43.prototype.getPermutations = function (input_arr) {
  var results = [];

  function permute(arr, memo) {
    var cur, memo = memo || [];

    for (var i = 0; i < arr.length; i++) {
      cur = arr.splice(i, 1);
      if (arr.length === 0) {
        results.push(memo.concat(cur));
      }
      permute(arr.slice(), memo.concat(cur));
      arr.splice(i, 0, cur[0]);
    }

    return results;
  }

  return permute(input_arr);
}


Problem43.prototype.getSolution = function () {

    let sum = 0;

    console.time("Bruteforce");

    //this will require some time, but we might later need function to get all permutations
    let pandigital_numbers = this.getPermutations([0,1,2,3,4,5,6,7,8,9]);
    // getPermutations returns also numbers starting with 0, but that doesn't suit us
    // so we start from 9! = 362880 number
    for (let i = 362880; i < pandigital_numbers.length; i++) {
      if (this.substringDivisible(pandigital_numbers[i]))
        sum += +pandigital_numbers[i].join('');
    }

    console.timeEnd("Bruteforce");

    console.time("Bruteforce with precheck");

    pandigital_numbers = this.getPermutations([0,1,2,3,4,5,6,7,8,9]);
    sum = 0;
    for (let i = 362880; i < pandigital_numbers.length; i++) {
      /* 
       d_6 has to be divisible by 5 or 0
       if d_6 = 0, then d_6d_7_d8 will be divisible by 11 only if equal 011,..,099
       therefore d_6 = 5
      */
      if ( (pandigital_numbers[i][5] != 5) 
        // check that d_2d_3d_4 divisible by 2 since d_4 = arr[3]
        || (pandigital_numbers[i][3] % 2 != 0) 
        //check that d_3d_4_d5 disible by 3 -- only if sum of digits divisble by 3
        || ( (pandigital_numbers[i][2] + pandigital_numbers[i][3] + pandigital_numbers[i][4] )  % 3 != 0 ) )
        continue;
      if (this.substringDivisible(pandigital_numbers[i]))
        sum += +pandigital_numbers[i].join('');
    }

    console.timeEnd("Bruteforce with precheck");

    return sum;
}

let problem_text = `
The number, 1406357289, is a 0 to 9 pandigital number because it is made up of each of the digits 0 to 9 in some order, but it also has a rather interesting sub-string divisibility property.
\n
Let d1 be the 1st digit, d2 be the 2nd digit, and so on. In this way, we note the following:
\n
d2d3d4=406 is divisible by 2
d3d4d5=063 is divisible by 3
d4d5d6=635 is divisible by 5
d5d6d7=357 is divisible by 7
d6d7d8=572 is divisible by 11
d7d8d9=728 is divisible by 13
d8d9d10=289 is divisible by 17
Find the sum of all 0 to 9 pandigital numbers with this property.`;


let problem = new Problem43(problem_text, process.argv.splice(2,process.argv.length-1));

problem.solve();
