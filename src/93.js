'use strict'

let Problem = require('./problem').Problem;

function Problem93 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem93.prototype = Object.create(Problem.prototype);
Problem93.prototype.constructor = Problem93;


Problem93.prototype.operation = function (a, b, operation) {
  if (isNaN(a) || isNaN(b)) return NaN;
  switch (operation) {
    case 0:
        return a+b;
        break;
    case 1:
        return a-b;
        break;
    case 2:
        return a*b;
        break;
    case 3:
        if (b == 0)
            return NaN;
        return a*1.0/b;
        break;
  }
  return 0;
}

/**
 * getSolution() returns solution of problem
 *
 * @return {Int} denominator
 */
Problem93.prototype.getSolution = function () {

  console.time("Bruteforce");
  let result = 0;
  let result_length = 0;

  let all_combinations = this.k_combinations([0,1,2,3,4,5,6,7,8,9], 4);
  let combinations = all_combinations.map ( (elem) => {
    return elem.sort();
  });
  let ope = this.operation;
  for (let p = 0; p < combinations.length; p++) {
    let combination = combinations[p];
    let permutations = this.getPermutations(combination);
    let results = {};
    let debug_print = (number, perm, i,j,k) => {
      if (number > 42 && number < 46)
        console.log(perm.join(''),number, i,j,k);
      return
    };
    for (let s = 0; s < permutations.length; s++) {
      let perm = permutations[s];
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            for (let k = 0; k < 4; k++) {

                let number = ope(ope(ope(perm[0], perm[1], i), perm[2], j), perm[3], k);
                if (!(isNaN(number)) && number > 0)
                    results[number] = true;

                number = ope(ope(perm[0], ope(perm[1], perm[2], j), i), perm[3], k);
                if (!(isNaN(number)) && number > 0)
                    results[number] = true;

                number = ope(perm[0], ope(ope(perm[1], perm[2], j), perm[3], k), i);
                if (!(isNaN(number)) && number > 0)
                    results[number] = true;

                number = ope(perm[0], ope(perm[1],ope(perm[2], perm[3], k),j),i);
                if (!(isNaN(number)) && number > 0)
                    results[number] = true;

                number = ope(ope(perm[0], perm[1], i), ope(perm[2], perm[3], k), j);
                if (!(isNaN(number)) && number > 0)
                    results[number] = true;
            }
        }
      }
    }
    let l = 1;
    while (results[l]) {
      l++;
    }

    if (l > result_length) {
      result = combination.join('');
      result_length = l;
    }
  }

  console.timeEnd("Bruteforce");

  return result;
}

var problem_text = `https://projecteuler.net/problem=90`;


var problem = new Problem93(problem_text, process.argv.splice(
  2,process.argv.length-1));


problem.solve();
