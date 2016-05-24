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

function Problem31 (problem_text) {
  this._problem_text = problem_text;
  this.coins = [1, 2, 5, 10, 20, 50, 100, 200];
}

Problem31.prototype = Object.create(Problem.prototype);
Problem31.prototype.constructor = Problem31;


Problem31.prototype.countNumbers = function (sum) {
  var subset = this.getCoinsLessThan(sum);
  //At first we search for the least number to 
}

Problem31.prototype.getSolution = function () {

  var target  = 200;
  var ways = 0;
   
  //BruteForse approach

  //measuring time
  console.time("Bruteforce");
  for (var a = target; a >= 0; a -= 200) {
      for (var b = a; b >= 0; b -= 100) {
          for (var c = b; c >= 0; c -= 50) {
              for (var d = c; d >= 0; d -= 20) {
                  for (var e = d; e >= 0; e -= 10) {
                      for (var f = e; f >= 0; f -= 5) {
                          for (var g = f; g >= 0; g -= 2) {
                              ways++;
                          }
                      }
                  }
              }
          }
      }
  }
  console.timeEnd("Bruteforce");

  //Dynamic programming approach
  /*
  1: 1,
  2: 2, // [1,1] + [2]
  3: 2, // [1,1,1] + [1,2]
  4: 3, // [1,1,1,1] + [2,2] + [2,1,1]
  5: 6, // [1,1,1,1,1] + [1,1,1,2] + [1,2,2] + [5]
  6: 5, // [1,1,1,1,1,1] + [1,1,1,1,2] + [1,1,2,2] + [2,2,2] + [1,5]
  7: 6, // [1,1,1,1,1,1,1] + [1,1,1,1,1,2] + [1,1,1,2,2] + [1,2,2,2] + [1,1,5] + [2,5]
  8: 7, // [1,1,1,1,1,1,1,1] + [1,1,1,1,1,1,2] + [1,1,1,1,2,2] + [1,1,2,2,2] + [2,2,2,2] + [1,2,5] + [1,1,1,5]
  */

  var wayz = [];
  for (var i=0; i<target+1;i++)
    wayz[i] = 0;
  wayz[0] = 1;

  console.time("Dynamic programming");
  for (var i = 0; i < this.coins.length; i++) {
      for (var j = this.coins[i]; j <= target; j++) {
          wayz[j] += ((j - this.coins[i])<0) ? 0 : wayz[j - this.coins[i]];
      }
  }
  console.timeEnd("Dynamic programming");

  console.log('Dynamic programming gives same result as bruteforce: ' + (ways==wayz[200]));

  return ways;
}

var problem_text = `
In England the currency is made up of pound, £, and pence, p, and there are eight coins in general circulation:
\n
1p, 2p, 5p, 10p, 20p, 50p, £1 (100p) and £2 (200p).
It is possible to make £2 in the following way:
\n
1×£1 + 1×50p + 2×20p + 1×5p + 1×2p + 3×1p
How many different ways can £2 be made using any number of coins?`;

var problem = new Problem31(problem_text);

console.log (problem.solve());
