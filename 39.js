'use strict'

let Problem = require('./problem').Problem

/**
 * Sets Problem39
 * @class Class for solviong projecteuler 39th problem
 * @param {String} problem_text - Task as text
 * @param {Object} arguments - Arguments array 
 */
function Problem39 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem39.prototype = Object.create(Problem.prototype);
Problem39.prototype.constructor = Problem39;



Problem39.prototype.getSolution = function () {
    let maximum = 0;
    let p_maximum = 0;
    let right_triangles = [];
    let c = 0;

    console.time("Bruteforce");
    for (let p = 25; p < 1001; p++){
      right_triangles = [];
      for (let a = 3; a < p / 3; a++){
        for (let b = a; b < p - a ; b++){
          c = p-a-b;
          if ((Math.sqrt(Math.pow(a,2) + Math.pow(b,2))) == c)
            right_triangles.push([a,b,c]);
        }
      }
      if (right_triangles.length > maximum){
        maximum = right_triangles.length;
        p_maximum = p;
      }
    }
    let p_maximum_bruteforce = p_maximum;
    console.timeEnd("Bruteforce");

    maximum = 0;
    right_triangles = [];
    console.time("Smarter bruteforce");
    for (let p = 25; p < 1001; p++){
      right_triangles = [];
      for (let a = 3; a < p / 3; a++){
          if (p*(p-2*a) % (2*(p-a)) == 0)
            right_triangles.push([a,p]);
      }
      if (right_triangles.length > maximum){
        maximum = right_triangles.length;
        p_maximum = p;
      }
    }
    console.timeEnd("Smarter bruteforce");

    console.log('Bruteforce solution == smarter bruteforce:', p_maximum == p_maximum_bruteforce)

    return p_maximum;
}

let problem_text = `
If p is the perimeter of a right angle triangle with integral length sides, {a,b,c}, there are exactly three solutions for p = 120.
\n
{20,48,52}, {24,45,51}, {30,40,50}
\n
For which value of p ≤ 1000, is the number of solutions maximised?`;


let problem = new Problem39(problem_text, process.argv.splice(2,process.argv.length-1));

problem.solve();
