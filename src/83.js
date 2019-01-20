'use strict'

let fs = require('fs');
let Problem = require('./problem').Problem;
let astar = require('javascript-astar');

function Problem83 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem83.prototype = Object.create(Problem.prototype);
Problem83.prototype.constructor = Problem83;




Problem83.prototype.getSolution = function () {
    
  let matrix = fs.readFileSync(__dirname + '/p081_matrix.txt');
  let grid = [];
  let result = 0;


  for (let i = 0; i < 80; i++) {
    let row = matrix.toString().split('\n')[i];
    grid.push(row.split(',').map(function (elem) {
      return +elem;
    }));
  }

  let graph = new astar.Graph(grid);
  let start = graph.grid[0][0];
  let end = graph.grid[79][79];
  let path = astar.astar.search(graph, start, end);

  for (let i = 0; i < path.length; i++) {
    result += path[i].weight;
  }


  return result;
}

var problem_text = `
In the 5 by 5 matrix below, the minimal path sum from the top left to the
 bottom right, by moving left, right, up, and down, is indicated in bold 
 red and is equal to 2297.
\n
Find the minimal path sum, in matrix.txt (right click and 
  "Save Link/Target As..."), a 31K text file containing a 80 by 80 
  matrix, from the top left to the bottom right by moving left, 
  right, up, and down.`;

var problem = new Problem83(problem_text);


if (require.main === module) {
  problem.solve();
} else {
  module.exports.SolvedProblem = Problem83;
}