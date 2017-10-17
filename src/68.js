'use strict'

let Problem = require('./problem').Problem;

function Problem68 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
  // Pre-generate all the available permutations
  this._permutations = this.getPermutations([1,2,3,4,5,6,7,8,9,10]);
}

var fs = require('fs');

Problem68.prototype = Object.create(Problem.prototype);
Problem68.prototype.constructor = Problem68;


Problem68.prototype.checkPermutation = function(p) {
    if (p[1] == 10 ||
        p[2] == 10 ||
        p[4] == 10 ||
        p[6] == 10 ||
        p[8] == 10) return false;
 
    if (p[0] > p[3] ||
        p[0] > p[5] ||
        p[0] > p[7] ||
        p[0] > p[9] ) return false;
 
    if (p[0] + p[1] + p[2] != p[3] + p[2] + p[4]) return false;
    if (p[0] + p[1] + p[2] != p[5] + p[4] + p[6]) return false;
    if (p[0] + p[1] + p[2] != p[7] + p[6] + p[8]) return false;
    if (p[0] + p[1] + p[2] != p[9] + p[8] + p[1]) return false;
 
    return true;
}

Problem68.prototype.getStringRepresentation = function (permutation) {
    let p = permutation.slice().map ( (e) => {
        return e.toString();
    });
    return "" + p[0] + p[1] + p[2]
    + p[3] + p[2] + p[4]
    + p[5] + p[4] + p[6]
    + p[7] + p[6] + p[8]
    + p[9] + p[8] + p[1];
}

Problem68.prototype.getSolution = function () {

  let permutation = [],
      number_as_string = '',
      result = 0;
    
  console.time("Bruteforce");

  for (let i = 0; i < this._permutations.length; i++) {
    permutation = this._permutations[i];
    if (this.checkPermutation(permutation)) {
        number_as_string = this.getStringRepresentation(permutation);
        console.log(number_as_string);
        if (parseInt(number_as_string) > result) 
            result = parseInt(number_as_string);
    }
  };
  

  console.timeEnd("Bruteforce");

  return result;
}

var problem_text = `
Consider the following "magic" 3-gon ring, filled with the numbers 
1 to 6, and each line adding to nine.
\n
\n
Working clockwise, and starting from the group of three with the 
numerically lowest external node (4,3,2 in this example), each 
solution can be described uniquely. For example, the above solution 
can be described by the set: 4,3,2; 6,2,1; 5,1,3.
\n
It is possible to complete the ring with four different totals: 
9, 10, 11, and 12. There are eight solutions in total.
\n
Total	Solution Set
9	4,2,3; 5,3,1; 6,1,2
9	4,3,2; 6,2,1; 5,1,3
10	2,3,5; 4,5,1; 6,1,3
10	2,5,3; 6,3,1; 4,1,5
11	1,4,6; 3,6,2; 5,2,4
11	1,6,4; 5,4,2; 3,2,6
12	1,5,6; 2,6,4; 3,4,5
12	1,6,5; 3,5,4; 2,4,6
By concatenating each group it is possible to form 9-digit strings; 
the maximum string for a 3-gon ring is 432621513.
\n
Using the numbers 1 to 10, and depending on arrangements, it is
possible to form 16- and 17-digit strings. What is the maximum 
16-digit string for a "magic" 5-gon ring?
\n
`;

var problem = new Problem68(problem_text);

console.log (problem.solve());
