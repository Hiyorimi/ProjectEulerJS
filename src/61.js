'use strict'

let Problem = require('./problem').Problem;
let Fraction = require('fraction.js');

function Problem61 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
  this.polygonal_numbers = {};
}

Problem61.prototype = Object.create(Problem.prototype);
Problem61.prototype.constructor = Problem61;




/**
 * satisfies(set) checks if set satisfies
 * the condition
 *
 * @param {Array} set
 * @return {Bool} If satisfies the condition
 */
Problem61.prototype.satisfies = function (p,set) {
    if (set.length == 0)
        return true;

    let result = true;
    let cset = set.slice(0);

    let last_number = cset[cset.length-1];
    if ((""+last_number).substring((""+last_number).length-2) != 
            ("" + p).substring(0,2)) {
              result = false;
        }
    cset.push(p);
    if (cset.length == 6) {
        if ((""+cset[5]).substring((""+cset[5]).length-2) != 
            (""+cset[0]).substring(0,2)) {
              result = false;
        }
    }
    return result;
}


/**
 * makeSet(set, target, start) creates set  
 * starting with start 
 *
 * @param {Array} set to work on
 * @param {Array} arity_found — current arity for found numbers
 * @return {Array} Array of coressponding primes
 */
Problem61.prototype.makeSet = function (set, arity_found) {
  if (set.length == 6) {
      let sum  = set.reduce( (prev, cur) => { return prev+cur; }, 0 );
      return sum;
  } else {
    for (let a = 3; a < 9; a++) {
        if (arity_found.indexOf(a) < 0) {
            let i = 0;
            if ((a==3) && (arity_found.length == 0))
                i = this.polygonal_numbers[3].indexOf(8128);
            for (; i < this.polygonal_numbers[a].length; i++) {
                    let p = this.polygonal_numbers[a][i];
                    if (set.length > 0) {
                        let last_number = ""+set[set.length-1];
                        if (p > parseInt((last_number.substr(last_number.length-2)+1)*100)) 
                            break;
                    }
                    if (this.satisfies(p,set)) {
                        let cset = set.slice(0);
                        cset.push(p)
                        let carity_found = arity_found.slice(0);
                        carity_found.push(a);
                        let sum = this.makeSet(cset, carity_found);
                        if (sum) 
                            return sum;
                    }
                }
        }
    }
    return false;
  }
}

/**
 * getSolution() returns solution of problem
 *
 * @return {Int} denominator
 */
Problem61.prototype._getAllAPolygonalNumbers = function (a) {
    let seq = [];
    let generated_number = 0;
    let n = 10;
    while (("" + generated_number).length < 5) {
        generated_number = this.getPolygonalNumber(a, n);
        if ((("" + generated_number).length == 4) && (generated_number % 100) > 9)
            seq.push(generated_number);
        n++;
    }
    return seq;
}

/**
 * getSolution() returns solution of problem
 *
 * @return {Int} denominator
 */
Problem61.prototype.getSolution = function () {

  console.time("Bruteforce");

  for (let a = 3; a < 9; a++) {
      this.polygonal_numbers[a] = this._getAllAPolygonalNumbers(a);
  }
  
  let result = this.makeSet(new Array(), []);


  console.timeEnd("Bruteforce");

  return result;
}

var problem_text = `
The primes 3, 7, 109, and 673, are quite remarkable. By taking any two 
primes and concatenating them in any order the result will always be 
prime. For example, taking 7 and 109, both 7109 and 1097 are prime. 
The sum of these four primes, 792, represents the lowest sum for a 
set of four primes with this property.\n
\n
Find the lowest sum for a set of five primes for which any two 
primes concatenate to produce another prime.`;


var problem = new Problem61(problem_text, process.argv.splice(2,process.argv.length-1));


problem.solve();
