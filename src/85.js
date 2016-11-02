'use strict'

let Problem = require('./problem').Problem;
//big-integer is better than BigInt 
let bigInt = require("big-integer");

function Problem85 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem85.prototype = Object.create(Problem.prototype);
Problem85.prototype.constructor = Problem85;


/**
 * getSolution() returns solution of problem
 *
 * @return {Int} denominator
 */
Problem85.prototype.getSolution = function () {

  console.time("Bruteforce");

  let area = 6;
  let target_number = 2000000;
  let closest_number = 0;
  let current_number = 0;

  for (let x = 3; x < 2000; x++) {
      for (let y = x; y < 2000; y++) {
          current_number = 0;
          for (let a = 0; a < x; a++) {
              for (let b = 0; b < y; b++) {
                  current_number += (x-a)*(y-b);
              }
          }
          if (Math.abs(target_number - closest_number) > 
                Math.abs(target_number - current_number)) {
              area = y * x;
              closest_number = current_number;
          }
          
          if (current_number > target_number)
            break;
      }
  }

  console.timeEnd("Bruteforce");

  // Combinatoric solution from 
  // http://www.mathblog.dk/project-euler-85-rectangles-rectangular-grid/
  console.time("Combinatoric");
    let error = 200000;
    area = 0;
    
    let x = 2000;
    let y = 1;
    
    while (x >= y) {
        let rects = x * (x + 1) * y * (y + 1) / 4;
    
        if (error > Math.abs(rects - target_number)) {
            area = x * y;
            error = Math.abs(rects - target_number);
        }
    
        if (rects > target_number)
            x--;
        else
            y++;
    }
  console.timeEnd("Combinatoric");


  return area;
}

var problem_text = `
By counting carefully it can be seen that a rectangular grid measuring 3 
by 2 contains eighteen rectangles:
\n
Although there exists no rectangular grid that contains exactly two million 
rectangles, find the area of the grid with the nearest solution.`;


var problem = new Problem85(problem_text, process.argv.splice(
  2,process.argv.length-1));


problem.solve();
