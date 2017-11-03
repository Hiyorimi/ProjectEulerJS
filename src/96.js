'use strict'

let fs = require('fs');
var SudokuSolver = require('sudoku-solver-js');
let Problem = require('./problem').Problem;

function Problem96 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem96.prototype = Object.create(Problem.prototype);
Problem96.prototype.constructor = Problem96;


Problem96.prototype.getSolution = function () {
    
  let file = fs.readFileSync('./src/p096_sudoku.txt');
  let solver = new SudokuSolver();
  let lines = file.toString().split('\n');
  let puzzle = '',
      answer = '',
      result = 0;

  console.time("Bruteforce");

  for (let i = 0; i < lines.length; i++) {
    let row = lines[i];
    if (row.indexOf('G') == -1) {
      puzzle += row;
    } else {
      if (puzzle != '') {
        answer = solver.solve(puzzle);
        result += parseInt(answer.substring(0,3));
      }
      puzzle = '';
    }
  }


  console.timeEnd("Bruteforce");

  return result;
}

var problem_text = `
Su Doku (Japanese meaning number place) is the name given to a popular
 puzzle concept. Its origin is unclear, but credit must be attributed 
 to Leonhard Euler who invented a similar, and much more difficult, 
 puzzle idea called Latin Squares. The objective of Su Doku puzzles, 
 however, is to replace the blanks (or zeros) in a 9 by 9 grid in such 
 that each row, column, and 3 by 3 box contains each of the digits 1 to 9. 
 Below is an example of a typical starting puzzle grid and its solution grid.
\n
A well constructed Su Doku puzzle has a unique solution and can be 
solved by logic, although it may be necessary to employ "guess and 
test" methods in order to eliminate options (there is much contested 
  opinion over this). The complexity of the search determines the 
  difficulty of the puzzle; the example above is considered easy 
  because it can be solved by straight forward direct deduction.
\n
The 6K text file, sudoku.txt (right click and 'Save Link/Target As...'), 
contains fifty different Su Doku puzzles ranging in difficulty, but all 
with unique solutions (the first puzzle in the file is the example above).
\n
By solving all fifty puzzles find the sum of the 3-digit numbers found in the 
top left corner of each solution grid; for example, 483 is the 3-digit number 
found in the top left corner of the solution grid above.`;

var problem = new Problem96(problem_text);

problem.solve();
