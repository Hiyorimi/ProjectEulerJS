'use strict'

const Problem = require('./problem').Problem;
const bigInt = require("big-integer");

function Problem205 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem205.prototype = Object.create(Problem.prototype);
Problem205.prototype.constructor = Problem205;

Problem205.prototype.getWaysToScoreNByDice = (diceFaces, numberOfDices) => {
  let waysToRollCombination = 0;
  const maskedPermutationsCounts = {};
  const waysToScoreN = {};

  const allCombinations = Problem.prototype.getCombinationsWithRepetitions(diceFaces, numberOfDices);
  const allPossibleScores = allCombinations.map((faces) => {
    return faces.reduce((p, c) => {
      return p + c;
    }, 0);
  });
  for (let i = 0; i < allPossibleScores.length; i++) {
    const combination = allCombinations[i];
    const score = allPossibleScores[i];
    if (! waysToScoreN.hasOwnProperty(score)) {
      waysToScoreN[score] = 0;
    }
    const maskedCombination = Problem.prototype.maskNumberArray(combination).join('');
    if (!maskedPermutationsCounts.hasOwnProperty(maskedCombination)) {
      waysToRollCombination = Problem.prototype.getUniquePermutationsCounts(combination);
      maskedPermutationsCounts[maskedCombination] = waysToRollCombination;
    } else {
      waysToRollCombination = maskedPermutationsCounts[maskedCombination];
    }
    waysToScoreN[score] += waysToRollCombination;
  }
  return waysToScoreN;
}

/**
 * getSolution() returns solution of problem
 *
 * @return {Int} denominator
 */
Problem205.prototype.getSolution = function () {
  let petesWins = 0;
  const pyramidalPete = [1, 2, 3, 4];
  const cubicColin = [1, 2, 3, 4, 5, 6];

  const waysToScoreNForPete = this.getWaysToScoreNByDice(pyramidalPete, 9);
  waysToScoreNForPete[6] = 0;
  waysToScoreNForPete[7] = 0;
  waysToScoreNForPete[8] = 0;
  const waysToScoreNForColin = this.getWaysToScoreNByDice(cubicColin, 6);

  // Sorting
  let items = Object.keys(waysToScoreNForPete).map( (key) => {
    return [parseInt(key), waysToScoreNForPete[key]];
  });
  const p = items.sort((first, second) =>  {
    return first[0] - second[0];
  });
  items = Object.keys(waysToScoreNForColin).map( (key) => {
    return [parseInt(key), waysToScoreNForColin[key]];
  });
  const c = items.sort((first, second) =>  {
    return first[0] - second[0];
  });
  
  const total = Math.pow(4, 9) * Math.pow(6, 6);

  for (let i = 0; i < c.length; i++) {
    for (let j = i + 1; j < p.length; j++) {
      petesWins += p[j][1] * c[i][1];
    }
  }
  return petesWins / total;
}

var problem_text = `https://projecteuler.net/problem=205`;


var problem = new Problem205(problem_text, process.argv.splice(
  2,process.argv.length-1));

if (require.main === module) {
    problem.solve();
} else {
    module.exports.SolvedProblem = Problem205;
}
