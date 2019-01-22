'use strict'

const Problem = require('./problem').Problem;

function Problem15 (problem_text, input_arguments) {
    Problem.apply(this, arguments);
  }
Problem15.prototype = Object.create(Problem.prototype);
Problem15.prototype.constructor = Problem15;

Problem15.prototype.getSolution = function () {
    var grid_size = 20;
    var grid = [];
    //https://en.wikipedia.org/wiki/Optimal_substructure
    for (var i=0; i<grid_size+1; i++) {
        grid.push([]);
    }
    for (var i=0; i < grid_size; i++) {
        grid[i][grid_size] = 1;
        grid[grid_size][i] = 1;
    }
    for (var i=grid_size-1; i >= 0; i--) {
        for (var j=grid_size-1; j >= 0; j--) {
            grid[i][j] = grid[i+1][j] + grid[i][j+1];
        }
    }
    return grid[0][0];
}

Problem15.prototype.getCombinatoricSolution = function () {
    var grid_size = 20;
    var paths = 1;
    //https://en.wikipedia.org/wiki/Binomial_coefficient
    for (var i = 0; i < grid_size; i++) 
        paths *= ((2 * grid_size) - i) / (i+1);
    return paths;
}

Problem15.prototype.solve = function () {
  return this.getProblemText() + "\nAnswer: " + this.getSolution() +
  "\nCombinatoric solution: " + this.getCombinatoricSolution();
}

var problem_text = `
Starting in the top left corner of a 2×2 grid, and only being able to move to the right and down, there are exactly 6 routes to the bottom right corner.
\n\n
How many such routes are there through a 20×20 grid?`;


if (require.main === module) {
    const problem = new Problem15(problem_text, process.argv.splice(2, process.argv.length - 1));
    console.log(problem.getSolution());
} else {
    module.exports.SolvedProblem = Problem15;
}