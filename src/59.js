'use strict'

let Problem = require('./problem').Problem;
//big-integer is better than BigInt 
let bigInt = require("big-integer");
let fs = require('fs');

function Problem59 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem59.prototype = Object.create(Problem.prototype);
Problem59.prototype.constructor = Problem59;



/**
 * getSortedKeys(onj) returns dictionary sorted by values
 *
 * @param {Dict} obj
 * @return {Array} sorted array of keys (desc)
 */
Problem59.prototype.getSortedKeys = function (obj) {
    var keys = []; for(var key in obj) keys.push(key);
    return keys.sort(function(a,b){return obj[a]-obj[b]});
}

/**
 * getSolution() returns solution of problem
 *
 * @return {Int} denominator
 */
Problem59.prototype.getSolution = function () {

  console.time("Bruteforce");

  let file_contents = fs.readFileSync('p059_cipher.txt');
  let numbers = file_contents.toString().split(',');
  let message_length = numbers.length;
  let cipthertext = numbers.map(function (x) {
    return (+x);
  });
  let key = [];
  let result = [];
  let text = '';
  let j = 0;

  let frequency = [{},{},{}];

  // We need to split message in three, cause each part has 
  // it's own key (as a character);
  for (let i = 0; i < message_length; i++) {
    j = i % 3;
    if (cipthertext[i] in frequency[j]) 
      frequency[j][cipthertext[i]] ++
    else 
      frequency[j][cipthertext[i]] = 1;
  }

  // We XOR each most frequent key with ' ', cause 
  // space is the most common character
  for (let i = 0; i < 3; i++) {
    key[i] = (this.getSortedKeys(frequency[i]).reverse()[0]) ^ ' '.charCodeAt(0);
  }

  for (let i = 0; i < message_length; i++) {
    result += String.fromCharCode(cipthertext[i] ^ key[i % 3]);
  }


  console.timeEnd("Bruteforce");

  return result;
}

var problem_text = `
Each character on a computer is assigned a unique code and the preferred 
standard is ASCII (American Standard Code for Information Interchange). 
For example, uppercase A = 65, asterisk (*) = 42, and lowercase k = 107.
\n
A modern encryption method is to take a text file, convert the bytes to 
ASCII, then XOR each byte with a given value, taken from a secret key. 
The advantage with the XOR function is that using the same encryption 
key on the cipher text, restores the plain text; for example, 
65 XOR 42 = 107, then 107 XOR 42 = 65.
\n
For unbreakable encryption, the key is the same length as the plain text 
message, and the key is made up of random bytes. The user would keep the 
encrypted message and the encryption key in different locations, and 
without both "halves", it is impossible to decrypt the message.
\n
Unfortunately, this method is impractical for most users, so the modified 
method is to use a password as a key. If the password is shorter than the 
message, which is likely, the key is repeated cyclically throughout the 
message. The balance for this method is using a sufficiently long password
 key for security, but short enough to be memorable.
\n
Your task has been made easy, as the encryption key consists of three lower 
case characters. Using cipher.txt (right click and 'Save Link/Target As...'),
 a file containing the encrypted ASCII codes, and the knowledge that the plain
  text must contain common English words, decrypt the message and find the sum
   of the ASCII values in the original text.`;


var problem = new Problem59(problem_text, process.argv.splice(
  2,process.argv.length-1));


problem.solve();
