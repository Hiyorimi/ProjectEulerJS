'use strict'

let Problem = require('./problem').Problem;

function Problem78 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem78.prototype = Object.create(Problem.prototype);
Problem78.prototype.constructor = Problem78;



/**
 * getSolution() returns solution of problem
 * From: http://www.mathblog.dk/project-euler-78-coin-piles/
 *
 * @return {Int} denominator
 */
Problem78.prototype.getSolution = function () {

  console.time("Bruteforce");

  let p = [];
  p.push(1);
  
  let n = 1;            
  while(true){
      let i = 0;
      let penta = 1;
      p.push(0);
   
      while (penta <= n){                    
          let sign = (i % 4 > 1) ? -1 : 1;
          p[n] += sign * p[n - penta];
          p[n] %= 1000000;
          i++;
                    
          let j = (i % 2 == 0) ? parseInt(i / 2) + 1 : -(parseInt(i / 2) + 1);
          let penta_old = penta;
          penta = parseInt(j * (3 * j - 1) / 2);

      } 
                   
      if (p[n] == 0) break;
      n++;
  }

  console.timeEnd("Bruteforce");

  return n;
}

var problem_text = `
Let p(n) represent the number of different ways in which n coins can
 be separated into piles. For example, five coins can be separated 
 into piles in exactly seven different ways, so p(5)=7.
\n
OOOOO
OOOO   O
OOO   OO
OOO   O   O
OO   OO   O
OO   O   O   O
O   O   O   O   O
Find the least value of n for which p(n) is divisible by one million.`;


var problem = new Problem78(problem_text, process.argv.splice(
  2,process.argv.length-1));


problem.solve();
