'use strict'

let Problem = require('./problem').Problem;
let bigInt = require('big-integer');

function Problem76 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem76.prototype = Object.create(Problem.prototype);
Problem76.prototype.constructor = Problem76;



/**
 * getSortedKeys(onj) returns dictionary sorted by values
 *
 * @param {Dict} obj
 * @return {Array} sorted array of keys (desc)
 */
Problem76.prototype.getSortedKeys = function (obj) {
    var keys = []; for(var key in obj) keys.push(key);
    return keys.sort(function(a,b){return obj[a]-obj[b]});
}

/**
 * getSolution() returns solution of problem
 *
 * @return {Int} denominator
 */
Problem76.prototype.getSolution = function () {

  console.time("Bruteforce");

  let target = 100;
  let ways = [1];
  for (let i = 0; i < target; i++)
    ways.push(0);

  for (let i = 1; i <= target; i++)
    for (let j = i; j <= target; j++) 
      ways[j] += ways[j - i];

  console.timeEnd("Bruteforce");

  return ways[ways.length-1]-1;
}

var problem_text = `
It is possible to write five as a sum in exactly six different ways:

4 + 1
3 + 2
3 + 1 + 1
2 + 2 + 1
2 + 1 + 1 + 1
1 + 1 + 1 + 1 + 1

How many different ways can one hundred be written as a sum of at least two positive integers?`;


var problem = new Problem76(problem_text, process.argv.splice(
  2,process.argv.length-1));


problem.solve();
