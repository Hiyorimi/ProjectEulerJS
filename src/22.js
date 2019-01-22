'use strict'

const Problem = require('./problem').Problem;
function Problem22 (problem_text) {
  this._problem_text = problem_text;
}

var fs = require('fs');
Problem22.prototype = Object.create(Problem.prototype);
Problem22.prototype.constructor = Problem22;
Problem22.prototype.getCharNumber = function (char) {
  return char.charCodeAt(0)-64;
}
Problem22.prototype.getCharsSum = function (str) {
  var sum = 0;
  for (var i in str) {
    sum += this.getCharNumber(str[i]);
  }
  return sum;
}
Problem22.prototype.getSolution = function () {
    
  var names = fs.readFileSync(__dirname+'/p022_names.txt');
  var names_arr = names.toString().split(',').map(function (elem) {
    return elem.replace(/"/g,'');
  }).sort();

  var sum = 0;
  for (var i=0; i<names_arr.length; i++) {
    sum += (i+1) * this.getCharsSum(names_arr[i]);
  }

  return sum;
}

var problem_text = `
Using names.txt (right click and 'Save Link/Target As...'), a 46K text file containing over five-thousand first names, begin by sorting it into alphabetical order. Then working out the alphabetical value for each name, multiply this value by its alphabetical position in the list to obtain a name score.
\n
For example, when the list is sorted into alphabetical order, COLIN, which is worth 3 + 15 + 12 + 9 + 14 = 53, is the 938th name in the list. So, COLIN would obtain a score of 938 × 53 = 49714.
\n
What is the total of all the name scores in the file?`;

var problem = new Problem22(problem_text);

console.log (problem.getSolution());
