'use strict'

const Problem = require('./problem').Problem;

function Problem26 (problem_text) {
  this._problem_text = problem_text;
}

Problem26.prototype = Object.create(Problem.prototype);
Problem26.prototype.constructor = Problem26;

Problem26.prototype.checkIfThereIsPeriod = function (arr) {
  if (arr.length % 2 != 0)
    return false;
  else {
    var half_length = arr.length / 2;
    for (var i=0;i<half_length;i++){
      if (arr[i]!=arr[half_length+i])
        return false;
    }
    return true;
  }
}

Problem26.prototype.getSolution = function () {
    
  var remainders = [];
  var remainder = 0;
  var remainders_length = 0;
  var result = 0;
  var max_period = 0;
  var value = 1;

  for (var i = 1000; i > 100; i--) {
    remainders = [];
    value = 10;
    remainder = value % i;
    remainders.push(remainder);
    remainders_length = 0; //Forgetting to reset length cost me 30 minutes of debug
    value = remainder;
    while ((!this.checkIfThereIsPeriod(remainders)) && (remainder!=0) && (remainders_length<2*i)) {
      value *= 10;
      remainder = value % i;
      remainders.push(remainder);
      value = remainder;
      remainders_length = remainders.length;
    } 
    if ((this.checkIfThereIsPeriod(remainders)) && (remainders.length/2>max_period)) {
      max_period = remainders.length/2;
    }
    
  }

  //Since theretical maximum period is d-1, we return d+1 as the solution of problem
  return max_period+1;
}

var problem_text = `
A unit fraction contains 1 in the numerator. The decimal representation of the unit fractions with denominators 2 to 10 are given:
\n
1/2 =   0.5
1/3 =   0.(3)
1/4 =   0.25
1/5 =   0.2
1/6 =   0.1(6)
1/7 =   0.(142857)
1/8 =   0.125
1/9 =   0.(1)
1/10  =   0.1
Where 0.1(6) means 0.166666..., and has a 1-digit recurring cycle. It can be seen that 1/7 has a 6-digit recurring cycle.
\n
Find the value of d < 1000 for which 1/d contains the longest recurring cycle in its decimal fraction part.`;

var problem = new Problem26(problem_text);

console.log (problem.solve());
