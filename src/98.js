'use strict'

let Problem = require('./problem').Problem;

function Problem98 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
  // Pre-generate all the available permutations
  this._permutations = this.getAllSubsetPermutations('123456789');
}

var fs = require('fs');

Problem98.prototype = Object.create(Problem.prototype);
Problem98.prototype.constructor = Problem98;

Problem98.prototype.getHash = function (word) {
  return word.split("").sort().join("");
}

/**
 * getNumericalRepresentation(word, coding) codes the word
 *
 * @param {Object} word
 * @param {Object} coding - encoding
 * @return {Int} number_from_word
 */
Problem98.prototype.getNumericalRepresentation = function (word, coding) {
    let number_from_word = '';
    for (let i = 0; i < word.length; i++) {
        number_from_word += coding[word[i]];
    }
    return parseInt(number_from_word);
}


/**
 * getWordCoding(unique_word, permutation) returns encoding of the word
 *
 * @param {Object} unique_word
 * @param {Object} permutation - encodes the word
 * @return {Object} coding
 */
Problem98.prototype.getWordCoding = function (unique_word, permutation) {
    let coding = {};
    for (let i = 0; i < unique_word.length; i++) {
        coding[unique_word[i]] = permutation[i];
    }
    return coding;
}


/**
 * getMaximumSquare(word_a, word_b, maximum_square) returns maximum square,
 * based on the word
 *
 * @param {String} word_a
 * @param {String} word_b
 * @param {Int} maximum_square
 * @return {Int} _maximum_square
 */
Problem98.prototype.getMaximumSquare = function (word_a, word_b, maximum_square) {
    // Initiation
    let unique_word = this.getUniqueString(word_a);
    let unique_word_length = unique_word.length;
    let number_a = 0,
        number_b = 0,
        coding = {};
    let permutations = this._permutations[unique_word_length];
    let _maximum_square = maximum_square;
    for (let i = 0; i < permutations.length; i++) {
        coding = this.getWordCoding(unique_word, permutations[i]) 
        number_a = this.getNumericalRepresentation(word_a, coding);
        number_b = this.getNumericalRepresentation(word_b, coding);
        if ( (this.isSquare(number_a)) && (this.isSquare(number_b)) ) {
            _maximum_square = Math.max(number_a, number_b, _maximum_square);
        }
    }
    
    return _maximum_square;
}

Problem98.prototype.getSolution = function () {
    
  console.time("Bruteforce");
  let file_contents = fs.readFileSync(__dirname + '/p098_words.txt');
  let words = file_contents.toString().replace(/['"]+/g, '').split(',');
  let hashes = {};
  let that = this;

  let result = 0;

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
    if (hashes[key].length > 1) {
        for (let i = 0; i < hashes[key].length; i++) 
            for (let j = i+1 ; j < hashes[key].length; j++)
                result = that.getMaximumSquare(hashes[key][i], hashes[key][j], result);
    }
 });
  

  console.timeEnd("Bruteforce");

  return result;
}

var problem_text = `
By replacing each of the letters in the word CARE with 1, 2, 9, and 6 respectively, we form a square number: 1296 = 362. What is remarkable is that, by using the same digital substitutions, the anagram, RACE, also forms a square number: 9216 = 962. We shall call CARE (and RACE) a square anagram word pair and specify further that leading zeroes are not permitted, neither may a different letter have the same digital value as another letter.

Using words.txt (right click and 'Save Link/Target As...'), a 16K text file containing nearly two-thousand common English words, find all the square anagram word pairs (a palindromic word is NOT considered to be an anagram of itself).

What is the largest square number formed by any member of such a pair?

NOTE: All anagrams formed must be contained in the given text file.`;

var problem = new Problem98(problem_text);

if (require.main === module) {
    problem.solve();
  } else {
    module.exports.SolvedProblem = Problem98;
}
