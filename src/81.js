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

function Problem81 (problem_text) {
  this._problem_text = problem_text;
}

var fs = require('fs');
Problem81.prototype = Object.create(Problem.prototype);
Problem81.prototype.constructor = Problem81;
Problem81.prototype.getSolution = function () {
    
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

  let grid_size = grid.length;

  //calculate the solution for bottom and right
  for (let i = grid_size - 2; i >= 0; i--) {
      grid[grid_size - 1][i] += grid[grid_size - 1][i+1];
      grid[i][grid_size - 1] += grid[i+1][grid_size - 1];
  }
  
   
  for (let i = grid_size - 2; i >= 0; i--) {
      for (let j = grid_size - 2; j >= 0; j--) {
          grid[i][j] += Math.min(grid[i + 1][j], grid[i][j + 1]);
      }
  }

  return grid[0][0];
}

var problem_text = `
In the 5 by 5 matrix below, the minimal path sum from the top left to 
the bottom right, by only moving to the right and down, is 
indicated in bold red and is equal to 2427.
\n
Find the minimal path sum, in matrix.txt (right click and 
"Save Link/Target As..."), a 31K text file containing a 80 by 80 matrix,
 from the top left to the bottom right by only moving right and down.`;

var problem = new Problem81(problem_text);


if (require.main === module) {
  problem.solve();
} else {
  module.exports.SolvedProblem = Problem81;
}