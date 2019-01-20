'use strict'
let fs = require('fs');
let nomar = require('nomar');

function Problem89 (problem_text) {
  this._problem_text = problem_text;
}
Problem89.prototype = Object.create(require("./problem").Problem.prototype);
Problem89.prototype.constructor = Problem89;

Problem89.prototype.getSolution = function () {

    let toRoman = require('roman-numeral-converter-mmxvi');
    let file_contents = fs.readFileSync(__dirname + '/p089_roman.txt');
    let strings = file_contents.toString().split('\n');
    let number_of_characters = 0;
    for (let i = 0; i < strings.length; i++) {
        let number = parseFloat(nomar(strings[i]));
        number_of_characters += strings[i].length - 
            toRoman.getRomanFromInteger(number).toString().length;
    }

    return number_of_characters;
}

var problem_text = `
For a number written in Roman numerals to be considered valid there are basic rules which must be followed. Even though the rules allow some numbers to be expressed in more than one way there is always a "best" way of writing a particular number.

For example, it would appear that there are at least six ways of writing the number sixteen:

IIIIIIIIIIIIIIII
VIIIIIIIIIII
VVIIIIII
XIIIIII
VVVI
XVI

However, according to the rules only XIIIIII and XVI are valid, and the last example is considered to be the most efficient, as it uses the least number of numerals.

The 11K text file, roman.txt (right click and 'Save Link/Target As...'), contains one thousand numbers written in valid, but not necessarily minimal, Roman numerals; see About... Roman Numerals for the definitive rules for this problem.

Find the number of characters saved by writing each of these in their minimal form.

Note: You can assume that all the Roman numerals in the file contain no more than four consecutive identical units.`;

var problem = new Problem89(problem_text);

if (require.main === module) {
    problem.solve();
} else {
    module.exports.SolvedProblem = Problem89;
}
