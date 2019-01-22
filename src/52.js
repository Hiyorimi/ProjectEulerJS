'use strict'

let Problem = require('./problem').Problem

/**
 * Sets Problem52
 * @class Class for solviong projecteuler 51th problem
 * @param {String} problem_text - Task as text
 * @param {Object} arguments - Arguments array 
 */
function Problem52 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem52.prototype = Object.create(Problem.prototype);
Problem52.prototype.constructor = Problem52;

/**
 * containsOnlyValuesAs(secondArray) returns digits of input parameter
 *
 * @param {Array} secondArray
 * @return {Boolean} result
 */
Array.prototype.containsOnlyValuesAs = function(secondArray) {

    if (this.length != secondArray.length) return false;
    if (this.sort().join(',')=== secondArray.sort().join(','))
        return true;
}

Problem52.prototype.getSolution = function () {
    

    console.time("Bruteforce");

    let number = 166;
    let not_found = true;
        console.log('started');
    while (not_found) {
        console.log(number);
        let x6_number = number * 6;
        if (x6_number.toString().length == number.toString().length) {
            console.log(x6_number);
            let digits_for_all_multiplied_are_the_same = true;
            for (let i = 2; i < 7; i++) {
                console.log(i);
                let multiplied = number * i;
                if ( !(this.getDigits(number).containsOnlyValuesAs(
                            this.getDigits(multiplied)
                        )) ) {
                    digits_for_all_multiplied_are_the_same = false;
                    break;
                }
            }
            if (digits_for_all_multiplied_are_the_same)
                not_found = false;
            number++;
        }
        else {
            number = Math.pow(10,(number.toString().length));
            console.log(number);
        }
    }


    console.timeEnd("Bruteforce");

    return --number;
}

let problem_text = `
It can be seen that the number, 125874, and its double, 251748, contain exactly the same digits, but in a different order.
\n
Find the smallest positive integer, x, such that 2x, 3x, 4x, 5x, and 6x, contain the same digits.`;


let problem = new Problem52(problem_text, process.argv.splice(2,process.argv.length-1));

problem.solve();
