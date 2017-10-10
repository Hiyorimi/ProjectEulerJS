'use strict'

let Problem = require('./problem').Problem;

function Problem98 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

var fs = require('fs');

Problem98.prototype = Object.create(Problem.prototype);
Problem98.prototype.constructor = Problem98;

Problem98.prototype.countUniqueStringLength = function (str) {
    var length = 0;
    for (var x = 0; x < str.length; x++) {

        if(unique.indexOf(str.charAt(x))==-1) {
            length += 1;  
        }
    }
    return length;  
} 

Problem98.prototype.getHash = function (word) {
  return word.split("").sort().join("");
}

Problem98.prototype.getAllSquaresAndCodings = function (word, number_from_word) {
    if (word.length == number_from_word.length) {
        // Check that number is a square
        let square = number_from_word.split("").reduce(function (prev, cur) {
            return prev + cur*cur;
        }, 0);
        if (Math.sqrt(square) % 1 === 0) {
            return square;
        }
    } else {
        // Initiation
        for (let i = number_from_word.length; i < word.length; i++) {
            for (let j = 0; j < 10; j++)
                return 
        }
    }
    
}

Problem98.prototype.getMaximumSquareHash = function (words) {
    for (let word of words) {
        
    }
}

Problem98.prototype.getSolution = function () {
    
  console.time("Bruteforce");
  let file_contents = fs.readFileSync('p098_words.txt');
  let words = file_contents.toString().replace(/['"]+/g, '').split(',');
  let hashes = {};

  for (let i = 0; i < words.length; i++) {
      let word = words[i];
      let hashed_word = this.getHash(word);
      if (!(hashed_word in hashes)) 
        hashes[hashed_word] = [word];
      else {
        hashes[hashed_word].push(word);
      }
  }
  Object.keys(hashes).map(function(key, index) {
    if (hashes[key].length > 1) 
        console.log(hashes[key]);
 });
  

  console.timeEnd("Bruteforce");

  return 1;
}

var problem_text = `
By replacing each of the letters in the word CARE with 1, 2, 9, and 6 respectively, we form a square number: 1296 = 362. What is remarkable is that, by using the same digital substitutions, the anagram, RACE, also forms a square number: 9216 = 962. We shall call CARE (and RACE) a square anagram word pair and specify further that leading zeroes are not permitted, neither may a different letter have the same digital value as another letter.

Using words.txt (right click and 'Save Link/Target As...'), a 16K text file containing nearly two-thousand common English words, find all the square anagram word pairs (a palindromic word is NOT considered to be an anagram of itself).

What is the largest square number formed by any member of such a pair?

NOTE: All anagrams formed must be contained in the given text file.`;

var problem = new Problem98(problem_text);

console.log (problem.solve());
