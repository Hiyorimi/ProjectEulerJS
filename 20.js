'use strict'

function Problem20 (problem_text) {
  this._problem_text = problem_text;
}
Problem20.prototype = Object.create(require("./problem").Problem.prototype);
var BigInt = require("BigInt");

Problem20.prototype.constructor = Problem20;

Problem20.prototype.factorial = function (n) {
    var bn = BigInt.int2bigInt(n, 0, 0);
    var result = BigInt.int2bigInt(1,0,0);

    if ( BigInt.equalsInt(bn, 1) ) { 
        return BigInt.int2bigInt(1,0,0); 
    }
    else { 
      while ( n != 1 )
      {
         result = BigInt.mult(result, bn);
         n--;
         bn=BigInt.int2bigInt(n,0,0);
      }
    }
    return result;
}

Problem20.prototype.getSolution = function () {

   var sum = 0;
   var factorial = this.factorial(100);
   var factorial_string  = BigInt.bigInt2str(factorial,10).split('');
   for ( var number in factorial_string ) {
      sum += parseInt(factorial_string[i]);
   }

   return sum;
}

var problem_text = `
n! means n × (n − 1) × ... × 3 × 2 × 1
\т
For example, 10! = 10 × 9 × ... × 3 × 2 × 1 = 3628800,
and the sum of the digits in the number 10! is 3 + 6 + 2 + 8 + 8 + 0 + 0 = 27.
\т
Find the sum of the digits in the number 100!`;

var problem = new Problem20(problem_text);

console.log (problem.solve());
