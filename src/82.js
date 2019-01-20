'use strict'

let fs = require('fs');
let Problem = require('./problem').Problem;

function Problem82 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem82.prototype = Object.create(Problem.prototype);
Problem82.prototype.constructor = Problem82;


Problem82.prototype.getSolution = function () {
    
  let matrix = fs.readFileSync(__dirname + '/p081_matrix.txt');
  let grid = [];


  for (let i = 0; i < 80; i++) {
    let row = matrix.toString().split('\n')[i];
    grid.push(row.split(',').map(function (elem) {
      return +elem;
    }));
  }

  for (let i = 0; i < 80; i++) {
    let a = '';
    for (let j = 0; j < 80; j++)
      a += grid[i][j]+',';
  }

  let grid_size = grid.length,
      solution = [];

  //calculate the solution for bottom and right
  for (let i = 0; i < grid_size; i++) {
      solution[i] = grid[i][grid_size - 1];
  }
  
  for (let i = grid_size - 2; i >= 0; i--) {
    // Traverse down
    solution[0] += grid[0][i];
    for (let j = 1; j < grid_size; j++) {
        solution[j] = Math.min(solution[j - 1] + grid[j][i], solution[j] + grid[j][i]);
    }
 
    //Traverse up
    for (let j = grid_size - 2; j >= 0; j--) {
        solution[j] = Math.min(solution[j], solution[j+1] + grid[j][i]);
    } 
  }



  return Math.min.apply(null, solution);
}

var problem_text = `
NOTE: This problem is a more challenging version of Problem 81.
\n
The minimal path sum in the 5 by 5 matrix below, by starting in 
any cell in the left column and finishing in any cell in the right 
column, and only moving up, down, and right, is indicated in red 
and bold; the sum is equal to 994.
\n
Find the minimal path sum, in matrix.txt (right click and "Save 
Link/Target As..."), a 31K text file containing a 80 by 80 matrix, 
from the left column to the right column.`;

var problem = new Problem82(problem_text);

if (require.main === module) {
  problem.solve();
} else {
  module.exports.SolvedProblem = Problem82;
}