'use strict'

function Problem (problem_text) {
  this._problem_text = problem_text;
}

Problem.prototype.getProblemText = function () {
  return this._problem_text;
}

Problem.prototype.getSolution = function () {
  return 0;
}

Problem.prototype.solve = function () {
  return this.getProblemText() + "\nAnswer: " + this.getSolution();
}

function Problem17 (problem_text) {
  this._problem_text = problem_text;
}
Problem17.prototype = Object.create(Problem.prototype);
Problem17.prototype.constructor = Problem17;
Problem17.prototype.getStringFromNumber = function (num) {
    var ones = new Array('', ' one', ' two', ' three', ' four', ' five', ' six', ' seven', ' eight', ' nine', 
        ' ten', ' eleven', ' twelve', ' thirteen', ' fourteen', ' fifteen', ' sixteen', ' seventeen', ' eighteen', ' nineteen');
    var tens = new Array('', '', ' twenty', ' thirty', ' forty', ' fifty', ' sixty', ' seventy', ' eighty', ' ninety');
    var hundred = ' hundred';
    var output = '';
    var numString = num.toString();

    //the case of 10, 11, 12 ,13, .... 19 
    if (num < 20) {
        output = ones[num];
        return output;
    }

    //100 and more
    if (numString.length == 3) {
        output = ones[parseInt(numString.charAt(0))] + hundred;
        if (num % 100!=0)
            output += 'and';
        if (num % 100<20) {
            output += ones[parseInt(numString.charAt(1))*10+parseInt(numString.charAt(2))];
        }
        else {
            output += tens[parseInt(numString.charAt(1))];
            output += ones[parseInt(numString.charAt(2))];
        }
        return output;
    }

    output += tens[parseInt(numString.charAt(0))];
    output += ones[parseInt(numString.charAt(1))];

    return output;
}

Problem17.prototype.getSolution = function () {
    var length = 0, str ='', str2='';

    for(var i = 1; i < 1000; i++) {
        str = this.getStringFromNumber(i).replace(/ /g, '');        
        length += str.length;
    }
    length += 'onethousand'.length

    return length
}

var problem_text = `
If the numbers 1 to 5 are written out in words: one, two, three, four, five, then there are 3 + 3 + 5 + 4 + 4 = 19 letters used in total.
\n
If all the numbers from 1 to 1000 (one thousand) inclusive were written out in words, how many letters would be used?
\n
NOTE: Do not count spaces or hyphens. For example, 342 (three hundred and forty-two) contains 23 letters and 115 (one hundred and fifteen) 
contains 20 letters. The use of "and" when writing out numbers is in compliance with British usage.`;

var problem = new Problem17(problem_text);

console.log (problem.solve());
