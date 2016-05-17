'use strict'

function Problem19 (problem_text) {
  this._problem_text = problem_text;
}
Problem19.prototype = Object.create(require("./problem").Problem.prototype);
Problem19.prototype.constructor = Problem19;

Problem19.prototype.getSolution = function () {
    var counter = 0, date = new Date(1901,0,1);
    for (var year=1901; year<=2000; year++) {
        date.setYear(year);
        for (var month=0;month<12;month++) {
            date.setMonth(month);
            if (date.getDay()==0)
                counter++;
        }
    }

    return counter;
}

var problem_text = `
You are given the following information, but you may prefer to do some research for yourself.
\n
1 Jan 1900 was a Monday.
Thirty days has September,
April, June and November.
All the rest have thirty-one,
Saving February alone,
Which has twenty-eight, rain or shine.
And on leap years, twenty-nine.
A leap year occurs on any year evenly divisible by 4, but not on a century unless it is divisible by 400.
\n
How many Sundays fell on the first of the month during the twentieth century (1 Jan 1901 to 31 Dec 2000)?`;

var problem = new Problem19(problem_text);

console.log (problem.solve());
