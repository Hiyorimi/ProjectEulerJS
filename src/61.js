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
Triangle, square, pentagonal, hexagonal, heptagonal, and 
octagonal numbers are all figurate (polygonal) numbers 
and are generated by the following formulae:
\n
Triangle	 	P3,n=n(n+1)/2	 	1, 3, 6, 10, 15, ...
Square	 	P4,n=n2	 	1, 4, 9, 16, 25, ...
Pentagonal	 	P5,n=n(3n−1)/2	 	1, 5, 12, 22, 35, ...
Hexagonal	 	P6,n=n(2n−1)	 	1, 6, 15, 28, 45, ...
Heptagonal	 	P7,n=n(5n−3)/2	 	1, 7, 18, 34, 55, ...
Octagonal	 	P8,n=n(3n−2)	 	1, 8, 21, 40, 65, ...
The ordered set of three 4-digit numbers: 8128, 2882, 8281, 
has three interesting properties.

The set is cyclic, in that the last two digits of each number 
is the first two digits of the next number (including the last 
number with the first).
Each polygonal type: triangle (P3,127=8128), square (P4,91=8281), 
and pentagonal (P5,44=2882), is represented by a different number in the set.
This is the only set of 4-digit numbers with this property.
Find the sum of the only ordered set of six cyclic 4-digit numbers 
for which each polygonal type: triangle, square, pentagonal, 
hexagonal, heptagonal, and octagonal, is represented by a different 
number in the set.`;


var problem = new Problem61(problem_text, process.argv.splice(2,process.argv.length-1));


problem.solve();
