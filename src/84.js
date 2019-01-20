'use strict'

let fs = require('fs');
let Problem = require('./problem').Problem;

function Problem84 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem84.prototype = Object.create(Problem.prototype);
Problem84.prototype.constructor = Problem84;




Problem84.prototype.getSolution = function () {
    
  
  let board = {};
  let modalstring = "";
  let samples = 1000000;
  let doubles = 0;
  let current_position = 0;
  let ccPos = 0;
  let chancePos = 0;

  for (let i = 0; i < 40; i++) {
    board[i] = 0;
  }

  let CC = function () {
    let cc = [0, 10];
    ccPos = ++ccPos % 16;
 
    if (ccPos < 2) {
      current_position = cc[ccPos];
    }
    return;
  }

  let chance = function () {
    let chance = [0, 10, 11, 24, 39, 5];
 
    chancePos = ++chancePos % 16;
 
    if (chancePos < 6) {
      current_position = chance[chancePos];
    }
 
    if (chancePos == 6 || chancePos == 7) {
        if (current_position == 7) current_position = 15;
        if (current_position == 22) current_position = 25;
        if (current_position == 36) current_position = 5;
    }
 
    if (chancePos == 8 ) {
      current_position = (current_position == 22) ? 28 : 12;
    }
 
    if (chancePos == 9) current_position -= 3;
    return;
  }

  for (let i = 0; i < samples; i++) {
      // Roll the dices
      let dice1 = this.getRandomIntInclusive(1,4);
      let dice2 = this.getRandomIntInclusive(1,4);
   
      // Check doubles
      doubles = (dice1 == dice2) ? doubles + 1 : 0;
   
      if (doubles > 2) {
          current_position = 10;
          doubles = 0;
      } else {
          // Move to the square
          current_position = (current_position + dice1 + dice2) % 40;
   
           // Handle chance
           // Important first, as you can go CH3->CC3
           if (current_position == 7 || current_position == 22 || current_position == 36) chance();
           // Handle CH
           if (current_position == 2 || current_position == 17 || current_position == 33) CC();
           // Handle G2J
           if (current_position == 30) current_position = 10;
      }
      board[current_position]++;
  }

  // Sorting

  // Create items array
  var items = Object.keys(board).map(function(key) {
    return [key, board[key]];
  });

  // Sort the array based on the second element
  items.sort(function(first, second) {
    return second[1] - first[1];
  });

  let top_3_fields = items.slice(0,3);
   
  
  for (let i = 0; i < 3; i++) {
      if (top_3_fields[i][0] < 10) modalstring += "0";
      modalstring += top_3_fields[i][0].toString();
  }

  return modalstring;
}

var problem_text = `
https://projecteuler.net/problem=84`;

var problem = new Problem84(problem_text);


if (require.main === module) {
  problem.solve();
} else {
  module.exports.SolvedProblem = Problem84;
}